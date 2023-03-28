<template>
	<div>
		<div v-if="isLoggedIn">
			<button @click="logout">LOGOUT</button>
		</div>

		<div v-if="!isLoggedIn">
			<input type="text" placeholder="email" v-model="inputEmail"/><br>
			<button @click="requestPincode">REQUEST PINCODE</button>
			<br>
			<input type="text" placeholder="pincode" v-model="inputPin"/><br>
			<br>
			<button @click="loginWithEmail">LOGIN</button>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => !!store.state.uid);
const inputEmail = ref('');
const inputPin = ref('');

const requestPincode = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'requestEmailPincode', email: inputEmail.value });
};

const loginWithEmail = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'emailAuth', email: inputEmail.value, pin: inputPin.value });
};

const logout = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'logout' });
};

</script>

<style scoped></style>
