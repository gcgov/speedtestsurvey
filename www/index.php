<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Speed Test Survey</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>

	<script type="text/x-template" id="template-speedtest">
		<div>
			<div id="loading" v-if="processRunning('st_select_server')">
				<span class="loadCircle"></span>Selecting a server
			</div>

			<template v-if="showSpeedtest">
				<div id="testWrapper">

					<div id="test">

						<div class="testGroup">
							<div class="testArea" id="dlGraph">
								<div class="testName">Download</div>
								<canvas id="dlMeter" class="meter"></canvas>
								<div id="dlText" class="meterText"></div>
								<div class="unit">Mbps</div>
							</div>
							<div class="testArea" id="ulGraph">
								<div class="testName">Upload</div>
								<canvas id="ulMeter" class="meter"></canvas>
								<div id="ulText" class="meterText"></div>
								<div class="unit">Mbps</div>
							</div>
						</div>

					</div>
				</div>
			</template>
		</div>
	</script>


	<div id="speedTestPage">
		<h1>Speed test Survey</h1>

		<div class="into">
			<p>There are two options that you may select in order to share internet service information with us (you can do both and can also do each more than once):</p><br>

			<p><strong>Option 1: Select this option if you DO NOT have internet service</strong> - This option gives you the opportunity to report gaps in internet service. This information is valuable and will give us an opportunity to analyze the potential service options for your address.</p><br>

			<p><strong>Option 2: Select this option if you currently have internet service</strong> - Although you have service, this option will let us know how your service is performing and whether you desire upgrades to your service.</p><br>

		</div>
		<br>
		<hr>
		<br>

		<div class="page-content">

			<div class="step" v-if="step==='intro'">

				<div class="qa">

					<ul class="answers">

						<li>
							<label class="answer">
								<div class="input">
									<input type="radio" value="no-internet" v-model="survey.submissionType" />
								</div>
								<div class="text">
									Report NO internet service
								</div>
							</label>
						</li>
						<li>
							<label class="answer">
								<div class="input">
									<input type="radio" value="speedtest" v-model="survey.submissionType" />
								</div>
								<div class="text">
									Share your internet service quality
									<div class="note">Please connect a mobile device to wifi before proceeding</div>
								</div>
							</label>
						</li>

					</ul>

				</div>

				<div class="actions">
					<a class="button qa-button" v-on:click="gotoNext" v-bind:class="{loading: loadingNextStep}">Get Started</a>
				</div>

			</div>

			<template v-if="state!='loading'">
				<div class="step" v-if="step==='no-internet-address'">

					<div class="qa">
						<div class="question">What is the address of the home/business with no service available?</div>

						<table class="address-table">
							<tr>
								<td colspan="2" class="city-cell">
									<input type="text" placeholder="Street Address" v-model="survey.address.street" v-bind:class="{ error: fieldHasError('survey.address.street') }" />
								</td>
								<td class="zip-cell">
									<input type="text" placeholder="Apt #" v-model="survey.address.street2" />
								</td>
							</tr>
							<tr>
								<td class="city-cell"><input type="text" placeholder="City" v-model="survey.address.city" class="city-input" v-bind:class="{ error: fieldHasError('survey.address.city') }" /></td>
								<td class="state-cell"><input type="text" placeholder="State" v-model="survey.address.state" maxlength="2" class="state-input" v-bind:class="{ error: fieldHasError('survey.address.state') }" /></td>
								<td class="zip-cell"><input type="text" placeholder="Zip" v-model="survey.address.zip" maxlength="5" class="zip-input" v-bind:class="{ error: fieldHasError('survey.address.zip') }" /></td>
							</tr>
						</table>
					</div>

					<div class="qa">
						<div class="question">Is there an Internet Service Provider available for this address?</div>
						<ul class="answers">
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="Yes" v-model="survey.noInternet.internetAvailable" />
									</div>
									<div class="text">
										Yes
									</div>
								</label>
							</li>
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="No" v-model="survey.noInternet.internetAvailable" />
									</div>
									<div class="text">
										No
									</div>
								</label>
							</li>
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="Unsure" v-model="survey.noInternet.internetAvailable" />
									</div>
									<div class="text">
										Unsure
									</div>
								</label>
							</li>
						</ul>

						<div v-if="survey.noInternet.internetAvailable=='Yes'">
							<label class="text">Which ISPs are available?</label>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="Comcast" /> Comcast</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="NeuBeam" /> NeuBeam</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="ProCom" /> ProCom</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="QCol" /> QCol</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="Shentel" /> Shentel</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="Somerfield Cable" /> Somerfield Cable</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.availableIsps" value="Verizon" /> Verizon</label></div>
						</div>

						<div v-if="survey.noInternet.internetAvailable=='Yes' && survey.noInternet.availableIsps.length>0">
							<label class="text">Why don't you subscribe to that service?</label>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.whyNoSubscription" value="Cost" /> Cost</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.whyNoSubscription" value="Service" /> Service</label></div>
							<div class="list-reponse"><label><input type="checkbox" v-model="survey.noInternet.whyNoSubscription" value="No ISP Response" /> ISP did not respond to my request</label></div>
						</div>

					</div>

					<div class="qa">
						<div class="question">Would you be interested in service at this address?</div>

						<ul class="answers">
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="Yes" v-model="survey.noInternet.interestedInService" />
									</div>
									<div class="text">
										Yes
									</div>
								</label>
							</li>
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="No" v-model="survey.noInternet.interestedInService" />
									</div>
									<div class="text">
										No
									</div>
								</label>
							</li>
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" value="Maybe" v-model="survey.noInternet.interestedInService" />
									</div>
									<div class="text">
										Maybe
									</div>
								</label>
							</li>
						</ul>


						<div v-if="survey.noInternet.interestedInService!='No'">
							<label class="text">How much would you potentially be willing to pay per month for reliable, high speed internet service?</label>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.pricePerMonth" value="Under $50" /> Under $50</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.pricePerMonth" value="$50-$75" /> $50-$75</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.pricePerMonth" value="$75-$100" /> $75-$100</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.pricePerMonth" value="$100-$150" /> $100-$150</label></div>
						</div>

						<div v-if="survey.noInternet.interestedInService!='No'">
							<label class="text">Some homes are too far from service and need an upfront investment in infrastructure. Would you be willing to help with these costs for a high quality internet connection?</label>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.interestedInInfrastructure" value="Yes" /> Yes</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.interestedInInfrastructure" value="No" /> No</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.interestedInInfrastructure" value="Maybe" /> Maybe</label></div>
						</div>

						<div v-if="survey.noInternet.interestedInService!='No' && survey.noInternet.interestedInInfrastructure!='No'">
							<label class="text">How much would you potentially be willing to provide for upfront infrastructure costs?</label>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="Under $500" /> Under $500</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="$500-$1,000" /> $500-$1,000</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="$1,000-$2,000" /> $1,000-$2,000</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="$2,000-$3,000" /> $2,000-$3,000</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="$3,000-$5,000" /> $3,000-$5,000</label></div>
							<div class="list-reponse"><label><input type="radio" v-model="survey.noInternet.priceForInfrastructure" value="Over $5,000" /> Over $5,000</label></div>
						</div>

					</div>

					<div class="qa">
						<div class="question">Please provide contact information if you would be interested in upgrading service at this address</div>
						<div>
							<label class="text">Name</label>
							<input type="text" placeholder="Name" v-model="survey.contact.name" />
						</div>
						<div>
							<label class="text">Email</label>
							<input type="text" placeholder="Email" v-model="survey.contact.email" />
						</div>
						<div>
							<label class="text">Phone</label>
							<input type="text" placeholder="Phone number" v-model="survey.contact.phone" />
						</div>
					</div>


					<div class="qa">
						<div class="question">Comments</div>
						<textarea v-model="survey.comments"></textarea>
					</div>

					<div class="actions">
						<a class="button" v-on:click="saveSurvey" v-bind:class="{loading: loadingNextStep}">Save and Submit Responses</a>
						<br /> <a class="cancel" v-on:click="reset">Cancel and Start Over</a>
					</div>

				</div>


				<div class="step" v-if="step==='pre-speedtest'">

					<div class="qa">
						<div class="question">It looks like your ISP is {{ survey.speedtest.isp.isp }}. Is that correct?</div>

						<ul class="answers">
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" v-bind:value="true" v-model="survey.speedtest.ispCorrect" />
									</div>
									<div class="text">
										Yes
									</div>
								</label>
							</li>
							<li>
								<label class="answer">
									<div class="input">
										<input type="radio" v-bind:value="false" v-model="survey.speedtest.ispCorrect" />
									</div>
									<div class="text">
										No
										<div class="note" v-if="!survey.speedtest.ispCorrect">If you are on a mobile device please connect to wifi and try again</div>
									</div>
								</label>
							</li>
						</ul>

					</div>

					<div class="actions" v-if="survey.speedtest.ispCorrect">
						<a class="button" v-on:click="gotoNext" v-bind:class="{loading: loadingNextStep}">Continue</a>
						<br /> <a class="cancel" v-on:click="reset">Cancel and Start Over</a>
					</div>

					<div class="actions" v-if="!survey.speedtest.ispCorrect">
						<div class="note strong-note">Please verify your device is connected to your wifi and then try again<br><br></div>
						<a class="button" v-on:click="reset" v-bind:class="{loading: loadingNextStep}">Try again</a>
					</div>
				</div>

				<div class="step asform" v-if="step==='speedtest'">

					<div class="qa">
						<div class="question">Speed test {{ speedTestState }} for {{ survey.speedtest.isp.isp }} </div>
						<speedtest v-on:update="speedtestUpdate" v-on:end="speedtestEnd"></speedtest>
					</div>

					<div class="qa">
						<div class="question">Please provide the address of where you are conducting this test</div>
						<table class="address-table">
							<tr>
								<td colspan="2" class="city-cell">
									<input type="text" placeholder="Street Address" v-model="survey.address.street" v-bind:class="{ error: fieldHasError('survey.address.street') }" />
								</td>
								<td class="zip-cell">
									<input type="text" placeholder="Apt #" v-model="survey.address.street2" />
								</td>
							</tr>
							<tr>
								<td class="city-cell"><input type="text" placeholder="City" v-model="survey.address.city" class="city-input" v-bind:class="{ error: fieldHasError('survey.address.city') }" /></td>
								<td class="state-cell"><input type="text" placeholder="State" v-model="survey.address.state" maxlength="2" class="state-input" v-bind:class="{ error: fieldHasError('survey.address.state') }" /></td>
								<td class="zip-cell"><input type="text" placeholder="Zip" v-model="survey.address.zip" maxlength="5" class="zip-input" v-bind:class="{ error: fieldHasError('survey.address.zip') }" /></td>
							</tr>
						</table>
						<div class="note"><br>If you would like to submit a speed test from another address, please open this form when you are that address</div>
					</div>


					<div class="qa">
						<div class="question">Rate your level of satisfaction with your existing service with {{ survey.speedtest.isp.isp }}</div>

						<label class="text">Performance of your internet connection</label>
						<div class="rating">
							<label class="rate" v-for="i in 5" v-bind:class="{selected: survey.speedtest.performanceSatisfaction==i }">
								<div class="text">{{ i }}<span v-if="i==1"> (Good)</span><span v-if="i==5"> (Bad)</span></div>
								<input type="radio" v-model="survey.speedtest.performanceSatisfaction" v-bind:value="i" />
							</label>
						</div>

						<label class="text">Price of your internet connection</label>
						<div class="rating">
							<label class="rate" v-for="i in 5" v-bind:class="{selected: survey.speedtest.priceSatisfaction==i }">
								<div class="text">{{ i }}<span v-if="i==1"> (Good)</span><span v-if="i==5"> (Bad)</span></div>
								<input type="radio" v-model="survey.speedtest.priceSatisfaction" v-bind:value="i" />
							</label>
						</div>

						<label class="text">Support from your ISP</label>
						<div class="rating">
							<label class="rate" v-for="i in 5" v-bind:class="{selected: survey.speedtest.supportSatisfaction==i }">
								<div class="text">{{ i }}<span v-if="i==1"> (Good)</span><span v-if="i==5"> (Bad)</span></div>
								<input type="radio" v-model="survey.speedtest.supportSatisfaction" v-bind:value="i" />
							</label>
						</div>
					</div>

					<div class="qa">
						<div class="question">How much do you pay for internet service per month?</div>
						<div>
							<input type="number" placeholder="Price per month" v-model="survey.speedtest.pricePerMonth" />
						</div>

						<label class="text">Does this amount also include:</label>
						<div class="list-reponse"><label><input type="checkbox" v-model="survey.speedtest.bundle" value="TV" /> TV</label></div>
						<div class="list-reponse"><label><input type="checkbox" v-model="survey.speedtest.bundle" value="Phone" /> Phone</label></div>

					</div>

					<div class="qa">
						<div class="question">Please provide contact information if you would be interested in upgrading service at this address</div>
						<div>
							<label class="text">Name</label>
							<input type="text" placeholder="Name" v-model="survey.contact.name" />
						</div>
						<div>
							<label class="text">Email</label>
							<input type="text" placeholder="Email" v-model="survey.contact.email" />
						</div>
						<div>
							<label class="text">Phone</label>
							<input type="text" placeholder="Phone number" v-model="survey.contact.phone" />
						</div>
					</div>


					<div class="qa">
						<div class="question">Comments</div>
						<textarea v-model="survey.comments"></textarea>
					</div>

					<div class="actions" v-if="speedTestState=='results'">
						<a class="button" v-on:click="saveSurvey" v-bind:class="{loading: loadingNextStep}">Save and Submit Results and Responses</a>
						<br /> <a class="cancel" v-on:click="reset">Cancel and Start Over</a>
					</div>
					<div class="actions" v-if="speedTestState!='results'">
						Waiting for results to finish...
					</div>

				</div>


				<div class="step asform" v-show="step==='speedtest-complete'">

					<div class="qa">
						<div class="question">Thank you for your responses!</div>

						<div>
							<label class="text">Click below to share this survey with others</label>
						</div>
						<div class="addthis_inline_share_toolbox"></div>

					</div>
					<div class="actions">
						<a class="cancel" v-on:click="reset">Submit more information on another location</a>
					</div>

				</div>

			</template>

		</div>


	</div>



	<script src="/libs/require.js"></script>
	<script>
		//configure require js
		requirejs.config( {
			baseUrl:'/script',
			paths: {
				jquery:'/libs/jquery',
				vue:'/libs/vue',
			}
		});

		requirejs(['core']);
	</script>
</body>
</html>
