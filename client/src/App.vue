<template>
	<div class="wrapper">
		<h3>Websocket Ready State: {{ wsReadyState }}</h3>
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav>
		
		<router-view></router-view>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	computed: { ...mapState(['ws','wsReadyState']) },
	methods: { ...mapActions(['WEBSOCKET_SEND_MESSAGE','WEBSOCKET_CHANGE_READYSTATE'])},
	mounted() {
		this.ws.onopen = this.WEBSOCKET_CHANGE_READYSTATE;
		this.ws.onclose = this.WEBSOCKET_CHANGE_READYSTATE;
		this.ws.onerror = this.WEBSOCKET_CHANGE_READYSTATE;
		this.ws.onmessage = (msg) => {
			if (!msg.isTrusted) return;
			console.log(msg.data);
		};
	},
}
</script>

<style></style>
