define( [
	'jquery', 'vue', '/script/config.js', '/script/component.speedtest.js'
], function ( $, Vue, config ) {

	let survey = {
		submissionType: 'no-internet',
		address:        {
			street:'',
			street2:'',
			city:'',
			state:'',
			zip:''
		},
		contact:        {
			name:  '',
			email: '',
			phone: ''
		},
		comments:       '',
		speedtest:      {
			isp:                     {
				isp:            '',
				connectionType: '',
				domains:        [],
				ip:             '',
				as:             {
					asn:    '',
					name:   '',
					route:  '',
					domain: '',
					type:   '',
				},
				location:       {
					country:    '',
					region:     '',
					city:       '',
					lat:        null,
					lng:        null,
					postalCode: null,
					timezone:   null
				}
			},
			ispCorrect:              true,
			testResults: {
				download:0,
				upload:0,
				ping:0,
				jitter:0
			},
			performanceSatisfaction: 3,
			priceSatisfaction:       3,
			supportSatisfaction:     3,
			pricePerMonth:           '',
			bundle:                  []
		},
		noInternet:     {
			internetAvailable:          'No',
			availableIsps:              [],
			whyNoSubscription:          [],
			whyNoSubscriptionOther:     '',
			interestedInService:        'Yes',
			pricePerMonth:              'Under $50',
			interestedInInfrastructure: 'Yes',
			priceForInfrastructure:     'Under $500'
		}
	};

	window.speedTestVue = new Vue( {

		el: '#speedTestPage',

		data: function () {

			let data = {
				state:              'loading',
				step:               'intro',
				speedTestState:     'getting ready',
				hasBeenThroughStep: 0,
				survey:             JSON.parse( JSON.stringify( survey ) ),
				loadingNextStep:    false,
				errors: []
			};

			return data;
		},

		mounted: function () {
			this.state = 'mounted';
			console.log( 'Speedtest survey ready' );
		},

		methods: {

			goto: function ( step ) {
				this.step = step;
			},

			gotoNext: function () {
				let vm = this;

				vm.loadingNextStep = true;

				let nextstep = '';

				//step 1 to step 2
				if ( vm.step === 'intro' && vm.survey.submissionType === 'speedtest' ) {

					vm.getIsp( function () {
						vm.step            = 'pre-speedtest';
						vm.loadingNextStep = false;
						window.scrollTo( 0, 140 );
					} );
				}
				else if ( vm.step === 'intro' && vm.survey.submissionType === 'no-internet' ) {
					vm.step            = 'no-internet-address';
					vm.loadingNextStep = false;
					window.scrollTo( 0, 140 );
				}
				else if ( vm.step === 'pre-speedtest' ) {
					vm.step            = 'speedtest';
					vm.speedTestState  = 'running';
					vm.loadingNextStep = false;
					window.scrollTo( 0, 140 );
				}
				else if ( vm.step === 'speedtest' ) {
					vm.step            = 'speedtest-complete';
					vm.loadingNextStep = false;
					window.scrollTo( 0, 140 );
				}


			},

			reset: function () {
				this.step   = 'intro';
				this.survey = JSON.parse( JSON.stringify( survey ) );
			},

			getIsp: function ( callback ) {
				let vm = this;

				$.ajax( {
					url:      "https://geo.ipify.org/api/v1",
					dataType: "json",
					data:     {
						apiKey: config.ipifyApiKey
					},
					success:  function ( data ) {
						console.log( data );

						//handle any manual IP/ISP overrides
						if(typeof(config.ispOverride)!='undefined') {
							for(let i in config.ispOverride) {
								if( config.ispOverride[i].ips.includes(data.ip) ) {
									data.isp = config.ispOverride[i].name;
								}
							}
						}

						vm.survey.speedtest.isp.isp            = data.isp;
						vm.survey.speedtest.isp.connectionType = data.connectionType;
						vm.survey.speedtest.isp.domains        = data.domains;
						vm.survey.speedtest.isp.ip             = data.ip;

						vm.survey.speedtest.isp.location.country    = data.location.country;
						vm.survey.speedtest.isp.location.region     = data.location.region;
						vm.survey.speedtest.isp.location.city       = data.location.city;
						vm.survey.speedtest.isp.location.lat        = data.location.lat;
						vm.survey.speedtest.isp.location.lng        = data.location.lng;
						vm.survey.speedtest.isp.location.postalCode = data.location.postalCode;
						vm.survey.speedtest.isp.location.timezone   = data.location.timezone;

						vm.survey.speedtest.isp.as.asn    = data.as.asn;
						vm.survey.speedtest.isp.as.name   = data.as.name;
						vm.survey.speedtest.isp.as.route  = data.as.route;
						vm.survey.speedtest.isp.as.domain = data.as.domain;
						vm.survey.speedtest.isp.as.type   = data.as.type;

						if ( typeof ( callback ) == 'function' ) {
							callback();
						}
					},
					error:function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
						console.log(errorThrown);
						alert( 'We had a problem getting information about your internet service provider. This is normally caused by ad blocker extensions in your browser. Please temporarily disable active ad blockers or add garrettcounty.org to the whitelist and try again. After completing the survey, feel free revert changes to your ad blocker.' );
						vm.goto('intro');
						vm.loadingNextStep = false;
					}
				} );

			},

			speedtestEnd:    function ( data ) {
				console.log( 'speedtestEnd' );
				console.log( data );
				let vm = this;
				vm.speedTestState = 'results';
				vm.survey.speedtest.testResults.download = data.dlStatus;
				vm.survey.speedtest.testResults.upload = data.ulStatus;
				vm.survey.speedtest.testResults.jitter = data.jitterStatus;
				vm.survey.speedtest.testResults.ping = data.pingStatus;

			},
			speedtestUpdate: function ( data ) {
				this.speedTestState = 'running';
				//console.log( 'speedtestUpdate' );
				//console.log( data );
			},

			saveSurvey: function () {
				let vm = this;

				vm.loadingNextStep = true;

				vm.checkErrors();
				if(vm.errors.length>0) {
					alert('A required field has not been filled out. Please double check that required fields have been filled out and submit again.');
					window.scrollTo( 0, 140 );
					vm.loadingNextStep = false;
					return;
				}

				$.ajax( {
					url:      "/save.php",
					method:   'POST',
					dataType: "json",
					data:     vm.survey,
					success:  function ( data ) {
						console.log( data );
						vm.step            = 'speedtest-complete';
						vm.loadingNextStep = false;
						window.scrollTo( 0, 140 );
					},
					error:    function () {
						alert( 'An error occurred while saving your responses. Please try again.' );
					}
				} );


			},

			checkErrors:function() {
				let vm = this;
				vm.errors = [];

				if( vm.survey.address.street.trim()==='' ) {
					vm.errors.push('survey.address.street');
				}
				if( vm.survey.address.city.trim()==='' ) {
					vm.errors.push('survey.address.city');
				}
				if( vm.survey.address.state.trim()==='' ) {
					vm.errors.push('survey.address.state');
				}
				if( vm.survey.address.zip.trim()==='' ) {
					vm.errors.push('survey.address.zip');
				}

				return vm.errors;

			},

			fieldHasError:function( fieldName) {
				return this.errors.includes(fieldName);
			}
		}

	} );

	window.onpopstate = function ( event ) {
		console.log( "location: " + document.location + ", state: " + JSON.stringify( event.state ) );
	};

} );
