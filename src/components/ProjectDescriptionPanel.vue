<template>
  <div class="card" style="position: relative">
    <Card>
      <template #title>
        Project Overview
        <Divider></Divider>
      </template>
      <template #content>
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
            <div class="flex flex-row flex-wrap card-container justify-content-left">
              <h4 class="m-2">Project-ID: {{ selectedProject.id }}</h4>
              <h4 class="m-2">Description: {{ selectedProject.description }}</h4>
              <h4 class="m-2">Total issues: {{ selectedProject.issues.length }}</h4>
            </div>
          </template>
        </Panel>
      </template>
    </Card>
  </div>
  <div class="card">
    <Card>
      <template #title>
        Issues
        <Divider></Divider>
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
            :value="selectedProject.issues"
            showGridlines
          >
            <Column field="id" header="Issue-ID"></Column>
            <template #empty> No issues found. </template>
            <template #loading> Loading issues. Please wait. </template>
            <Column field="id" header="Ticket-ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="assignedTo" header="Assigned to">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
              </template>
            </Column>
            <Column field="createdBy" header="Created by">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
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
            <Column field="statusChanges" header="Status changes"></Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import type { EmployeeIF } from '@/model/EmployeeIF';
import { getIssueStatusList, type ProjectIF } from '@/model/ProjectIF';
import getMockData from '@/assets/__mockdata__/mockDataComposer';

const selectedProject = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
} as ProjectIF);

const statuses: Ref<string[]> = ref([]);

const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.IN },
});

function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}

watch(selectedProject, () => {
  statuses.value = getIssueStatusList(selectedProject.value.issues);
});

const projects: Ref<ProjectIF[]> = ref([
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(53),
  getMockData(54),
  getMockData(55),
] as ProjectIF[]);
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
