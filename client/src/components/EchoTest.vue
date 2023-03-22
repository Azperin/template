<template>
	<div>
		<input type="text" :value="msg"/><br>
		<button @click="WEBSOCKET_SEND_MESSAGE({ a:'exampleEcho', echo: msg })">SEND</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'EchoTest',
	data: () => {
		return {
			msg: 5,
		};
	},
	methods: { ...mapActions(['WEBSOCKET_SEND_MESSAGE'])},
	
}
</script>

<style scoped></style>
