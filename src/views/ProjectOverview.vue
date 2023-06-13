<template>
  <ProjectDescriptionPanel
    projectName="Project Name"
    openTickets="5"
    closedTickets="10"
    inProgressTickets="16"
  ></ProjectDescriptionPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectDescriptionPanel from '../components/ProjectDescriptionPanel.vue';

export default defineComponent({
  name: 'ProjectOverview',
  components: {
    ProjectDescriptionPanel,
  },
});
</script>
