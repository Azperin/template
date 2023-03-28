const zlib = require('zlib');
const SYMBOLS = 'abcdefghijklmnopqrstuvwxyz_.!?$-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('');
const SYBOLS_LENGTH = SYMBOLS.length;
const DEFAULT_TOKEN_LENGTH = 160;
const UID_REGEX = new RegExp("^[0-9]+$");
const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9]{1,30}@[a-zA-Z0-9]{1,30}[.]{1}[a-zA-Z]{1,10}$");

const Utils = {
	WEBSOCKET_DEFAULT_SEND_OPTIONS: { isBinary: true, compress: false },
	WEBSOCKET_SEND_PINCODE_MESSAGE: null,
	WEBSOCKET_FAILED_AUTH_MESSAGE: null,

	/**
	 * Validate user id
	 * @param {string} [len] - uid
	 * @returns {boolean}
	 */
	isUidValid: (user_id) => {
		return typeof user_id === 'string' && UID_REGEX.test(user_id);
	},

	/**
	 * Validate auth token with default length
	 * @param {string} token
	 * @returns {boolean}
	 */
	isTokenValid: (token) => {
		if (typeof token !== 'string') return;
		if (token.length !== DEFAULT_TOKEN_LENGTH) return;
		return true;
	},

	/**
	 * Validate given email with regex
	 * @param {string} [email]
	 * @returns {boolean}
	 */
	isEmailValid: (email) => {
		return EMAIL_REGEX.test(email);
	},

	/**
	 * Generate a token mainly for auth purpose
	 * @todo add handle for wrong argument types. If length is incorrect, should use default length or throw an error ?
	 * @param {number} [token_length] default length is 160 
	 * @returns {string}
	 */
	generateToken: (token_length = DEFAULT_TOKEN_LENGTH) => {
		let token = '';
		while(token_length--) {
			token += SYMBOLS[Math.floor(Math.random() * SYBOLS_LENGTH)];
		};
		return token;
	},

	/**
	 * Generate a pincode for email to send
	 * @returns {string}
	 */
	generatePincode: () => {
		let pin = '';
		let i = 6; // magic ?

		while(i--) {
			pin = `${ pin }${ Math.floor(Math.random() * 10) }`;
		};

		return pin;
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
	 * @param {object} message - JSON message to compress
	 * @param {number} [level] - Compression level from 0 to 9
	 * @returns {buffer}
	 */
	compressMsg: (message, level = 7) => {
		try {
			return zlib.gzipSync(JSON.stringify(message), { level: level });
		} catch(e) { return ''; };
	},
};

Utils.WEBSOCKET_FAILED_AUTH_MESSAGE = Utils.compressMsg({ a: 'auth', success: false }, 9);
Utils.WEBSOCKET_SEND_PINCODE_MESSAGE = Utils.compressMsg({ a: 'authRequestEmailPincode' }, 9);

module.exports = Utils;