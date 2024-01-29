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
            :value="countIssuesByState(selectedProject.issues, Category.planning)"
            :max="getIssueCountMax(selectedProject.issues)"
            percentage
            rounded
            title="Planning issues"
          />
          <CircularProgressBar
            class="flex align-items-center justify-content-center m-2"
            :value="countIssuesByState(selectedProject.issues, Category.development)"
            :max="getIssueCountMax(selectedProject.issues)"
            percentage
            rounded
            title="Development issues"
          />
          <CircularProgressBar
            class="flex align-items-center justify-content-center m-2"
            :value="countIssuesByState(selectedProject.issues, Category.testing)"
            :max="getIssueCountMax(selectedProject.issues)"
            percentage
            rounded
            title="Testing issues"
          />
        </div>
        <div class="flex-grow-1 flex align-items-center justify-content-center"></div>
      </div>
    </template>
  </Panel>
  <DataTable
    v-model:filters="filters"
    :globalFilterFields="['name']"
    paginator
    :rows="10"
    filterDisplay="menu"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    :value="selectedProject.issues"
    showGridlines
    class="mt-3"
  >
    <Column field="id" header="Issue ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="priority" header="Priority"></Column>
    <Column field="issueType" header="Issue type"></Column>
    <Column field="createdAt" header="Created on">
      <template #body="slotProps">
        {{ DateTime.fromJSDate(slotProps.data.createdAt).toLocaleString(DateTime.DATETIME_FULL) }}
      </template>
    </Column>
    <Column field="createdBy" header="Created by">
      <template #body="slotProps">
        {{ printAssignedTo(slotProps.data.createdBy) }}
      </template>
    </Column>
    <Column field="assignedTo" header="Assigned to">
      <template #body="slotProps">
        {{ printAssignedTo(slotProps.data.assignedTo) }}
      </template>
    </Column>
    <Column header="Resting time (Assignee)">
      <template #body="slotProps">
        {{ printRestingTime(slotProps.data.assigneeRestingTime) }}
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
      <template #body="slotProps">
        {{ calculateStatusChanges(slotProps.data) }}
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
        {{ printRestingTime(slotProps.data.statusRestingTime) }}
      </template>
    </Column>
    <Column field="dueTo" header="Due date">
      <template #body="slotProps">
        {{ DateTime.fromJSDate(slotProps.data.dueTo).toLocaleString(DateTime.DATETIME_FULL) }}
      </template>
    </Column>
    <Column header="Remaining reaction time">
      <template #body="slotProps">
        {{
          getReactionTimeForIssue(
            slaRulesStore().getCategoriesContainingProject(selectedProject.id),
            slotProps.data
          )
        }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { DateTime } from 'luxon';
import { FilterMatchMode } from 'primevue/api';
import CircularProgressBar from '@/components/CircularProgressBar.vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { countIssuesByState } from '@/services/Issue';
import { getIssueStateList, getIssueStatusList } from '@/model/ProjectIF';
import {
  calculateStatusChanges,
  getIssueCountMax,
  printAssignedTo,
  printRestingTime,
} from '@/services/issueCalculator';
import projectStore from '@/store/projectStore';
import slaRulesStore from '@/store/slaRulesStore';
import { Category } from '@/assets/__mockdata__/IssueProps/statusLists';
import getReactionTimeForIssue from '@/services/reactionTimeCalculator';

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
const statuses: Ref<string[]> = computed(() => getIssueStatusList(selectedProject.value.issues));

// Create a reference for the states array
const states: Ref<string[]> = computed(() => getIssueStateList(selectedProject.value.issues));

// Create a reference for the filters object with initial configuration
const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
  state: { value: null, matchMode: FilterMatchMode.IN },
});

// Create a reference for the projects array with mock data
const projects: Ref<ProjectIF[]> = computed(() => projectStore().getProjects);
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
