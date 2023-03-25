const DB = require('../db/index.js');
const UTILS = require('../utils/index.js');
const USER_PROXY_HANDLER = {};

const APP = {
	latestIds: new Map(),
	cachedUsers: new Map(),

	/**
	 * Initiate APP to create cache and gather latest IDs
	 */
	init: function() {
		this.latestIds.set('user', DB.prepare(`SELECT user_id FROM latest_ids LIMIT 1;`).get().user_id);
	},

	/**
	 * Search user in DB and put it to cache
	 * @param {string} uid - user ID
	 * @returns {proxy}
	 */
	getUser: function(uid = '') {
		uid = `${uid}`;
		if (!UTILS.isUidValid(uid)) return;
		if (!this.cachedUsers.has(uid)) {
			let user = DB.prepare(`SELECT id,token,balance FROM users WHERE id = '${uid}' LIMIT 1`).get(); // is that garbage collectable ?
			if (!user) return;

			this.cachedUsers.set(uid, new Proxy( structuredClone(user), USER_PROXY_HANDLER)); 
		};
		
		return this.cachedUsers.get(uid);
	},

};


module.exports = APP;
