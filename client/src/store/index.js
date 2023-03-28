import { createStore } from 'vuex';

export default createStore({
	state: {
		uid: '',
		token: '',
		email: '',
		timeDiff: 0, // difference in time between client and server. Usage: Date.now() + state.timeDiff, to sync time with server
		ws: new WebSocket('ws://localhost:3541'), // NODE_ENV ?
		wsReadyState: 3,
	},
	getters: {},
	mutations: {
		init: (state, { cts, sts }) => {
			const curretTime = Date.now();
			const roundTrip = Math.floor((curretTime - cts) / 2)
			state.timeDiff = (curretTime - roundTrip) - sts;
		},
		auth: (state, { success, uid, token, email }) => {
			console.log(success);
			localStorage.setItem('uid', success ? uid : '');
			localStorage.setItem('token', success ? token: '');
			localStorage.setItem('email', success ? email: '');

			state.uid = success ? uid : '';
			state.token = success ? token: '';
			state.email = success ? email: '';
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
