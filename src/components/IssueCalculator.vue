<template>
  <Panel>
    <template #icons>
      <Dropdown
        v-model="selectedProject"
        :options="projects"
        class="w-full md:w-14rem"
        optionLabel="name"
        placeholder="Select a project"
      />
    </template>
    <template #default>
      <div class="flex flex-row flex-wrap card-container justify-content-center">
        <div class="flex-wrap flex align-items-center justify-content-center">
          <CircularProgressBar
            :max="getIssueCountMax(selectedProject.issues)"
            :value="countIssuesByStatus(selectedProject.issues, 'Open')"
            class="flex align-items-center justify-content-center m-2"
            percentage
            rounded
            title="Open issues"
          />
          <CircularProgressBar
            :max="getIssueCountMax(selectedProject.issues)"
            :value="countIssuesByStatus(selectedProject.issues, 'Closed')"
            class="flex align-items-center justify-content-center m-2"
            percentage
            rounded
            title="Closed issues"
          />
          <CircularProgressBar
            :max="getIssueCountMax(selectedProject.issues)"
            :value="countIssuesByStatus(selectedProject.issues, 'InProgress')"
            class="flex align-items-center justify-content-center m-2"
            percentage
            rounded
            title="In Progress"
          />
        </div>
        <div class="flex-grow-1 flex align-items-center justify-content-center"></div>
      </div>
    </template>
  </Panel>
  <Card>
    <template #content>
      <DataTable
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        :value="selectedProject.issues"
        paginator
        showGridlines
      >
        <Column field="id" header="Issue-ID"></Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            {{ slotProps.data.status?.toString() }}
          </template>
        </Column>
        <Column field="dueTo" header="Due date"></Column>
        <Column header="Time left (Days)">
          <template #body="slotProps">
            {{ getTimeLeft(slotProps.data) }}
          </template>
        </Column>
        <Column header="Laying time">
          <template #body="slotProps">
            {{ printLayingTime(slotProps.data) }}
          </template>
        </Column>
        <Column field="assignedTo" header="Assigned to">
          <template #body="slotProps">
            {{ printAssignedTo(slotProps.data.assignedTo) }}
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import CircularProgressBar from '@/components/IssueCalculator/CircularProgressBar.vue';

import { countIssuesByStatus, Issue, getTimeLeft } from '@/model/Issue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import useProjectsStore from '@/store/projectStore';
import type { ProjectIF } from '@/model/ProjectIF';

// Create a reference for the selectedProject with initial data

const selectedProject: Ref<ProjectIF> = ref({
  id: '0',
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
  slaSubscriber: null,
} as ProjectIF);

// Create a reference for the projects array with mock data
const projectStore = useProjectsStore();

const projects: Ref<ProjectIF[]> = ref(projectStore.getProjects);

/**
 * Returns the maximum issue count from the given array of issues.
 * If the issues array is empty, the function returns 100.
 * @param issues An array of issues
 * @returns The maximum issue count
 */
function getIssueCountMax(issues: Issue[]): number {
  if (issues.length === 0) {
    return 100;
  }
  return issues.length;
}

/**
 * Returns the full name of the assigned employee.
 * If the employee is null, it returns an empty string.
 * @param employee An instance of EmployeeIF or null
 * @returns The formatted full name of the employee
 */
function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}

/**
 * if time since last status change is null, return 0
 * @param issue an instance of an IssueIF
 * @return returns laying time in hours or if more than 24 hours returns in days
 */
function printLayingTime(issue: IssueIF): string {
  if (issue.lastStatusChange == null) {
    return '0';
  }
  const currentTime: Date = new Date();
  const difference: number = currentTime.valueOf() - issue.lastStatusChange.valueOf();
  if (difference >= 86400000) {
    return `${(difference / 86400000).toFixed(0).toString()}d`; // returns time in days (86400000 ms = 1 day)
  }
  return `${(difference / 3600000).toFixed(0).toString()}h`; // returns the time in hours (3600000 ms = 1 hour)
}
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
