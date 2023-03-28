<template>
	<div>
		<div v-if="uid">
			<button @click="WEBSOCKET_SEND_MESSAGE({ a:'logout' })">LOGOUT</button>
		</div>

		<div v-if="!uid">
			<input type="text" placeholder="email" v-model="inputEmail"/><br>
			<button @click="requestPincode">REQUEST PINCODE</button>
			<br>
			<input type="text" placeholder="pincode" v-model="inputPin"/><br>
			<br>
			<button @click="loginWithEmail">LOGIN</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Auth',
	data: () => {
		return {
			inputEmail: '',
			inputPin: '',
		};
	},
	computed: { ...mapState(['uid']) },
	methods: { 
		...mapActions(['WEBSOCKET_SEND_MESSAGE']),
		requestPincode() {
			this.WEBSOCKET_SEND_MESSAGE({ a:'requestEmailPincode', email: this.inputEmail })
		},
		loginWithEmail() {
			this.WEBSOCKET_SEND_MESSAGE({ a:'emailAuth', email: this.inputEmail, pin: this.inputPin })
		},

	},
	
}
</script>

<style scoped></style>
