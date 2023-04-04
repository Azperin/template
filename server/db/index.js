const DB = require('better-sqlite3')('./db/database.db', {});
const UTILS = require('../utils/index.js');
DB.exec('CREATE TABLE IF NOT EXISTS users (user_id TEXT UNIQUE, user_email TEXT UNIQUE, user_token TEXT, user_balance INTEGER)');
DB.exec('CREATE TABLE IF NOT EXISTS latest_used_ids (user_id TEXT)');

if (!DB.prepare(`SELECT user_id FROM latest_used_ids LIMIT 1;`).get()) {
	DB.prepare(`INSERT INTO latest_used_ids (user_id) VALUES ('0');`).run();
};




module.exports = DB;

/* example mock users
	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => `${x}`).forEach(x => {
		DB.prepare(`INSERT INTO users (user_id, user_email, user_token, user_balance) VALUES ('${x}', 'mail${x}@gmail.com' ,'${UTILS.generateToken()}', 0);`).run();
		DB.prepare(`UPDATE latest_used_ids SET user_id = '${x}';`).run();
	});
*/