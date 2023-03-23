const WSS = require('../index.js');
const Utils = require('../../utils/index.js');

module.exports = {
	exampleActionOne: function(ws, message) {
		console.log('1')
	},

	exampleActionTwo: function(ws, message) {
		console.log('2')
	},

	exampleEcho: function(ws, message) {
		let msg = Utils.compressMsg({ a: 'echotest', t: message.echo }, 9);
		ws.send(msg, { isBinary: true, compress: false });
	},
};