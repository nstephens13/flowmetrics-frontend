<template>
	<div class="container-center-horizontal">
	  <div class="desktop-1 screen">
		<div class="overlap-group6">
		  <v-toolbar-content
  			:vApp__Title="vToolbarContentProps.vApp__Title"
  			:vBtn1Props="vToolbarContentProps.vBtn1Props"
  			:vBtn2Props="vToolbarContentProps.vBtn2Props"
		  />
		</div>
		<v-breadcrumbs
        :vBreadcrumbs__Item="vBreadcrumbsProps.vBreadcrumbs__Item"
        :text1="vBreadcrumbsProps.text1"
        />
		<!-- <img class="rectangle" src="@/assets/rectangle-3.svg" alt="Rectangle 3" /> -->
		<!-- <div class="overlap-groupe5"> -->
		  <!-- <v-chip :span="vChipProps.span" /> -->
		  <!-- <component10
			:ringOpenProps="component10Props.ringOpenProps"
			:ringImProgressProps="component10Props.ringImProgresProps"
			:ringClosedProps="component10Props.ringClosedProps"
		  /> -->
		  <ring-open
		  	:span="ringOpenProps.span"
			:name="ringOpenProps.name"
			:className="ringOpenProps.className"
		  />
		  <ring-im-progress
		  	:span="ringImProgressProps.span"
			:name="ringImProgressProps.name"
			:className="ringImProgressProps.className"
		  />
		  <ring-closed
			:span="ringClosedProps.span"
			:name="ringClosedProps.name"
			:className="ringClosedProps.className"
		  />
		  <ring-total
			:span="ringTotalProps.span"
			:name="ringTotalProps.name"
			:className="ringTotalProps.className"
		  />
		  <v-table v-bind="vTableProps" />

	  </div>
	</div>
  </template>

<script>
import VToolbarContent from './VtoolbarContent.vue';
import VBreadcrumbs from './VBreadcrumbs.vue';
import VChip from './Vchip.vue';
import RingClosed from './RingClosed.vue';
import RingOpen from './RingOpen.vue';
import RingImProgress from './RingImProgress.vue';
import RingTotal from './RingTotal.vue';
import VTable from './VTable.vue';

export default {
  name: 'Desktop1',
  components: {
	  VToolbarContent,
	  VBreadcrumbs,
	  VChip,
    //   Container,
	  RingClosed,
	  RingOpen,
	  RingImProgress,
	  RingTotal,
	  VTable,

  },
  props: {
	 vBreadcrumbsProps: {
      type: Object,
      required: true,
	  },
	  vToolbarContentProps: {
      type: Object,
      required: true,
	  },
	  vChipProps: {
      type: Object,
      required: true,
	  },
	  ringClosedProps: {
      type: Object,
      required: true,
	  },
	  ringOpenProps: {
      type: Object,
      required: true,
	  },
	  ringImProgressProps: {
      type: Object,
      required: true,
	  },
	  ringTotalProps: {
      type: Object,
      required: true,
	  },
	  vTableProps: {
      type: Object,
      required: true,
	  },

  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.desktop-1 {
  align-items: flex-start;
  background-color: #e7e7e7;
  border: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}

.v-breadcrumbs-container {
	height: 56px;
	margin-left: 84px;
	margin-top: 39px;
	position: relative;
	width: 738px;
}

.v-breadcrumbs__item {
  color: rgba(0, 0, 0, 0.6);
  font-family: var(--font-family-roboto);
  font-size: var(--font-size-l);
  font-weight: 400;
  height: 20px;
  left: 179px;
  letter-spacing: 0.25px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 17px;
  white-space: nowrap;
}

</style>
