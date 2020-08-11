define( [
	'vue', '/script/config.js', '/script/speedtest.js'
], function ( Vue, config, Speedtest ) {

	function I( i ) {
		return document.getElementById( i );
	}
	Vue.component('speedtest', {

		template: '#template-speedtest',

		data: function () {

			return {
				state:     'loading',
				processes: [],

				showSpeedtest: false,
				speedtest:     new Speedtest(),
				speedtestData: null,
				servers:       [
					{
						name:     "Speed Test Server",
						server:   config.speedTestUrl,   //URL to your server. You can specify http:// or https://. If your server supports both, just write // without the protocol
						dlURL:    "garbage.php",//   path to garbage.php or its replacement on the server
						ulURL:    "empty.php", //  path to empty.php or its replacement on the server
						pingURL:  "empty.php",//   path to empty.php or its replacement on the server. This is used to ping the server by this selector
						getIpURL: "getIP.php",//   path to getIP.php or its replacement on the server
					}
				],

				//graph opts
				graph: {
					color: {
						meter: /Trident.*rv:(\d+\.\d+)/i.test( navigator.userAgent ) ? "#EAEAEA" : "#80808040",
						dl:    "#6060AA",
						ul:    "#309030",
						ping:  "#AA6060",
						jit:   "#AA6060",
						prog:  /Trident.*rv:(\d+\.\d+)/i.test( navigator.userAgent ) ? "#EAEAEA" : "#80808040"

					}
				}


			};

		},

		beforeMount: function () {
			let vm = this;

			vm.speedtest.setParameter( "telemetry_level", "full" ); //enable telemetry
			vm.speedtest.addTestPoints( this.servers ); //add list of servers

			vm.addProcess( 'st_select_server' );
			vm.speedtest.selectServer( function ( server ) {
				if ( server != null ) { //at least 1 server is available
					//console.log( 'server found' );
					//console.log( server );
				}
				else { //no servers are available, the test cannot proceed
					console.error( 'no speed test servers' );
				}
				vm.removeProcess( 'st_select_server' );

				vm.showSpeedtest = true;

				Vue.nextTick( function () {
					vm.initMeters();
					vm.speedtest.start();
				} )
				//setTimeout( function() { vm.initMeters(); }, 500 );

			} );

			vm.speedtest.onupdate = function ( data ) {
				vm.speedtestData = data;
				vm.$emit('update', vm.speedtestData);
			};

			vm.speedtest.onend = function ( aborted ) {
				if ( vm.speedtestData.testState === 4 ) {
					//console.log( vm.speedtestData );
				}
				vm.$emit('end', vm.speedtestData);
			};


		},

		mounted: function () {
			let vm = this;

			//update the UI every frame
			window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || ( function ( callback, element ) {
				setTimeout( callback, 1000 / 60 );
			} );

			vm.frame();


		},

		methods: {

			processRunning: function ( pid ) {
				if ( this.processes.indexOf( pid ) >= 0 ) {
					return true;
				}
				return false;
			},

			addProcess: function ( pid ) {
				this.processes.push( pid );
			},

			removeProcess: function ( pid ) {
				let index = this.processes.indexOf( pid );
				if ( index >= 0 ) {
					this.processes.splice( index, 1 );
				}
			},


			start: function () {
				let vm = this;
				vm.speedtest.start();
			},

			stop: function () {
				let vm = this;
				vm.speedtest.abort();
			},

			//graph functions
			frame: function () {
				let vm = this;
				requestAnimationFrame( vm.frame );
				vm.updateMeters();
			},

			drawMeter: function ( c, amount, bk, fg, progress, prog ) {
				let vm = this;

				var ctx      = c.getContext( "2d" );
				var dp       = window.devicePixelRatio || 1;
				var cw       = c.clientWidth * dp, ch = c.clientHeight * dp;
				var sizScale = ch * 0.0055;
				if ( c.width == cw && c.height == ch ) {
					ctx.clearRect( 0, 0, cw, ch );
				}
				else {
					c.width  = cw;
					c.height = ch;
				}
				ctx.beginPath();
				ctx.strokeStyle = bk;
				ctx.lineWidth   = 12 * sizScale;
				ctx.arc( c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, Math.PI * 0.1 );
				ctx.stroke();
				ctx.beginPath();
				ctx.strokeStyle = fg;
				ctx.lineWidth   = 12 * sizScale;
				ctx.arc( c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, amount * Math.PI * 1.2 - Math.PI * 1.1 );
				ctx.stroke();
				if ( typeof progress !== "undefined" ) {
					ctx.fillStyle = prog;
					ctx.fillRect( c.width * 0.3, c.height - 16 * sizScale, c.width * 0.4 * progress, 4 * sizScale );
				}
			},

			oscillate: function () {
				return 1 + 0.02 * Math.sin( Date.now() / 100 );
			},

			mbpsToAmount: function ( s ) {
				return 1 - ( 1 / ( Math.pow( 1.3, Math.sqrt( s ) ) ) );
			},

			msToAmount: function ( s ) {
				return 1 - ( 1 / ( Math.pow( 1.08, Math.sqrt( s ) ) ) );
			},

			initMeters: function () {
				let vm = this;

				vm.drawMeter( I( "dlMeter" ), 0, vm.graph.color.meter, vm.graph.color.dl, 0 );
				vm.drawMeter( I( "ulMeter" ), 0, vm.graph.color.meter, vm.graph.color.ul, 0 );
				//vm.drawMeter( I( "pingMeter" ), 0, vm.graph.color.meter, vm.graph.color.ping, 0 );
				//vm.drawMeter( I( "jitMeter" ), 0, vm.graph.color.meter, vm.graph.color.jit, 0 );
				I( "dlText" ).textContent   = "";
				I( "ulText" ).textContent   = "";
				//I( "pingText" ).textContent = "";
				//I( "jitText" ).textContent  = "";
				//I( "ip" ).textContent       = "";
			},

			updateMeters: function ( forced ) {
				let vm = this;

				if ( !forced && vm.speedtest.getState() != 3 ) {
					return;
				}
				if ( vm.speedtestData == null ) {
					return;
				}

				let status = vm.speedtestData.testState;

				//I( "ip" ).textContent = vm.speedtestData.clientIp;

				I( "dlText" ).textContent = ( status == 1 && vm.speedtestData.dlStatus == 0 ) ? "..." : vm.speedtestData.dlStatus;
				vm.drawMeter( I( "dlMeter" ), vm.mbpsToAmount( Number( vm.speedtestData.dlStatus * ( status == 1 ? vm.oscillate() : 1 ) ) ), vm.graph.color.meter, vm.graph.color.dl, Number( vm.speedtestData.dlProgress ), vm.graph.color.prog );

				I( "ulText" ).textContent = ( status == 3 && vm.speedtestData.ulStatus == 0 ) ? "..." : vm.speedtestData.ulStatus;
				vm.drawMeter( I( "ulMeter" ), vm.mbpsToAmount( Number( vm.speedtestData.ulStatus * ( status == 3 ? vm.oscillate() : 1 ) ) ), vm.graph.color.meter, vm.graph.color.ul, Number( vm.speedtestData.ulProgress ), vm.graph.color.prog );

				/*I( "pingText" ).textContent = vm.speedtestData.pingStatus;
				vm.drawMeter( I( "pingMeter" ), vm.msToAmount( Number( vm.speedtestData.pingStatus * ( status == 2 ? vm.oscillate() : 1 ) ) ), vm.graph.color.meter, vm.graph.color.ping, Number( vm.speedtestData.pingProgress ), vm.graph.color.prog );

				I( "jitText" ).textContent = vm.speedtestData.jitterStatus;
				vm.drawMeter( I( "jitMeter" ), vm.msToAmount( Number( vm.speedtestData.jitterStatus * ( status == 2 ? vm.oscillate() : 1 ) ) ), vm.graph.color.meter, vm.graph.color.jit, Number( vm.speedtestData.pingProgress ), vm.graph.color.prog );
				*/
			}


		}

	});

});