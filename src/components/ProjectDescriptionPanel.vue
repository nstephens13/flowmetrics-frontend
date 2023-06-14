<template>
  <div class="card" style="position: relative;">
    <Card>
      <template #title>
        Project Overview
        <Divider></Divider>
      </template>
      <template #content>
        <Panel>
          <template #icons>
            <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-14rem"
            />
          </template>
          <template #default>
            Project-ID: {{ selectedProject.id }}<br>
            Description: {{ selectedProject.description }}<br>
            Total issues : {{ selectedProject.issues.length }}<br>
          </template>
        </Panel>
      </template>
    </Card>
  </div>
  <div class="card">
    <Card>
      <template #title>
        Tickets
        <Divider></Divider>
      </template>
      <template #content>
        <div class="card">
          <DataTable :value="selectedProjectIssues" showGridlines>
            <Column field="id" header="Ticket-ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="assignedTo" header="Assigned To">
              <template #body="slotProps">
                {{
                  slotProps.data.assignedTo.firstName +
                  ' ' +
                  slotProps.data.assignedTo.lastName
                }}
              </template>
            </Column>
            <Column field="createdBy" header="Created by"></Column>
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
        name: 'Project_Name',
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
<style scoped>
.p-card{
  margin: 15px;
  box-shadow: none;
}
</style>