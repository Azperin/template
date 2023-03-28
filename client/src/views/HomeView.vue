<template>
	<div>
		<br><br>
		<Auth />
		<br><br>
	</div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue';

export default {
	name: 'HomeView',
	components: {
		Auth
	},
};
</script>
