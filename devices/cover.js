let sf = require("../service_functions.js");
let device = require("../device.js");

module.exports = class devCover extends device {
	constructor(plc, mqtt, config, mqtt_base) {
		super(plc, mqtt, config, mqtt_base);

		// currentPosition
		if (config.currentPosition) {
			this.create_attribute(config.currentPosition, "X", "currentPosition");
			this.attributes["currentPosition"].set_RW("r"); // read from s7 and publish to mqtt
		}
	}

	send_discover_msg() {
		let info = {
			name: this.name,
			payload_open: 'true',
			payload_close: 'false',
			payload_stop: 'false',
			state_open: 'false',
			state_closed: 'true'
		}

		if (this.attributes["currentPosition"])
			info.state_topic = this.attributes["currentPosition"].full_mqtt_topic;

		super.send_discover_msg(info);
	}

	rec_mqtt_data(attr, data) {

		// call parent class method
		super.rec_mqtt_data(attr, data, (error) => {
			// callback function of attribute when write was finished

		});
	}

}
