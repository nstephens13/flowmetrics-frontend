<template>
  <ProjectDescriptionPanel></ProjectDescriptionPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectDescriptionPanel from '@/components/ProjectDescriptionPanel.vue';

// Define the 'ProjectOverview' component
export default defineComponent({
  name: 'ProjectOverview',
  components: {
    ProjectDescriptionPanel,
  },
});
</script>
