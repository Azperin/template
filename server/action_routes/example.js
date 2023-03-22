module.exports = {
	exampleActionOne: function(ws, WSS, request, GLOBAL_STATE) {
		console.log('1')
	},

	exampleActionTwo: function(ws, WSS, request, GLOBAL_STATE) {
		console.log('2')
	},

	exampleEcho: function(ws, WSS, request, GLOBAL_STATE) {
		let msg = GLOBAL_STATE.compressMsg({ a: 'echotest', t: request.echo }, 9);
		ws.send(msg, { isBinary: true });
	},
};