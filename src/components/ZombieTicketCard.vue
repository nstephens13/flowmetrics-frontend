<template>
  <div class="flex-container">
    <div class="flex-double">
      <Card class="mr-2 ml-2 flex-grow-1 min-width-0">
        <template #title>Issues</template>
        <template #content>
          <DataTable
            v-model:filters="filters"
            :globalFilterFields="['name']"
            paginator
            :rows="5"
            filterDisplay="menu"
            :rowsPerPageOptions="[10, 20, 50, 100]"
            showGridlines
            stripedRows
            :value="
              filterIssuesMinimumStatusChangesAndRestingTime(props.project?.issues, filterConfig)
            "
          >
            <template #empty> No issues found.</template>
            <template #loading> Loading issues. Please wait.</template>
            <Column field="id" header="Issue-ID"></Column>
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
              :value="selectedProject ? selectedProject.issues : []"
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
            <Column
              header="State"
              filterField="state"
              :value="selectedProject ? selectedProject.issues : []"
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
            <Column field="statusChanges" header="Status changes">
              <template #body="slotProps">
                {{ calculateStatusChanges(slotProps.data) }}
              </template>
            </Column>
            <Column field="restingTimeStatus" header="Resting time status (Days)">
              <template #body="slotProps">
                {{ printRestingDays(slotProps.data) }}
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
    <div class="flex-item">
      <Card class="mr-2 w-23rem border-3 border-round border-red-700">
        <template #title>
          <div class="flex flex-column align-items-center">Filter Zombie Issues</div>
        </template>
        <template #content>
          <div class="flex flex-column align-items-start gap-2">
            <div>Minimal resting time in current status (Days)</div>
            <InputNumber v-model="minimalRestingTime" @keyup.enter="applyOnEnter"></InputNumber>
            <div>Minimal number of status changes</div>
            <InputNumber v-model="minimalStatusChanges" @keyup.enter="applyOnEnter"></InputNumber>
          </div>
          <div class="flex align-items-center justify-content-evenly mt-4">
            <Button
              label="Clear"
              @click="clearFilters"
              class="mr-2"
              style="background-color: var(--flowMetricsBlue)"
            >
            </Button>
            <Button
              label="Apply"
              @click="applyFilters"
              class="ml-2"
              style="background-color: var(--flowMetricsBlue)"
            >
            </Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';
import { Duration } from 'luxon';
import { calculateStatusChanges } from '@/services/issueCalculator';
import { filterIssuesMinimumStatusChangesAndRestingTime } from '@/services/filter/ProjectsFilter';
import {
  printRestingDays,
  calculateStatusChanges,
  printAssignedTo,
} from '@/services/issueCalculator';
import type { FilterConfigIF, ProjectFilterConfigIF } from '@/model/FilterConfigIF';
import { getIssueStatusList, getIssueStateList, type ProjectIF } from '@/model/ProjectIF';
import { getProject } from '@/assets/__mockdata__/mockdata';

const props = defineProps({
  project: {
    type: Object as () => ProjectIF,
    required: true,
    default: () => ({} as ProjectIF),
  },
});

const minimalRestingTime = ref(0);
const minimalStatusChanges = ref(0);
const filterConfig = ref({
  id: 0,
  projectFilter: {
    projectsWhiteList: [],
    issueStatusIncludeFilter: [],
    minimumAssigneeRestingTime: 0,
    minimumNumberOfStatusChanges: 0,
    minimumStatusRestingTime: 0,
    issueStateIncludeFilter: [],
  } as ProjectFilterConfigIF,
} as FilterConfigIF);

const applyFilters = () => {
  filterConfig.value.projectFilter.minimumStatusRestingTime = minimalRestingTime.value;
  filterConfig.value.projectFilter.minimumNumberOfStatusChanges = minimalStatusChanges.value;
};

const clearFilters = () => {
  filterConfig.value.projectFilter.minimumStatusRestingTime = 0;
  filterConfig.value.projectFilter.minimumNumberOfStatusChanges = 0;
  minimalRestingTime.value = 0;
  minimalStatusChanges.value = 0;
};

// Create a reference for the selectedProject with initial data
const selectedProject = ref(getProject(11) as ProjectIF);

// Create a reference for the filters object with initial configuration
const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
  state: { value: null, matchMode: FilterMatchMode.IN },
});

// Create a reference for the statuses array
const statuses = computed(() => getIssueStatusList(selectedProject.value.issues));

// get computed states
const states = computed(
  () => getIssueStateList(selectedProject.value.issues) ?? ['planning', 'development', 'testing']
);
const applyOnEnter = () => {
  applyFilters();
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  margin: 30px 30px 0 0px;
}

.flex-item {
  flex: 1;
  min-width: 0;
  margin: 15px 15px 0 15px;
}
.flex-double {
  flex: 4;
  width: 100%;
  margin: 15px 15px 0 15px;
}

.flex-container {
  box-shadow: none;
}
</style>
