<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        <div
          class="flex flex-row align-content-center align-items-center justify-content-between mt-3"
        >
          Project Overview
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-14rem"
          />
        </div>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <div class="flex flex-row justify-content-end">
          <card style="background-color: var(--flowMetricsBlue); color: #ffffffff; width: 400px">
            <template #title> Project Infos </template>
            <template #content>
              <div class="flex flex-row justify-center">
                <div class="flex flex-column mr-2">
                  <div>Project ID: </div>
                  <div>Description: </div>
                </div>
                <div class="flex flex-column">
                  <div class="font-bold">{{ selectedProject.id }}</div>
                  <div class="font-bold">{{ selectedProject.description }}</div>
                </div>
              </div>
            </template>
          </card>
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
            <Column field="assignedTo" header="Assigned to">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
              </template>
            </Column>
            <Column field="createdAt" header="Created on"></Column>
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
            <Column field="statusChanges" header="Status changes" style="width: 150px">
              <template #body="slotProps">
                {{ calculateStatusChanges(slotProps.data) }}
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
                  placeholder="Select State"
                  :maxSelectedLabels="3"
                  class="w-full md:w-10rem"
                />
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
import { getIssueStatusList, getIssueStateList, type ProjectIF } from '@/model/ProjectIF';
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
} as ProjectIF);

// Create a reference for the filters object with initial configuration
const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
  state: { value: null, matchMode: FilterMatchMode.IN },
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

// get computed states
const states = computed(
  () => getIssueStateList(selectedProject.value.issues) ?? ['Planning', 'Development', 'Testing']
);
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
