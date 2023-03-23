const WebSocket = require('ws');
const WSS = new WebSocket.Server({ port: 3541, maxPayload: 1024 * 300 }); // 1024 = 1 KB
const SOCKET_MAX_REQUEST_PER_SECONDS = 10;
const SOCKET_ROUTER = require('./action_routes/index.js');

WSS.on('connection', function(ws) { // second arg is http connectionRequest that can be use for gather cookies if needed
	console.log('------ GOT CONNECTION');
	ws.lastRequestAt = Date.now();
	ws.spamRequestsCounter = 0;

	ws.on('close', () => '').on('error', (err) => {}).on('message', (message) => {
		if (!message) return;
		const currentTime = Date.now();
		ws.spamRequestsCounter = (currentTime - ws.lastRequestAt) > 1000 ? 0 : (ws.spamRequestsCounter + 1);
		if (ws.spamRequestsCounter > SOCKET_MAX_REQUEST_PER_SECONDS) return;
		ws.lastRequestAt = currentTime;

		// socket only accept message as JSON with property 'a' as action
		
		try { 
			message = JSON.parse(message); 
		} catch { return; };
		let requestAction = message?.a;
		if (!SOCKET_ROUTER.hasOwnProperty(requestAction)) return;

		SOCKET_ROUTER[requestAction](ws, message); // call loaded action if exists

	});
});

module.exports = WSS;
