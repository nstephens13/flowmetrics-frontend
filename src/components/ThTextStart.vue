<template>
	<div class="th-text-start">
		<div class="span-4 valign-text-midde roboto-bold-sonic-silver-12px">{{ span }}
		</div>
	</div>
</template>

<script>
	export default {
		name: "ThTextStart",
		props: ["span"],
	};
</script>

<style>
		.th-text-start {
		align-items: center;
		align-self: stretch;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.06);
		display: flex;
		gap: 10px;
		height: 48px;
		padding: 10px 16px;
		position: relative;
	}


	.span-4 {
  align-self: stretch;
  flex: 1;
  letter-spacing: 0.4px;
  line-height: -50px;
  margin-top: 10px;
  margin-left: 0px; /* Add this line to move the element 20px to the left */
  position: relative;
}
</style>