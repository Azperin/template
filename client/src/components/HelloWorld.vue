<template>
	

	 <n-grid x-gap="12" y-gap="12" cols="s:1 m:2 l:3 xl:5 2xl:4" item-responsive responsive="screen" class="raaa">
		<n-gi span="s:2 m:3 l:4 xl:5 2xl:6">
			a
		</n-gi>
		<n-gi >
			<n-switch size="small" />
			<n-switch size="medium" />
			<n-switch size="large"></n-switch>
		</n-gi>
		<n-gi>
			<n-button>naive-ui</n-button>
			<Icon size="52"><Money16Regular /></Icon>
		</n-gi>
		<n-gi>
			<h1>Hello World component text</h1>
		</n-gi>
	 </n-grid>
</template>

<script setup>
import { NButton, NSwitch, NGrid, NGi,  } from 'naive-ui';
import { Money16Regular } from '@vicons/fluent';
import { Icon } from '@vicons/utils';


</script>

<style scoped>
.raaa > div {
	height: 100px;
	background-color: rgba(111,2,2,.3);
}
</style>
