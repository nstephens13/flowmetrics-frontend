<template>
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
      <div class="flex flex-row flex-wrap card-container justify-content-center">
        <div class="flex-wrap flex align-items-center justify-content-center">
          <CircularProgressBar
            class="flex align-items-center justify-content-center m-2"
            :value="countIssuesByStatus(selectedProject.issues, 'Open')"
            :max="getIssueCountMax(selectedProject.issues)"
            percentage
            rounded
            title="Open issues"
          />
          <CircularProgressBar
            class="flex align-items-center justify-content-center m-2"
            :value="countIssuesByStatus(selectedProject.issues, 'Closed')"
            :max="getIssueCountMax(selectedProject.issues)"
            percentage
            rounded
            title="Closed issues"
          />
          <CircularProgressBar
            class="flex align-items-center justify-content-center m-2"
            :value="countIssuesByStatus(selectedProject.issues, 'InProgress')"
            :max="getIssueCountMax(selectedProject.issues)"
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
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        :value="selectedProject.issues"
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
        <Column header="Laying time (Days)">
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

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import CircularProgressBar from '@/components/IssueCalculator/CircularProgressBar.vue';
import type { ProjectIF } from '@/model/ProjectIF';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import { countIssuesByStatus, Issue, getTimeLeft } from '@/model/Issue';
import type { EmployeeIF } from '@/model/EmployeeIF';
</script>

<script lang="ts">
// Create a reference for the selectedProject with initial data
import type { IssueIF } from '@/model/IssueIF';

const selectedProject: Ref<ProjectIF> = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
  slaSubscriber: null,
} as ProjectIF);

// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = ref([getMockData(4), getMockData(5)] as ProjectIF[]);

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

function printLayingTime(issue: Issue): string {
  if (issue.lastStatusChange == null) {
    return '0';
  }
  const currentTime: Date = new Date();
  const difference: number = currentTime.valueOf() - issue.lastStatusChange.valueOf();
  return (difference.toString() / 86400000).toFixed(2).toString();
}

</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
