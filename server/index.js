const WebSocket = require('ws');
const WSS = new WebSocket.Server({ port: 3541 });

WSS.on('connection', function(ws) { // second arg is http connectionRequest that can be use for gather cookies if needed
	console.log('------ GOT CONNECTION');
	
	ws.on('close', () => '').on('error', (err) => {}).on('message', (m) => {});
});