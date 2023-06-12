<template>
	<div class="v-breadcrumbs">
		<div class="v-breadcrumbs__item-1 valign-text-middle">{{vBreadcrumbs__Item}}
		</div>
		<div class="divider">
			<div class="text-1 valign-text-middle">{{text1}}
			</div>
		</div>
	</div>
</template>
	
<script>
	export default {
		name: "VBreadcrumbs",
		props: ["vBreadcrumbs__Item", "text1"],
	};
</script>

<style>
	.v-breadcrumbs {
		align-items: center;
		display: flex;
		left: 130px;
		padding: 18px 12px 18 px 24px;
		position: absolute;
		top: 80px;
		width: 738px;
	}
	
	.v-breadcrumbs__item-1 {
		color: var(--navy-blue);
		font-family: var(--font-family-roboto);
		font-size: var(--font-size-1);
		letter-spacing: 0.25px;
		line-height: 20px;
		margin-top: -1px;
		position: relative;
		text-align: center;
		white-space: nowrap;
		width: fit-content;
	}
	
	.divider {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		padding: 0px 12px;
		position: relative;
		width: fit-content;
	}

	.text-1 {
		color: #9e9e9e;
		font-family: var(--font-family-roboto);
		font-size: 400;
		letter-spacing: 0.25px;
		line-height: 20px;
		margin-top: -1px;
		position: relative;
		text-align: center;
		white-space: nowrap;
		width: fit-content;
	}
</style>


		
	













