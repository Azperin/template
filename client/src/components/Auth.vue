<template>
	<div>
		<div v-if="isLoggedIn">
			<button @click="logout">LOGOUT</button>
		</div>

		<div v-if="!isLoggedIn">
			<br>EMAIL CORRECT = {{ isEmailCorrect }}
			<br>PIN CORRECT = {{ isPincodeCorrect }}
			<br>LOGIN DATA CORRECT = {{ isLogingDataCorrect }}
			<br>
			<input type="text" placeholder="email" v-model="inputEmail"/>
			<button @click="requestPincode" :disabled="!isEmailCorrect || isRequestingPincode">REQUEST PINCODE</button>
			<div>Only alphabet symbols and numbers. Cannot use dots, plus sign and other symbols in email address.</div>
			<br><br>
			<input type="text" placeholder="6-digit pincode" v-model="inputPin"/>
			
			<br><br>
			<button :disabled="!isLogingDataCorrect" @click="loginWithEmail">Login with Email</button>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.state.uid);
const isRequestingPincode = ref(false);
const inputEmail = ref('');
const inputPin = ref('');

const isEmailCorrect = computed(() => {
	return /^[a-zA-Z0-9]{1,30}@[a-zA-Z0-9]{1,30}[.]{1}[a-zA-Z]{1,10}$/.test(inputEmail.value);
});

const isPincodeCorrect = computed(() => {
	return /^[0-9]{6}$/.test(inputPin.value);
});

const isLogingDataCorrect = computed(() => {
	return isEmailCorrect.value && isPincodeCorrect.value;
});

const requestPincode = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'requestEmailPincode', email: inputEmail.value });

	// disable send request button for 10 seconds
	isRequestingPincode.value = true;
	setTimeout(() => isRequestingPincode.value = false, 10000);
};

const loginWithEmail = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'emailAuth', email: inputEmail.value, pin: inputPin.value });
	inputPin.value = '';
};

const logout = () => {
	store.dispatch('WEBSOCKET_SEND_MESSAGE', { a: 'logout' });
};

</script>

<style scoped></style>
