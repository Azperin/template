const DB = require('better-sqlite3')('./db/database.db', {});
const UTILS = require('../utils/index.js');
DB.exec('CREATE TABLE IF NOT EXISTS users (id TEXT primary key, token TEXT, balance NUMERIC)');
DB.exec('CREATE TABLE IF NOT EXISTS latest_ids (user_id TEXT)');
// DB.prepare(`INSERT INTO latest_ids (user_id) VALUES ('0');`).run();

// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => `${x}`).forEach(x => {
// 	DB.prepare(`INSERT INTO users (id,token,balance) VALUES ('${x}','${UTILS.generateToken()}', 0);`).run();
// 	DB.prepare(`UPDATE latest_ids SET user_id = '${x}';`).run();
// });

module.exports = DB;
