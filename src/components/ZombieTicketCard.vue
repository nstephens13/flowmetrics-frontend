<template>
  <div>
    <Card>
      <template #title>Zombie Tickets</template>
      <template #content>
        <DataTable
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100]"
          :value="filteredIssues"
          showGridlines
        >
          <Column field="id" header="Issue ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="assignedTo" header="Assigned to"></Column>
          <Column field="createdAt" header="Created on"></Column>
          <Column field="state" header="State"></Column>
          <Column field="statusChanges.length" header="Status Changes"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="statusRestingTime" header="Resting time (Status)"></Column>
        </DataTable>
      </template>
    </Card>
    <Card>
      <template #content>
        <div>Minimal resting time in current status (days)</div>
        <InputNumber v-Model="minimalRestingTime"></InputNumber>
        <div>Minimal number of status changes</div>
        <InputNumber v-Model="minimalStatusChanges"></InputNumber>
        <div>
          <Button label="Clear" @click="clearFilters"> </Button>
          <Button label="Apply" @click="applyFilters"> </Button>
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

const props = defineProps({
  project: Object as () => ProjectIF,
});

const filteredIssues: Ref<IssueIF[]> = ref([]);
const minimalRestingTime: Ref<number> = ref(0);
const minimalStatusChanges: Ref<number> = ref(5);
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
  filterIssuesMinimumStatusChangesAndRestingTime(props.project.issues, filterConfig);
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
</script>
