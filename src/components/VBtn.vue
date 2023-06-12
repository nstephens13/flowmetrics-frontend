<template>
	<div :class="['v-btn', className || '']">
		<div class="v-icon valign-text-middle materialicons-normal-white-24px">{{ vIcon }}</div>
	</div>
</template>

<script>
	export default {
		name: "VBtn",
		props: ["vIcon", "className"],
	};
</script>


<style>
	.v-btn {
		align-items: center;
		border-radius: 40px;
		display: flex;
		height: 48px;
		justify-content: center;
		padding: 0px 16px;
		position: relative;
		width: 48px;
	}
	
	.v-icon {
		letter-spacing: 0;
		line-height: 24px;
		margin-left: -4px;
		margin-right: -4px;
		position: relative;
		text-align: center;
		white-space: nowrap;
		width: fit-content;
	}
	
	.v-btn.vbtn-1 {
		padding: unset;
	}

	.v-btn.vbtn-1 .v-icon{
		margin-left: unset;
		margin-right: unset;
	}
</style>

	


























