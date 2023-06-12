<template>
	<div class="v-data-footer">
		<v-btn2 />
		<v-btn2 />
	</div>
</template>

<script>
import VBtn2 from './VBtn2.vue';
	export default {
		name: "VDataFooter",
		components: {
			VBtn2,
		},
	}
</script>

<style>
	.v-data-footer {
		align-items: center;
		align-self: strech;
		background-color: var(--white);
		display: flex;
		gap: 34px;
		height: 58px;
		justify-content: flex-end;
		padding: 0px 8px;
		position: relative;
	}
</style>