const DB = require('../db/index.js');
const Utils = require('../utils/index.js');
const CACHED_AUTH_MESSAGE_PROPERTY_NAME = 'cachedAuthMessage';
const USER_PROXY_HANDLER = {
	get: function(obj, prop) {
		if (prop === CACHED_AUTH_MESSAGE_PROPERTY_NAME) {
			obj[prop] = Utils.compressMsg({
				a: 'auth',
				success: true,
				uid: obj.user_id,
				token: obj.user_token,
				email: obj.user_email,
			}, 9);
		};
		return obj[prop];
	},
	set: function(obj, prop, value) {
		obj[prop] = value;
		if (prop !== 'lastAccess' && obj[CACHED_AUTH_MESSAGE_PROPERTY_NAME]) {
			obj[CACHED_AUTH_MESSAGE_PROPERTY_NAME] = null;
		};

		return true;
	},
};

const APP = {
	CACHE: {
		users: new Map(), // by IDs
		latestUsedIds: new Map(), // user
		emailPincodes: new Map(), // sended auth pincodes
	},

	/**
	 * Initiate APP to create cache and gather latest IDs
	 */
	init: function() {
		this.CACHE.latestUsedIds.set('user', DB.prepare(`SELECT user_id FROM latest_used_ids LIMIT 1;`).get()?.user_id ?? '0');
	},

	/**
	 * Search user in DB and put it to cache
	 * @param {string} uid
	 * @returns {proxy | undefined} 
	 */
	getUser: function(uid) {
		if (!this.CACHE.users.has(uid)) {
			let user = DB.prepare(`SELECT user_id, user_email, user_token, user_balance FROM users WHERE user_id = '${uid}' LIMIT 1`).get(); // is that garbage collectable ?
			if (!user) return;
			
			this.CACHE.users.set(uid, new Proxy( structuredClone(user), USER_PROXY_HANDLER)); 
		};
		
		this.CACHE.users.get(uid).lastAccess = Date.now();
		return this.CACHE.users.get(uid);
	},

	/**
	 * Add user to database if not exist already
	 * @todo error handle if database fails query. Maybe try catch ?
	 * @param {string} email prevalid email, that should be cached
	 * @returns {string} user id 
	 */
	createUser: function(email) {
		let uid = DB.prepare(`SELECT user_id FROM users WHERE user_email = '${ email }' LIMIT 1`).get()?.user_id;
		if (uid) return uid; // if that email already exists just return id for that user

		uid = Utils.generateNextId(this.CACHE.latestUsedIds.get('user'));
		let token = Utils.generateToken();

		DB.prepare(`INSERT INTO users (user_id, user_email, user_token, user_balance) VALUES ('${uid}', '${email}', '${token}', 0);`).run();
		DB.prepare(`UPDATE latest_used_ids SET user_id = '${uid}' LIMIT 1;`).run();
		this.CACHE.latestUsedIds.set('user', uid);

		return uid;
	},

	/**
	 * @param {object} ws current socket
	 * @param {string | undefined} uid provide no UID if want to send failed auth
	 */
	sendAuthentication: function(ws, uid) {
		if (!uid) {
			ws.send(Utils.WEBSOCKET_FAILED_AUTH_MESSAGE, Utils.WEBSOCKET_DEFAULT_SEND_OPTIONS);
			return;
		} else {
			ws.uid = uid;
			let msg = this.getUser(uid).cachedAuthMessage;
			ws.send(msg, Utils.WEBSOCKET_DEFAULT_SEND_OPTIONS);
			return;
		};
	},

	/**
	 * Send pincode to email for authorization
	 * @param {string} email must be already valid email
	 */
	sendPincodeToEmail: function(email) {
		let sendedEmail = this.CACHE.emailPincodes.get(email);
		let currentDate = Date.now();

		if (sendedEmail) {
			console.log('have one');
			return;
		};

		let pin = Utils.generatePincode()
		this.CACHE.emailPincodes.set(email, {
			pin: pin,
			createdAt: currentDate, // 5 * 60 * 1000 = 300 000 = 5 минут
		});
		console.log(`Send pincode ${pin} to email ${email}`);

		// then send pincode with some sender
	},

};

module.exports = APP;
