<template>
	<div>
		<br><br>
		<Auth />
		<br><br>
		<EchoTest />
	</div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue';
import EchoTest from '@/components/EchoTest.vue';



export default {
	name: 'HomeView',
	components: {
		Auth,
		EchoTest
	}
};
</script>
