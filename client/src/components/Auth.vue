<template>
	<div>
		<div v-if="uid">
			<button @click="logout">LOGOUT</button>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'Auth',
	setup() {
		const store = useStore();
		const uid = computed(() => store.state.uid);
		const inputEmail = ref('');
		const inputPin = ref('');

		const WEBSOCKET_SEND_MESSAGE = (payload) => {
			store.dispatch('WEBSOCKET_SEND_MESSAGE', payload);
		};
		
		const requestPincode = () => {
			store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'requestEmailPincode', email: inputEmail.value });
		};

		const loginWithEmail = () => {
			store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'emailAuth', email: inputEmail.value, pin: inputPin.value });
		};

		const logout = () => {
			store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'logout' });
		};
		
		return {
			uid,
			inputEmail,
			inputPin,
			requestPincode,
			loginWithEmail,
			logout,
			WEBSOCKET_SEND_MESSAGE
		};
	}
}

// import { mapState, mapActions } from 'vuex';
// export default {
// 	name: 'Auth',
// 	data: () => {
// 		return {
// 			inputEmail: '',
// 			inputPin: '',
// 		};
// 	},
// 	computed: { ...mapState(['uid']) },
// 	methods: { 
// 		...mapActions(['WEBSOCKET_SEND_MESSAGE']),
// 		requestPincode() {
// 			this.WEBSOCKET_SEND_MESSAGE({ a:'requestEmailPincode', email: this.inputEmail })
// 		},
// 		loginWithEmail() {
// 			this.WEBSOCKET_SEND_MESSAGE({ a:'emailAuth', email: this.inputEmail, pin: this.inputPin })
// 		},

// 	},
	
// }
// </script>

<style scoped></style>
