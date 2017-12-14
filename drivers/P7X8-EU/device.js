'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P7X8EU extends ZwaveDevice {
	onMeshInit() {

		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();

		// register capabilities for this device
		this.registerCapability('locked', 'DOOR_LOCK',{
			getOpts: {
				getOnStart : true,
				pollInterval : 300000
			},
			report: 'DOOR_LOCK_OPERATION_REPORT',
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
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from front
						if (report['Alarm Level'] == '0'){
							return report['Door Lock Mode'] === 'Door Unsecured';
						}

						//open from hub
						if (report['Alarm Level'] == '96'){
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
