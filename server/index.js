const WebSocket = require('ws');
const WSS = new WebSocket.Server({ port: 3541 });
const MAX_SOCKET_REQUEST_PER_SECONDS = 10;

WSS.on('connection', function(ws) { // second arg is http connectionRequest that can be use for gather cookies if needed
	console.log('------ GOT CONNECTION');
	ws.lastRequestAt = Date.now();
	ws.spamRequestsCounter = 0;

	ws.on('close', () => '').on('error', (err) => {}).on('message', (m) => {
		if (!m) return;
		const currentTime = Date.now();
		ws.spamRequestsCounter = (currentTime - ws.lastRequestAt) > 1000 ? 0 : (ws.spamRequestsCounter + 1);
		if (ws.spamRequestsCounter > MAX_SOCKET_REQUESTS_PER_SECOND) return;
		
	});
});