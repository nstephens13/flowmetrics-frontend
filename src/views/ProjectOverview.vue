<template>
    <ProjectDescriptionPanel 
        projectName="Project Name"
        openTickets = 5
        closedTickets= 10
        inProgressTickets= 16
        ></ProjectDescriptionPanel>
</template>
  
<script lang="ts">
    import ProjectDescriptionPanel from '../components/ProjectDescriptionPanel.vue';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ProjectOverview',
        components: {
            ProjectDescriptionPanel,
        },
    });
</script>
