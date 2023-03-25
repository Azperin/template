const DB = require('../db/index.js');
const UTILS = require('../utils/index.js');

const APP = {

	/**
	 * Search user in DB and put it to cache
	 * @param {string} uid - user ID
	 * @returns {proxy}
	 */
	getUser: function(uid = '') {
		uid = `${uid}`;
		if (!UTILS.isUidValid(uid)) return 'z';
		if (!this.cachedUsers.has(uid)) {
			this.cachedUsers.set(uid, DB.prepare(`SELECT * FROM users WHERE id = '${uid}' LIMIT 1`).get());
		};
		
		return this.cachedUsers.get(uid);
	},

	cachedUsers: new Map(),
};


module.exports = APP;
