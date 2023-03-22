<template>
	<div>
		<HelloWorld />
		<EchoTest />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import EchoTest from '@/components/EchoTest.vue';

export default {
	name: 'HomeView',
	components: {
		HelloWorld,
		EchoTest
	}
};
</script>
