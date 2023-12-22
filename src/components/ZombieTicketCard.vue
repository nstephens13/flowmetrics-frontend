<template>
  <div class="flex flex-row mr-4 ml-4">
    <Card class="mr-2 ml-2 flex-grow-1">
      <template #title>Zombie Tickets</template>
      <template #content>
        <DataTable
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="filteredIssues"
          showGridlines
        >
          <Column field="id" header="Issue ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="assignedTo" header="Assigned to">
            <template #body="slotProps">
              {{ printAssignedTo(slotProps.data.assignedTo) }}
            </template>
          </Column>
          <Column field="createdAt" header="Created on"></Column>
          <Column field="state" header="State"></Column>
          <Column field="statusChanges.length" header="Status Changes"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="statusRestingTime" header="Resting time (Status)"></Column>
        </DataTable>
      </template>
    </Card>
    <Card class="mr-2 w-22rem">
      <template #title>input parameters</template>
      <template #content>
        <div class="flex flex-column align-content-start">
          <div>Minimal resting time in current status (days)</div>
          <InputNumber v-Model="minimalRestingTime"></InputNumber>
          <div>Minimal number of status changes</div>
          <InputNumber v-Model="minimalStatusChanges"></InputNumber>
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
import type { Ref } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { FilterConfigIF, ProjectFilterConfigIF } from '@/model/FilterConfigIF';
import { filterIssuesMinimumStatusChangesAndRestingTime } from '@/services/filter/ProjectsFilter';
import { EmployeeIF } from '@/model/EmployeeIF';

const props = defineProps({
  project: Object as () => ProjectIF,
});

const filteredIssues: Ref<IssueIF[]> = ref([]);
const minimalRestingTime: Ref<number> = ref(0);
const minimalStatusChanges: Ref<number> = ref(0);
const filterConfig = {
  id: 0,
  projectFilter: {
    projectsWhiteList: [],
    issueStatusIncludeFilter: [],
    minimumAssigneeRestingTime: 0,
    minimumNumberOfStatusChanges: 0,
    minimumStatusRestingTime: 0,
  } as ProjectFilterConfigIF,
} as FilterConfigIF;

function updateFilteredIssues(): void {
  if (!props.project) return;
  filteredIssues.value = filterIssuesMinimumStatusChangesAndRestingTime(
    props.project.issues,
    filterConfig
  );
}

const applyFilters = () => {
  filterConfig.projectFilter.minimumStatusRestingTime = minimalRestingTime.value;
  filterConfig.projectFilter.minimumNumberOfStatusChanges = minimalStatusChanges.value;
  updateFilteredIssues();
};

const clearFilters = () => {
  filterConfig.projectFilter.minimumStatusRestingTime = 0;
  filterConfig.projectFilter.minimumNumberOfStatusChanges = 0;
  updateFilteredIssues();
};

function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}
</script>
