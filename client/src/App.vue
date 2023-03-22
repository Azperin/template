<template>
	<div class="wrapper">
		<nav>
			State: {{ wsReadyState }}
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
