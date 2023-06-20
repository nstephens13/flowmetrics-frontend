<template>
  <div class="card" style="position: relative">
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
            <div class="flex flex-row flex-wrap card-container justify-content-left">
              <h4 class="m-2">Project-ID: {{ selectedProject.id }}</h4>
              <h4 class="m-2">Description: {{ selectedProject.description }}</h4>
              <h4 class="m-2">Total issues : {{ selectedProject.issues.length }}</h4>
            </div>
            <div class="card">
              <div class="flex flex-row flex-wrap card-container justify-content-center">
                <div class="flex-wrap flex align-items-center justify-content-center">
                  <CircularProgressBar
                    class="flex align-items-center justify-content-center m-2"
                    :value="countIssuesByStatus(selectedProject.issues, Status.Open)"
                    :max="getIssueCountMax(selectedProject.issues)"
                    percentage
                    rounded
                    title="Open Tickets"
                  />
                  <CircularProgressBar
                    class="flex align-items-center justify-content-center m-2"
                    :value="countIssuesByStatus(selectedProject.issues, Status.Closed)"
                    :max="getIssueCountMax(selectedProject.issues)"
                    percentage
                    rounded
                    title="Closed Tickets"
                  />
                  <CircularProgressBar
                    class="flex align-items-center justify-content-center m-2"
                    :value="countIssuesByStatus(selectedProject.issues, Status.InProgress)"
                    :max="getIssueCountMax(selectedProject.issues)"
                    percentage
                    rounded
                    title="In Progress"
                  />
                </div>
                <div class="flex-grow-1 flex align-items-center justify-content-center"></div>
              </div>
            </div>
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
          <DataTable :value="selectedProject.issues" showGridlines>
            <Column field="id" header="Ticket-ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="assignedTo" header="Assigned To">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
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

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import CircularProgressBar from '@/components/TickerCalculator/CircularProgressBar.vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ProjectIF } from '@/model/ProjectIF';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import { countIssuesByStatus, Issue } from '@/model/Issue';
import { Status } from '@/model/IssueIF';

function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}

defineExpose({ printAssignedTo });

const selectedProject = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
} as ProjectIF);

const projects: Ref<ProjectIF[]> = ref([
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(53),
  getMockData(54),
  getMockData(55),
] as ProjectIF[]);

function getIssueCountMax(issues: Issue[]): number {
  if (issues.length === 0) {
    return 100;
  }
  return issues.length;
}
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
