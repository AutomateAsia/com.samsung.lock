'use strict';

const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class P7X8EU extends ZwaveDevice {
	async onNodeInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();


		let homey_unlocked = this.homey.flow.getDeviceTriggerCard('homey_unlocked');
		let touchpad_unlocked = this.homey.flow.getDeviceTriggerCard('touchpad_unlocked');
		let manual_unlocked = this.homey.flow.getDeviceTriggerCard('manual_unlocked');
		let finger_unlocked = this.homey.flow.getDeviceTriggerCard('finger_unlocked');
		let card_unlocked = this.homey.flow.getDeviceTriggerCard('card_unlocked');

		// register capabilities for this device
		this.registerCapability('locked', 'DOOR_LOCK',{
			get: 'DOOR_LOCK_OPERATION_GET',
			getOpts: {
				getOnStart : true,
			},
			set: 'DOOR_LOCK_OPERATION_SET',
			setParserV2: value => {
				if (this.getCapabilityValue('locked') === value){
					// The registerCapability using NOTIFICATION seems to cause a repeated lock/unlock command.
					// This condition is to prevent the repeated lock command from firing
					return null;
				}else{
					return {
						'Door Lock Mode': (!value) ? 'Door Unsecured' : 'Door Secured',
					};
				}
			},
			report: 'DOOR_LOCK_OPERATION_REPORT',
			reportParser(report) {
				return report['Door Lock Mode'] === 'Door Secured';
			}
		});


		this.registerCapability('locked', 'ALARM', {
			report: 'ALARM_REPORT',
			reportParser(report) {
				if (report.hasOwnProperty("Alarm Type") && (this.getCapabilityValue('locked') === true)) {
					if (report['Alarm Type'] == '6' && report.hasOwnProperty("Alarm Level")) {

						//open from back
						if (report['Alarm Level'] == '176'){
							manual_unlocked.trigger(this, null, null);
							return false;
						}

						//open from front
						if (report['Alarm Level'] == '0'){
							touchpad_unlocked.trigger(this, null, null);
							return false;
						}

						//open from hub
						if (report['Alarm Level'] == '96'){
							homey_unlocked.trigger(this, null, null);
							return false;
						}

						//open from fingerprint
						if (report['Alarm Level'] == '80'){
							finger_unlocked.trigger(this, null, null);
							return false;
						}

						//open from card
						if ((report['Alarm Level'] >= '1') && (report['Alarm Level'] <= '20')){
							//unlock by pin
							const tokens = {
								"cardid": report['Alarm Level']
							}
							card_unlocked.trigger(this, tokens, null);
							return false;
						}
					}
				}
				return null;
			}
		});
	}
}

module.exports = P7X8EU;
