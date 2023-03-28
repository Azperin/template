<template>
	<div>
	<div>
		<input type="text" :value="msg"/><br>
		<button @click="WEBSOCKET_SEND_MESSAGE({ a:'requestEmailPincode', email:'somemail@gmail.com' })">SEND EMAIL REQUEST</button>
	</div>

	<div>
		<input type="text" value="0"/><br>
		<button @click="WEBSOCKET_SEND_MESSAGE({ a:'emailAuth', email:'somemail@gmail.com', pin: '567123' })">SEND</button>
	</div>
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
