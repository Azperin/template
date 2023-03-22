const WebSocket = require('ws');
const WSS = new WebSocket.Server({ port: 3541 });
const SOCKET_MAX_REQUEST_PER_SECONDS = 10;
const SOCKET_ROUTER = require('./action_routes/index.js');
const GLOBAL_STATE = {};

console.log(SOCKET_ROUTER);

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
		let request;
		try { 
			request = JSON.parse(message); 
		} catch { return; };
		let requestAction = request?.a;
		if (!SOCKET_ROUTER.hasOwnProperty(requestAction)) return;

		SOCKET_ROUTER[requestAction](ws, WSS, request, GLOBAL_STATE); // call loaded action if exists

	});
});