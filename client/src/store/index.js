import { createStore } from 'vuex';

export default createStore({
	state: {
		ws: new WebSocket('ws://localhost:3541'), // NODE_ENV ?
		wsReadyState: 3,
	},
	getters: {},
	mutations: {},
	actions: {
		WEBSOCKET_SEND_MESSAGE({ state }, msg) {
			try {
				state.ws.send(msg);
			} catch(e) {

			}
		},
		WEBSOCKET_CHANGE_READYSTATE({state}) {
			state.wsReadyState = state.ws.readyState;
		},
	},
	modules: {}
});
