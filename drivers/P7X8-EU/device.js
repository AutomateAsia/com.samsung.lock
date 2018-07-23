'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P7X8EU extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();


		let homey_unlocked = new Homey.FlowCardTriggerDevice('homey_unlocked');
		homey_unlocked.register();

		let touchpad_unlocked = new Homey.FlowCardTriggerDevice('touchpad_unlocked');
		touchpad_unlocked.register();

		let manual_unlocked = new Homey.FlowCardTriggerDevice('manual_unlocked');
		manual_unlocked.register();

		let finger_unlocked = new Homey.FlowCardTriggerDevice('finger_unlocked');
		finger_unlocked.register();

		let card_unlocked = new Homey.FlowCardTriggerDevice('card_unlocked');
		card_unlocked.register();

		// register capabilities for this device
		this.registerCapability('locked', 'DOOR_LOCK',{
			getOpts: {
				getOnStart : true,
				pollInterval : 300000
			},
			report: 'DOOR_LOCK_REPORT',
			reportParser(report) {
				console.log('===Door Lock Operation===');
				console.log(report);
				return report['Door Lock Mode'] === 'Door Secured';
			}
		});


		this.registerCapability('locked', 'ALARM', {
			report: 'ALARM_REPORT',
			reportParser(report) {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '6' && report.hasOwnProperty("Alarm Level")) {

						//open from back
						if (report['Alarm Level'] == '176'){
							manual_unlocked.trigger(this, null, null);
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from front
						if (report['Alarm Level'] == '0'){
							touchpad_unlocked.trigger(this, null, null);
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from hub
						if (report['Alarm Level'] == '96'){
							homey_unlocked.trigger(this, null, null);
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from fingerprint
						if (report['Alarm Level'] == '80'){
							finger_unlocked.trigger(this, null, null);
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from card
						if ((report['Alarm Level'] >= '1') && (report['Alarm Level'] <= '20')){
							//unlock by pin
							const tokens = {
								"cardid": report['Alarm Level']
							}
							card_unlocked.trigger(this, tokens, null);
							return report['Door Lock Mode'] === 'Door Unsecured';
						}
					}
				}
				return null;
			}
		});
	}
}

module.exports = P7X8EU;
