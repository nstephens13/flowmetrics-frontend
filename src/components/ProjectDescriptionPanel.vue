<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="card flex justify-content-center">
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-14rem"
          />
        </div>
      </template>
      <template #content>
        <h4>ID: {{ selectedProject.id }}</h4>
        <h4>description: {{ selectedProject.description }}</h4>
        <h4>total issues : {{ selectedProject.issues.length }}</h4>
      </template>
      <template #footer>
        <Button label="Jira"></Button>
        <Button label="Confluence" severity="secondary" style="margin-left: 0.5em"></Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ProjectIF } from '../model/ProjectIF';
import getMockData from '../assets/__mockdata__/mockDataComposer';

const emptyProject: ProjectIF = {
  id: 0,
  name: '',
  description: '',
  milestones: [],
  issues: [],
};

const selectedProject = ref(emptyProject);
const projects = ref([
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(53),
  getMockData(54),
  getMockData(55),
]);

defineProps<{
  projectName: string
  openTickets: string
  closedTickets: string
  inProgressTickets: string
}>();
</script>
