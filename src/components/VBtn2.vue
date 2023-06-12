<template>
	<article class="v-btn-2"></article>
</template>

<script>
	export default {
		name: "VBtn2", 
		props: ["vIcon", "className"],
	};
</script>

<style>
	.v-btn-2 {
		align-items: center;
		border-radius: 32px;
		display: flex;
		height: 32px;
		justify-content: center;
		padding: 0px 16px;
		position: relative;
		width: 32px;
	}
</style>