<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        <p>Project Overview</p>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <div class="flex flex-row justify-content-between">
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full h-3rem md:w-14rem"
          />
          <KeyFactsCard :project="selectedProject"></KeyFactsCard>
        </div>
      </template>
    </Card>
  </div>
  <div class="card">
    <Card>
      <template #title>
        <p>Issues</p>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <div class="card">
          <DataTable
            v-model:filters="filters"
            :globalFilterFields="['name']"
            paginator
            :rows="10"
            filterDisplay="menu"
            :rowsPerPageOptions="[10, 20, 50, 100]"
            :value="selectedProject ? selectedProject.issues : []"
            showGridlines
          >
            <Column field="id" header="Issue-ID"></Column>
            <template #empty> No issues found.</template>
            <template #loading> Loading issues. Please wait.</template>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="assignedTo" header="Assigned to">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
              </template>
            </Column>
            <Column field="createdBy" header="Created by">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.createdBy) }}
              </template>
            </Column>
            <Column field="createdAt" header="Created on"></Column>
            <Column field="closedAt" header="Closed on"></Column>
            <Column field="dueTo" header="Due on"></Column>
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
            <Column header="Remaining Reaction Time">
              <template #body="slotProps">
                {{ calculateRemainingTime(slotProps.data) }}
              </template>
            </Column>
            <Column header="Status changes" style="width: 150px">
              <template #body="slotProps">
                {{ calculateStatusChanges(slotProps.data) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import type { EmployeeIF } from '@/model/EmployeeIF';
import { getIssueStatusList, type ProjectIF } from '@/model/ProjectIF';
import { calculateRemainingReactionTime, calculateStatusChanges } from '@/services/issueCalculator';
import type { IssueIF } from '@/model/Issue/IssueIF';
import projectStore from '@/store/projectStore';
import KeyFactsCard from '@/components/KeyFactsCard.vue';

// Create a reference for the selectedProject with initial data
const selectedProject = ref({
  id: 0,
  name: '',
  description: '',
  issues: [],
  slaSubscriber: null,
});

// Create a reference for the filters object with initial configuration
const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
});

// Function to print the assigned employee's full name
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

// Create a reference for the statuses array
const statuses = computed(() => getIssueStatusList(selectedProject.value.issues));

// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = ref(projectStore().getProjects);
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}

.divider-position {
  width: 100%;
}
</style>
