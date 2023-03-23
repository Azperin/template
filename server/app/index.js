const DB = require('../db/index.js');
const APP = {

	/**
	 * Search user in DB and put it to cache
	 * @param {string} uid - user ID
	 * @returns {proxy}
	 */
	getUser: function(uid) {
		if (!this.cachedUsers.has(uid)) {
			this.cachedUsers.set(uid, DB.prepare(`SELECT * FROM users WHERE user_id = ? LIMIT 1`).get(uid));
		};
		// search in database
		
		return this.cachedUsers.get(uid);
	},

	cachedUsers: new Map(),
};


module.exports = APP;
