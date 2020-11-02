<?php
include_once('../app/model.speedtest.php');
$model = new speedtestModel();
$submissions = $model->getResults();

$xml_header = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"></kml>';
$xml = new SimpleXMLElement($xml_header);

$Document = $xml->addChild('Document');

$name = $Document->addChild('name');
$name[0] = 'Broadband Survey Results';

//add style
$Style = $Document->addChild('Style');
$Style->addAttribute('id', 'test');
$IconStyle = $Style->addChild('IconStyle');
$IconStyle->addChild('color', 'ff646000');
$IconStyle->addChild('scale', 1);

$Icon = $IconStyle->addChild('Icon');
$Icon->addChild('href', 'https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png');

$hotSpot = $IconStyle->addChild('hotSpot');
$hotSpot->addAttribute('x', 32);
$hotSpot->addAttribute('y', 64);
$hotSpot->addAttribute('yunits', 'insetPixels');

//get data and append it

$folders = [];
foreach($submissions as $i=>$submission) {
	$submission['datetime'] = date('n/j/Y h:ia', $submission['_id']->getTimestamp());

	if($submission['submissionType']=='no-internet') {
		$isp = 'No internet';
	}
	else {
		$isp = $submission['speedtest']['isp']['isp'];
	}

	if(empty($isp) || trim($isp)=='') {
		$isp = 'Undefined';
	}

	//crate the ISP folder if it  does not exist yet
	if(!isset($folder[ $isp ])) {

		$Style = $Document->addChild('Style');
		$Style->addAttribute('id', tools::sid($isp));
		$IconStyle = $Style->addChild('IconStyle');
		$IconStyle->addChild('color', 'ff'.self::random_color());
		$IconStyle->addChild('scale', 1);

		$Icon = $IconStyle->addChild('Icon');
		$Icon->addChild('href', 'https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png');

		$hotSpot = $IconStyle->addChild('hotSpot');
		$hotSpot->addAttribute('x', 32);
		$hotSpot->addAttribute('y', 64);
		$hotSpot->addAttribute('yunits', 'insetPixels');

		$folder[ $isp ] = $Document->addChild('Folder');
		$folder[ $isp ]->addChild('name', htmlentities($isp));
		$folder[ $isp ]->addChild('open', 0);
	}

	//create this submission
	$Placemark = $folder[ $isp ]->addChild('Placemark');
	$Placemark->addChild('name', htmlentities($isp));
	$Placemark->addChild('styleUrl', '#'. tools::sid($isp));

	ob_start();
	include('views/kml.description.php');
	$descriptionHTML = ob_get_contents();
	ob_end_clean();

	$description = $Placemark->addChild('description');
	$node = dom_import_simplexml($description);
	$cdata = $node->ownerDocument->createCDATASection($descriptionHTML);
	$node->appendChild($cdata);

	$Point = $Placemark->addChild('Point');
	$coordinates = $Point->addChild('coordinates', $submission['addressEncoding']['point']['coordinates'][0].','.$submission['addressEncoding']['point']['coordinates'][1].',0');

	$ExtendedData = $Placemark->addChild('ExtendedData');
	//Data name="submissionType"
	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Date Time of Submission');
	$Data->addChild('value', $submission['datetime']);

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Submission type');
	$Data->addChild('value', $submission['submissionType']);

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Address Street');
	$value = $Data->addChild('value');
	$node = dom_import_simplexml($value);
	$cdata = $node->ownerDocument->createCDATASection(htmlentities($submission['address']['street']));
	$node->appendChild($cdata);

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Address Street 2');
	$value = $Data->addChild('value');
	$node = dom_import_simplexml($value);
	$cdata = $node->ownerDocument->createCDATASection(htmlentities($submission['address']['street2']));
	$node->appendChild($cdata);

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Address City');
	$Data->addChild('value', htmlentities($submission['address']['city']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Address State');
	$Data->addChild('value', htmlentities($submission['address']['state']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Address Zip');
	$Data->addChild('value', htmlentities($submission['address']['zip']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Contact Name');
	$Data->addChild('value', htmlentities($submission['contact']['name']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Contact Email');
	$Data->addChild('value', htmlentities($submission['contact']['email']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Contact Phone');
	$Data->addChild('value', htmlentities($submission['contact']['phone']));

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Speed Test ISP');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $isp ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Download Mbps');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'testResults' ][ 'download' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Upload Mbps');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'testResults' ][ 'upload' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Ping Ms');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'testResults' ][ 'ping' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Jitter');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'testResults' ][ 'jitter' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Performance Satisfaction');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'performanceSatisfaction' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Price Satisfaction');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'priceSatisfaction' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Support Satisfaction');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'supportSatisfaction' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Price Per Month');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( $submission[ 'speedtest' ][ 'pricePerMonth' ] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Bundled');
	if($submission['submissionType']=='speedtest') {
		$Data->addChild( 'value', htmlentities( implode( ', ', $submission[ 'speedtest' ][ 'bundle' ] ) ) );
	}


	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Internet Available');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( implode( ', ', $submission[ 'noInternet' ][ 'internetAvailable' ] ) ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Available ISPs');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( implode(', ', $submission['noInternet']['availableIsps']) ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Why No Subscription');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( implode(', ', $submission['noInternet']['whyNoSubscription']).' - '.$submission['noInternet']['whyNoSubscriptionOther'] ) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Interested in Service');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( $submission['noInternet']['interestedInService']) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Acceptable Price Per Month');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( $submission['noInternet']['pricePerMonth']) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Interested in Infrastructure');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( $submission['noInternet']['interestedInInfrastructure']) );
	}

	$Data = $ExtendedData->addChild('Data');
	$Data->addAttribute('name', 'Price for Infrastructure');
	if($submission['submissionType']=='no-internet') {
		$Data->addChild( 'value', htmlentities( $submission['noInternet']['priceForInfrastructure']) );
	}


}


$kmlOutput = $xml->asXML();
header ("Content-Type:text/xml");
//header('Content-type: application/vnd.google-earth.kml+xml');
//header('Content-Disposition: attachment; filename="map.kml"');
echo $kmlOutput;
exit;