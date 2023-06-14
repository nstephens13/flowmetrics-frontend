<template>
  <div class="card">
    <Card>
      <template #title> Project Overview </template>
      <template #content>
        <div>
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-14rem"
          />
        </div>
        <h4>Name: {{ selectedProject.name }}</h4>
        <h4>Project-ID: {{ selectedProject.id }}</h4>
        <h4>Description: {{ selectedProject.description }}</h4>
        <h4>Total issues : {{ selectedProject.issues.length }}</h4>
      </template>
    </Card>
  </div>
  <div class="card">
    <Card>
      <template #title> Tickets Overview </template>
      <template #content>
        <div class="card">
        <DataTable :value="selectedProjectIssues" showGridlines>
            <Column field="id" header="Ticket-ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
<!--            <Column field="assignedTo" header="Assigned To"></Column>-->
<!--            <Column field="createdBy" header="Created by"></Column>-->
            <Column field="createdAt" header="Created on"></Column>
            <Column field="closedAt" header="Closed on"></Column>
            <Column field="dueTo" header="Due on"></Column>
            <Column field="status" header="Status"></Column>
        </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';

import getMockData from '../assets/__mockdata__/mockDataComposer';
import type { IssueIF } from '@/model/IssueIF';

export default defineComponent({
  name: 'ProjectDescriptionPanel',
  data() {
    return {
      selectedProject: {
        id: 0,
        name: '',
        description: '',
        milestones: [],
        issues: [],
      } as ProjectIF,
      projects: [
        getMockData(1),
        getMockData(2),
        getMockData(3),
        getMockData(53),
        getMockData(54),
        getMockData(55),
      ] as ProjectIF[],
    };
  },
  computed: {
    selectedProjectIssues(): IssueIF[] {
      return this.selectedProject.issues;
    },
  },
});
</script>
