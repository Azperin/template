<template>
	<div>
		<AuthForm />
	</div>
</template>

<script>
// @ is an alias to /src
// import Example from '@/components/Example.vue';
import AuthForm from '@/components/AuthForm.vue';

export default {
	name: 'ProfileView',
	components: {
		AuthForm
	},
};
</script>