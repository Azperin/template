<template>
	<NConfigProvider :theme="currentTheme">
		<n-layout position="absolute">
			<n-layout-header style="height: 52px; padding: 0px 10px ;" bordered>
				<div class="nav">
					<h2 @click="toggleTheme">Websocket Ready State: {{ wsReadyState }}, Timediff: {{ timeDiff }}ms, UID: {{ uid }}</h2>
					<router-link to="/">Home</router-link> |
					<router-link to="/profile">Profile</router-link>
				</div>
			</n-layout-header>
			<n-layout position="absolute" style="top: 52px; bottom: 0px;">
				<n-layout-content>
					<router-view style="padding: 10px;"></router-view>
				</n-layout-content>
			</n-layout>
		</n-layout>	
	</NConfigProvider>
</template>

<script>
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, darkTheme, lightTheme } from 'naive-ui';
import { mapState, mapActions } from 'vuex';
import pako from 'pako';
export default {
	components: {
		NConfigProvider, NLayout, NLayoutHeader,NLayoutContent
	},
	data() {
		return {
			currentTheme: lightTheme,
			darkTheme,
			lightTheme
		}
	},
	computed: { ...mapState(['ws','wsReadyState','timeDiff', 'uid']) },
	methods: { ...mapActions(['WEBSOCKET_SEND_MESSAGE','WEBSOCKET_CHANGE_READYSTATE']),
	toggleTheme() {
		this.currentTheme = (this.currentTheme === this.darkTheme) ? this.lightTheme : this.darkTheme;	
	},
},
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
