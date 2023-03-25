const DB = require('better-sqlite3')('./db/database.db', {});
DB.exec('CREATE TABLE IF NOT EXISTS users (id TEXT primary key, token TEXT, balance NUMERIC)');

/*
	Examples
	DB.exec('CREATE TABLE IF NOT EXISTS users (user_id TEXT primary key, token TEXT, balance NUMERIC)');
	DB.exec(`INSERT INTO users (user_id,user_name) VALUES ('2','LLOLOLO')`);
*/


module.exports = DB;
