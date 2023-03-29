<template>
	<NConfigProvider>
		<div class="wrapper">
			<div class="nav">
				<h2>Websocket Ready State: {{ wsReadyState }}, Timediff: {{ timeDiff }}ms, UID: {{ uid }}</h2>
				<router-link to="/">Home</router-link> |
				<router-link to="/profile">Profile</router-link>
			</div>
			<router-view class="router-view"></router-view>
		</div>
	</NConfigProvider>

</template>

<script>
import { NConfigProvider } from 'naive-ui';
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

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
</style>
