<template>
  <div class="card">
    <Card>
      <template #title>
        <h3> Project Overview</h3>
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
        <h4>Name: {{ selectedProject.name }}</h4>
        <h4>Project-ID: {{ selectedProject.id }}</h4>
        <h4>Description: {{ selectedProject.description }}</h4>
        <h4>total issues : {{ selectedProject.issues.length }}</h4>
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
