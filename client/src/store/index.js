import { createStore } from 'vuex';

export default createStore({
	state: {
		ws: new WebSocket('ws://localhost:3541'), // NODE_ENV ?
		wsReadyState: 3,
	},
	getters: {},
	mutations: {
		echotest: (state, e) => {
			console.log(e);
		},
	},
	actions: {
		WEBSOCKET_SEND_MESSAGE({ state }, msg) {
			try {
				msg = JSON.stringify(msg);
			} catch(e) { return; }
			state.ws.send(msg);
		},
		WEBSOCKET_CHANGE_READYSTATE({state}) {
			state.wsReadyState = state.ws.readyState;
		},
	},
	modules: {}
});
