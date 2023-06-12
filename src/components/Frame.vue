	<template>
		<div class="frame-1">
			<th-text-start :span="thTextStartProps.span" />
			<td-text-start 
			:frozenYogurt="tdTextStart1Props.frozenYogurt"
			:className="tdTextStart1Props.className"
      />
			<td-text-start 
			:frozenYogurt="tdTextStart2Props.frozenYogurt"
			:className="tdTextStart2Props.className"
      />
			<td-text-start 
			:frozenYogurt="tdTextStart3Props.frozenYogurt"
			:className="tdTextStart3Props.className"
      />
			<td-text-start 
			:frozenYogurt="tdTextStart4Props.frozenYogurt"
			:className="tdTextStart4Props.className"
      />
			<td-text-start 
			:frozenYogurt="tdTextStart5Props.frozenYogurt"
			:className="tdTextStart5Props.className"
      />
		</div>
	</template>

	<script>
	import ThTextStart from './ThTextStart.vue';
	import TdTextStart from './TdTextStart.vue';
		export default {
			name: "Frame",
			components: {
				ThTextStart,
				TdTextStart,
			},
			props: ["thTextStartProps", "tdTextStart1Props", "tdTextStart2Props", "tdTextStart3Props", "tdTextStart4Props", "tdTextStart5Props"],
		};
</script>

<style>
	.frame-1 {
		align-items: center;
		background-color: var(--white);
		display: flex;
		flex: 1;
		flex-direction: column;
		position: relative;
	}
</style>
