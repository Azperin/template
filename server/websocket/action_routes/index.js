const APP = require('../../app/index.js');
const Utils = require('../../utils/index.js');

// anything to do with action name collisions ?
module.exports = {
	...require('./example.js'),

	/**
	 * Initiate client state
	 */
	init: function(ws, message) {
		let { cts } = message;
		cts = parseInt(cts, 10); // force make number type instead of checking with Regex or something

		let msg = Utils.compressMsg({ a: 'init', cts: cts, sts: Date.now() }, 6);
		ws.send(msg, Utils.WEBSOCKET_DEFAULT_SEND_OPTIONS);
	},

	/**
	 * Logout user
	 */
	logout: function(ws) {
		if (!ws.uid) return;
		ws.uid = '';
		APP.sendAuthentication(ws);
	},

	/**
	 * Try to auth user with given token
	 */
	auth: function(ws, message) {
		if (ws.uid) return;
		let { uid, token } = message;
		if (!Utils.isUidValid(uid) || !Utils.isTokenValid(token)) return;
		
		const user = APP.getUser(uid);
		if (!user || user.user_token !== token) {
			APP.sendAuthentication(ws);
			return;
		};

		APP.sendAuthentication(ws, uid);
	},

	/**
	 * Try to auth user with given email and pincode. Also create one if no exists 
	 */
	emailAuth: function(ws, message) {
		if (ws.uid) return;
		const { email, pin } = message;
		if (!Utils.isEmailValid(email)) return;
		if (!pin) return;
		
		const sendedEmailPincode = APP.CACHE.emailPincodes.get(email);

		if (!sendedEmailPincode || pin !== sendedEmailPincode.pin) {
			return APP.sendAuthentication(ws);
		};

		APP.CACHE.emailPincodes.delete(email);
		let uid = APP.createUser(email);
		APP.sendAuthentication(ws, uid);
	},

	/**
	 * @todo limit requests for different emails, atleast per socket connection
	 */
	requestEmailPincode: function (ws, message) {
		if (ws.uid) return; // can request only if that socket connection not authorized
		let { email } = message;
		if (!Utils.isEmailValid(email)) return;
		APP.sendPincodeToEmail(email);
		ws.send(Utils.WEBSOCKET_SEND_PINCODE_MESSAGE, Utils.WEBSOCKET_DEFAULT_SEND_OPTIONS);
	},

};