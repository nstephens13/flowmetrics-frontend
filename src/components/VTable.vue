<template>
	<div class="v-table">
		<div class="v-body">
			<frame
			:thTextStartProps="frame1Props.thTextStartProps"
			:tdTextStart1Props="frame1Props.tdTextStart1Props"
			:tdTextStart2Props="frame1Props.tdTextStart2Props"
			:tdTextStart3Props="frame1Props.tdTextStart3Props"
			:tdTextStart4Props="frame1Props.tdTextStart4Props"
			:tdTextStart5Props="frame1Props.tdTextStart5Props"
			/>
			<frame
			:thTextStartProps="frame2Props.thTextStartProps"
			:tdTextStart1Props="frame2Props.tdTextStart1Props"
			:tdTextStart2Props="frame2Props.tdTextStart2Props"
			:tdTextStart3Props="frame2Props.tdTextStart3Props"
			:tdTextStart4Props="frame2Props.tdTextStart4Props"
			:tdTextStart5Props="frame2Props.tdTextStart5Props"
			/>

			<frame
			:thTextStartProps="frame3Props.thTextStartProps"
			:tdTextStart1Props="frame3Props.tdTextStart1Props"
			:tdTextStart2Props="frame3Props.tdTextStart2Props"
			:tdTextStart3Props="frame3Props.tdTextStart3Props"
			:tdTextStart4Props="frame3Props.tdTextStart4Props"
			:tdTextStart5Props="frame3Props.tdTextStart5Props"
			/>
			<frame
			:thTextStartProps="frame4Props.thTextStartProps"
			:tdTextStart1Props="frame4Props.tdTextStart1Props"
			:tdTextStart2Props="frame4Props.tdTextStart2Props"
			:tdTextStart3Props="frame4Props.tdTextStart3Props"
			:tdTextStart4Props="frame4Props.tdTextStart4Props"
			:tdTextStart5Props="frame4Props.tdTextStart5Props"
			/>
			<frame
			:thTextStartProps="frame5Props.thTextStartProps"
			:tdTextStart1Props="frame5Props.tdTextStart1Props"
			:tdTextStart2Props="frame5Props.tdTextStart2Props"
			:tdTextStart3Props="frame5Props.tdTextStart3Props"
			:tdTextStart4Props="frame5Props.tdTextStart4Props"
			:tdTextStart5Props="frame5Props.tdTextStart5Props"
			/>
		</div>
		<v-data-footer />
	</div>
</template>

<script>
import Frame from './Frame.vue';


	export default {
		name: "VTable",
		components: {
			Frame,
		},
		props: [
			"frame1Props",
			"frame2Props",
			"frame3Props",
			"frame4Props",
			"frame5Props"
		],
	};
</script>

<style>
.v-table {
  align-items: center;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0px 8px 10px #00000033;
  display: flex;
  flex-direction: column;
  height: 412px; /* 20% smaller than original height */
  left: calc(50% - 150px); 
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  position: absolute;
  width: 950px; /* 20% smaller than original width */
}

.v-body {
	align-items: flex-start;
	align-self: stretch;
	background-color: var(--white);
	border-radius: 4px;
	display: flex;
	overflow: hidden;
	position: relative;
}

.frame {
	align-items: center;
	background-color: var(--white);
	display: flex;
	flex: 1;
	flex-direction: column;
	position: relative;
}
</style>			
	