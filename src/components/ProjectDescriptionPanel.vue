<template>
  <div class="card">
    <Card class="project-card">
      <template #title>
        <div
          class="flex flex-row align-content-center align-items-center justify-content-start mt-3"
        >
          Project Overview
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Select a project"
            class="w-full md:w-20rem ml-4"
          />
        </div>
        <Divider class="p-divider p-divider-horizontal divider-position" />
      </template>
      <template #content>
        <div class="grid">
          <Card class="project-info-card col-6 border-3 p-0" style="border-color: #4b8bf2">
            <template #title>
              <div v-if="selectedProject.name">
                {{ selectedProject.name }}
                <Chip class="pl-0 pr-3">
                  <span
                    class="bg-primary font-bold border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                    >ID</span
                  >
                  <span class="ml-2 font-medium">{{ selectedProject.id }}</span>
                </Chip>
              </div>
              <div v-else> Project </div>
            </template>
            <template #subtitle>{{ selectedProject.description }}</template>
            <template #content>
              <div class="grid">
                <div class="col-6">
                  <KeyFactsCard :project="selectedProject"></KeyFactsCard>
                </div>
                <div class="col-6">
                  <AssigneeCard :project="selectedProject"></AssigneeCard>
                </div>
                <div class="col-6">
                  <IssuesCard :project="selectedProject"></IssuesCard>
                </div>
                <div class="col-6">
                  <StateRestingTimeCard :project="selectedProject"></StateRestingTimeCard>
                </div>
              </div>
            </template>
          </Card>
          <BarDiagram :project="selectedProject"></BarDiagram>
          <Card class="issues-card col-12 border-3 p-0" style="border-color: #4b8bf2">
            <template #title>
              <p>Issues</p>
            </template>
            <template #content>
              <DataTable
                v-model:filters="filters"
                :globalFilterFields="['name']"
                paginator
                :rows="5"
                filterDisplay="menu"
                :rowsPerPageOptions="[10, 20, 50, 100]"
                :value="selectedProject ? selectedProject.issues : []"
                showGridlines
                stripedRows
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
            </template>
          </Card>
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
import AssigneeCard from '@/components/AssigneeCard.vue';
import BarDiagram from '@/components/BarDiagram.vue';
import { getProject } from '@/assets/__mockdata__/mockdata';
import StateRestingTimeCard from './StateRestingTimeCard.vue';
import IssuesCard from './IssuesCard.vue';

// Create a reference for the selectedProject with initial data
const selectedProject = ref(getProject(11) as ProjectIF);

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
  () => getIssueStateList(selectedProject.value.issues) ?? ['planning', 'development', 'testing']
);
// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = ref(projectStore().getProjects);
</script>

<style scoped>
:deep(.col-6) {
  padding: 0;
}
.p-card {
  margin: 15px 15px 0 15px;
  box-shadow: none;
}
:deep(.project-card > .p-card-body) {
  padding-bottom: 0;
}
:deep(.project-card > .p-card-body > .p-card-content) {
  padding: 0;
}
:deep(.project-info-card > .p-card-body) {
  padding: 0;
}
:deep(.visualisation-card > .p-card-body) {
  padding: 0;
}
:deep(.issues-card .p-card-body) {
  padding-top: 0;
}
:deep(.issues-card .p-card-content) {
  padding-top: 0;
}
:deep(.assignee-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
:deep(.state-resting-time-card > .p-card-body) {
  padding-right: 0;
  padding-bottom: 0;
}
.divider-position {
  width: 100%;
}
</style>
