<template>
	<div class="v-toolbar__content">
	  <!-- <v-btn :vIcon="vBtn1Props.vIcon"/> -->
	  <div class="v-app__title vlign-text-middle">{{ vApp__Title }}</div>
	 	 <!-- <v-btn-2 :vIcon="vBtn2Props.vIcon" :className="vBtn2Props.className" /> -->
	</div>
  </template>
  

<script>
import VBtn from './VBtn.vue';

export default {
  name: "VtoolbarContent",
  components: {
    VBtn,
  },
  props: ["vApp__Title", "vBtn1Props", "vBtn2Props"],
};
</script>


<style>
	.v-toolbar__content {
		align-items: center;
		background-color: var(--navy-blue);
		display: flex;
		height: 50px;
		left: 0;
		padding: 4px 16px;
		position: absolute;
		top: 0;
		width: 100vw; /* Changed width to 100vw */
	}

	.v-app__title {
		color: var(--white);
		font-family: var(--font-family-roboto);
		font-size: var(--font-family-xxl);
		letter-spacing: 0.25px;
		line-height: 32px;
		position: relative;
		white-space: nowrap;
	}
</style>

	
	