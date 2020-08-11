<?php
include_once('../vendor/autoload.php');
include_once('config.php');

class speedtestModel {

	/** @var \MongoDB\Client */
	private $client;

	/** @var \MongoDB\Database */
	private $db;


	function __construct() {

		$this->client = new \MongoDB\Client( config::$mongoConnectionUrl, [ 'username'=>config::$mongoUsername, 'password'=>config::$mongoPassword, 'authSource'=>config::$mongoAuthSource  ] );

		$database = config::$mongoDatabase;

		$this->db = $this->client->$database;
	}


	public function saveResults( $survey ) {

		$insertInfo = $this->db->survey->insertOne( $survey, [ 'writeConcern' => new MongoDB\Driver\WriteConcern( 'majority' ) ] );

		return $insertInfo;
	}


	public function getResultsNotGeoCoded() {

		$find = [
			'addressEncoding' => [
				'$exists' => false
			]
		];

		$submissions = $this->db->survey->find( $find );

		foreach( $submissions as $submission ) {

			$address = $submission->address->street;
			if( !empty( $submission->address->street2 ) ) {
				$address .= ', ' . $submission->address->street2;
			}

			$unformattedAddressStr = str_replace( ' ', '+', $address . ', ' . $submission->address->city . ', ' . $submission->address->state . ' ' . $submission->address->zip );

			//pass to google
			$rspJSON = self::easyCURL( [ 'url' => 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $unformattedAddressStr . '&key='.config::$googleApiKey ] );

			$rsp = json_decode( $rspJSON, true );

			if( $rsp[ 'status' ] == 'OK' ) {
				$addressData = $rsp[ 'results' ][ 0 ];

				$mongoPoint = [
					'type'        => 'Point',
					'coordinates' => [
						$addressData[ 'geometry' ][ 'location' ][ 'lng' ],
						$addressData[ 'geometry' ][ 'location' ][ 'lat' ]
					]
				];

				//$submission->addressData     = $addressData;
				//$submission->addressPoint    = $mongoPoint;
				$submission->addressEncoding = [
					'complete' => true,
					'error'    => false,
					'data'     => $addressData,
					'point'    => $mongoPoint
				];
			}
			else {
				$submission->addressEncoding = [
					'complete' => false,
					'error'    => true,
					'response_data' => $rsp
				];
			}

			$this->db->survey->replaceOne( [ '_id' => $submission->_id ], $submission, [ 'upsert'       => true,
			                                                                             'writeConcern' => new MongoDB\Driver\WriteConcern( 'majority' )
			] );

			sleep(5);

		}
		unset( $submission );

	}

	public static function easyCURL( $params ) {

		//$params = [
		//	'url' => 'string',
		//	'fields' => 'array',
		//	'header' => 'array',
		//	'authentication' => [ 'user'=>'string', 'password'=>'string'],
		//	'complexResponse'=>false
		//];

		if(!isset($params['fields'])) {
			$params['fields'] = [];
		}

		if(is_array($params['fields']) && count($params['fields'])==0) {
			$fields_string = '';
		}
		elseif(is_array($params['fields'])) {
			$fields_string = http_build_query($params['fields']);
		}
		elseif(is_string($params['fields'])) {
			$fields_string = $params['fields'];
		}

		//open connection
		$ch = curl_init();

		//set the url, number of POST vars, POST data
		curl_setopt($ch, CURLOPT_URL, $params['url']);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

		if(isset($params['method'])) {
			if(strtolower($params['method'])=='post') {
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
			}
			elseif(strtolower($params['method'])=='get') {
				if(strlen($fields_string)>0 ) {
					curl_setopt($ch, CURLOPT_URL, $params['url'].'?'.$fields_string);
				}
			}
			elseif(strtolower($params['method'])=='put') {
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
				curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
				curl_setopt($ch, CURLOPT_NOBODY, false);
			}
			elseif(strtolower($params['method'])=='delete') {
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
				if(strlen($fields_string)>0 ) {
					curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
				}
			}
		}
		//assume post for legacy
		else {
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
		}


		if(isset($params['header'])) {
			curl_setopt($ch, CURLOPT_HTTPHEADER, $params['header']);
			curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		}
		else {
			curl_setopt($ch, CURLOPT_HEADER, false);
		}

		if(isset($params['authentication'])) {
			if(!isset($params['authentication']['basic']) || $params['authentication']['basic']!=true) {
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_NTLM);
			}
			else {
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			}
			curl_setopt($ch, CURLOPT_USERPWD, $params['authentication']['user'].':'.$params['authentication']['password']);
		}

		if(isset($params['useragent'])) {
			curl_setopt($ch,CURLOPT_USERAGENT, $params['useragent']);
		}

		//execute post
		$result = curl_exec($ch);

		//capture any errors from curl
		$curl_errno = curl_errno($ch);

		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		//close connection
		curl_close($ch);

		if(isset($params['complexResponse']) && $params['complexResponse']) {

			return [
				'result'	=>	$result,
				'httpCode'	=>	$httpCode,
				'curlError'	=>	$curl_errno
			];

		}

		return $result;

	}

}