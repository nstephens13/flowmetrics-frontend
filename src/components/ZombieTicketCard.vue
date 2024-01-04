<template>
  <div class="flex flex-row mr-4 ml-4">
    <Card class="mr-2 ml-2 flex-grow-1 border-3 border-round border-red-500">
      <template #title>Zombie Tickets</template>
      <template #content>
        <DataTable
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="
            filterIssuesMinimumStatusChangesAndRestingTime(props.project?.issues, filterConfig)
          "
          showGridlines
        >
          <template #empty> No issues found.</template>
          <template #loading> Loading issues. Please wait.</template>
          <Column field="id" header="Issue ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="assignedTo" header="Assigned to">
            <template #body="slotProps">
              {{ printAssignedTo(slotProps.data.assignedTo) }}
            </template>
          </Column>
          <Column field="createdAt" header="Created on"></Column>
          <Column field="state" header="State"></Column>
          <Column field="statusChanges" header="Status Changes">
            <template #body="slotProps">
              {{ calculateStatusChanges(slotProps.data) }}
            </template>
          </Column>
          <Column field="status" header="Status"></Column>
          <Column field="statusRestingTime" header="Resting time (Status)"></Column>
        </DataTable>
      </template>
    </Card>
    <Card class="mr-2 w-23rem border-3 border-round border-red-500">
      <template #title>
        <div class="flex flex-column align-items-center">Input Parameters</div>
      </template>
      <template #content>
        <div class="flex flex-column align-items-center">
          <div>Minimal resting time in current status (days)</div>
          <InputNumber v-model="minimalRestingTime"></InputNumber>
          <div>Minimal number of status changes</div>
          <InputNumber v-model="minimalStatusChanges"></InputNumber>
          <div class="flex align-items-center justify-content-evenly mt-2">
            <Button label="Clear" @click="clearFilters" class="mr-2"> </Button>
            <Button label="Apply" @click="applyFilters" class="ml-2"> </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { calculateStatusChanges } from '@/services/issueCalculator';
import { filterIssuesMinimumStatusChangesAndRestingTime } from '@/services/filter/ProjectsFilter';
import type { ProjectIF } from '@/model/ProjectIF';
import type { FilterConfigIF, ProjectFilterConfigIF } from '@/model/FilterConfigIF';
import type { EmployeeIF } from '@/model/EmployeeIF';

const props = defineProps({
  project: Object as () => ProjectIF,
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

function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}
</script>
