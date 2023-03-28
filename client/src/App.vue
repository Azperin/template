<template>
	<div class="wrapper">
		<h3>Websocket Ready State: {{ wsReadyState }}, Timediff: {{ timeDiff }}ms, UID: {{ uid }}</h3>
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav>
		
		<router-view></router-view>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import pako from 'pako';
export default {
	computed: { ...mapState(['ws','wsReadyState','timeDiff', 'uid']) },
	methods: { ...mapActions(['WEBSOCKET_SEND_MESSAGE','WEBSOCKET_CHANGE_READYSTATE'])},
	created() {
		this.ws.onopen = () => {
			// init app
			this.WEBSOCKET_SEND_MESSAGE({ a: 'init', cts: Date.now() });
			let uid = localStorage.getItem('uid');
			if (uid) {
				let token = localStorage.getItem('token');
				this.WEBSOCKET_SEND_MESSAGE({ a: 'auth', uid: uid, token: token });
			};
			this.WEBSOCKET_CHANGE_READYSTATE();
		};
		this.ws.onclose = this.WEBSOCKET_CHANGE_READYSTATE;
		this.ws.onerror = this.WEBSOCKET_CHANGE_READYSTATE;
		this.ws.onmessage = (msg) => {
			if (!msg.isTrusted) return;
			msg.data.arrayBuffer().then(msgData => {
				try {
					msgData = JSON.parse(pako.ungzip(msgData, { to: 'string' }));
				} catch(e) { return; };
				
				if (!this.$store._mutations[msgData.a]) return;
				this.$store.commit(msgData.a, msgData);
			});
		};
	},
}
</script>

<style></style>
