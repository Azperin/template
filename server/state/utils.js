const zlib = require('zlib');
const SYMBOLS = 'abcdefghijklmnopqrstuvwxyz_.!?$-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('');
const SYBOLS_LENGTH = SYMBOLS.length;

module.exports = {

	/**
	 * Generate a token mainly for auth purpose
	 * @param {number} [len] - token length
	 * @returns {string}
	 */
	generateToken: (len = 160) => {
		let token = '';
		while(len--) {
			token += SYMBOLS[Math.floor(Math.random() * SYBOLS_LENGTH)];
		};
		return token;
	},

	/**
	 * Infinite (almost?) increment for generating next ID for users or something like that
	 * @param {string} str - integer as string
	 * @returns {string}
	 */
	generateNextId: (str) => {
		str = `${str}`;
		const len = str.length;
		let carry = true;
		let output = '';

		for (let i = len - 1; i >= 0; i--) {
			const digit = parseInt(str[i]);
			const newDigit = carry ? digit + 1 : digit;

			if (newDigit === 10) {
				output = `0${output}`;
			} else {
				output = `${newDigit}${output}`;
				carry = false;
			};
		};

		if (carry) {
			output = `1${output}`;
		};

		return output;
	},

	/**
	 * Stringify and compress JSON message with zlib library
	 * @param {JSON} message - JSON message to compress
	 * @param {number} [level] - Compression level from 0 to 9
	 * @returns {buffer}
	 */
	compressMsg: (message, level = 7) => {
		try {
			return zlib.gzipSync(JSON.stringify(message), { level: level });
			// return Array.from(zlib.gzipSync(JSON.stringify(message), { level: level })).reduce((x,v) => x += String.fromCharCode(v), '');
		} catch(e) { return ''; };
	},
};