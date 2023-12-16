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
    <DataTable
      v-model:filters="filters"
      :globalFilterFields="['name']"
      paginator
      :rows="10"
      filterDisplay="menu"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      :value="selectedProject.issues"
      showGridlines
    />
    <template #content>
      <DataTable
        v-model:filters="filters"
        :globalFilterFields="['name']"
        paginator
        :rows="10"
        filterDisplay="menu"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        :value="selectedProject.issues"
        showGridlines
      >
        <Column field="id" header="Issue ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="createdAt" header="Created on"></Column>
        <Column field="createdBy" header="Created by">
          <template #body="slotProps">
            {{ printAssignedTo(slotProps.data.assignedTo) }}
          </template>
        </Column>
        <Column field="assignedTo" header="Assigned to">
          <template #body="slotProps">
            {{ printAssignedTo(slotProps.data.assignedTo) }}
          </template>
        </Column>
        <Column header="Resting time (Assignee)">
          <template #body="slotProps">
            {{ printRestingTime(slotProps.data) }}
          </template>
        </Column>
        <Column
          header="State"
          filterField="state"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '7rem' }"
          style="min-width: 10rem"
          :show-apply-button="false"
        >
          <template #body="data">
            <div class="flex align-items-center gap-2">
              <span>{{ data.data.state }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-model="filterModel.value"
              display="chip"
              :options="states"
              @change="filterCallback()"
              placeholder="Select States"
              :maxSelectedLabels="3"
              class="w-full md:w-10rem"
            />
          </template>
        </Column>
        <Column header="Status changes" style="width: 150px">
          <template #body="data">
            <div v-for="statusChange in data.data.statusChanges" :key="statusChange.name">
              {{ statusChange.name }} : {{ statusChange.value }}
            </div>
          </template>
        </Column>
        <Column
          header="Status"
          filterField="status"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '7rem' }"
          style="min-width: 10rem"
          :show-apply-button="false"
        >
          <template #body="data">
            <div class="flex align-items-center gap-2">
              <span>{{ data.data.status }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-model="filterModel.value"
              display="chip"
              :options="statuses"
              @change="filterCallback()"
              placeholder="Select Status"
              :maxSelectedLabels="3"
              class="w-full md:w-10rem"
            />
          </template>
        </Column>
        <Column header="Resting time (Status)">
          <template #body="slotProps">
            {{ printRestingTime(slotProps.data) }}
          </template>
        </Column>
        <Column field="dueTo" header="Due date"></Column>
        <Column header="Remaining reaction time">
          <template #body="slotProps">
            {{ calculateRemainingTime(slotProps.data) }}
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import CircularProgressBar from '@/components/IssueCalculator/CircularProgressBar.vue';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import { getIssueStatusList, type ProjectIF } from '@/model/ProjectIF';
import { countIssuesByStatus, Issue } from '@/model/Issue/Issue';
import { calculateRemainingReactionTime } from '@/services/issueCalculator';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
</script>

<script lang="ts">
// Create a reference for the selectedProject with initial data

const selectedProject: Ref<ProjectIF> = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
  slaSubscriber: null,
} as ProjectIF);

// Create a reference for the statuses array
const statuses: Ref<string[]> = ref([]);

// Create a reference for the states array
const states: Ref<string[]> = ref(['planning', 'development', 'testing']);

// Create a reference for the projects array with mock data
// Watch for changes in the selectedProject and update the statuses array
watch(selectedProject, () => {
  statuses.value = getIssueStatusList(selectedProject.value.issues);
});

// Create a reference for the filters object with initial configuration
const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
});

// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = ref([
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(4),
  getMockData(5),
  getMockData(53),
  getMockData(54),
  getMockData(55),
] as ProjectIF[]);

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

function calculateRemainingTime(issue: IssueIF): string {
  const [hasSlaRule, remainingTimeInSeconds] = calculateRemainingReactionTime(issue);

  if (!hasSlaRule) {
    return ''; // Return an empty string if there's no SLA rule or the time has expired
  }
  if (hasSlaRule && remainingTimeInSeconds <= 0) {
    return 'Expired';
  }

  const remainingDays = Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
  const remainingHours = Math.floor((remainingTimeInSeconds % (60 * 60 * 24)) / (60 * 60));

  if (remainingDays > 1) {
    return `${remainingDays} days`;
  }
  return `${remainingHours} hours`;
}

/**
 * if time since last status change is null, return 0
 * @param issue an instance of an IssueIF
 * @return returns resting time in hours or if more than 24 hours returns in days
 */
function printRestingTime(issue: IssueIF): string {
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
