'use strict';

const Homey = require('homey');

class SamsungLockApp extends Homey.App {

	onInit() {

		this.log('Samsung Z-Wave Lock is running...');

	}

}

module.exports = SamsungLockApp;
