<template>
  <div class="card" style="position: relative;">
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
            Project-ID: {{ selectedProject.id }}<br>
            Description: {{ selectedProject.description }}<br>
            Total issues : {{ selectedProject.issues.length }}<br>
          </template>
        </Panel>
      </template>
    </Card>
  </div>
  <div class="card">
    <Card>
      <template #title>
        Tickets
        <Divider></Divider>
      </template>
      <template #content>
        <div class="card">
          <DataTable :value="selectedProject.issues" showGridlines
                     filterDisplay="menu" filters="filters">
            <Column field="id" header="Ticket-ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="assignedTo" header="Assigned To">
              <template #body="slotProps">
                {{ printAssignedTo(slotProps.data.assignedTo) }}
              </template>
            </Column>
            <Column field="createdBy" header="Created by"></Column>
            <Column field="createdAt" header="Created on"></Column>
            <Column field="closedAt" header="Closed on"></Column>
            <Column field="dueTo" header="Due on"></Column>
            <Column field="status" header="Status" filter-field="status">
              <template #body= "slotProps">
                <Tag :value= "printStatus(slotProps.data.status)"
                     :severity= "getSeverity(slotProps.data.status)" rounded>
                </Tag>
              </template>
              <template #filter="{ filterModel }">
                <MultiSelect v-model="filterModel.value" :options="statuses"
                             placeholder="select Statuses" class="p-column-filter"
                             display= "chip">
                  <template #option="slotProps">
                    <span>{{ printStatus(slotProps.option) }}</span>
                  </template>
                </MultiSelect>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import type { Status } from '@/model/IssueIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import getMockData from '../assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '@/model/ProjectIF';

function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}

//  transforms the status in Number to a readable String
const printStatus = (stat: Status): String => {
  switch (stat) {
    case 0: return 'open';
    case 1: return 'closed';
    case 2: return 'in progress';
    default: return stat.toString();
  }
};

//  severity defines the background colour of a tag
const getSeverity = (stat: Status): String => {
  switch (stat) {
    case 0: return 'danger'; //  red
    case 1: return 'success'; //  green
    case 2: return 'warning'; //  yellow
    default: return '';
  }
};

const statuses = ref([0, 1, 2]);

const selectedProject: Ref<ProjectIF> = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: [],
} as ProjectIF);

const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

defineExpose({ printAssignedTo, printStatus, getSeverity });

const projects: Ref<ProjectIF[]> = ref(
  [
    getMockData(1),
    getMockData(2),
    getMockData(3),
    getMockData(53),
    getMockData(54),
    getMockData(55),
  ] as ProjectIF[],
);

//  todo still static -> extract list of statuses from project Object
/*  todo how to get Project Object?
const getAllStatuses = (Project: ProjectIF): Status[] => {
  const PossibleStatuses: Status[] | null = [];
  for (let i = 0; i < Project.issues.length; i++) {
    if (!PossibleStatuses.contains(Project.issues[i].status)) {
      PossibleStatuses.push(Project.issues[i].status);
    }
  }
  return PossibleStatuses;
};

                <div class="card flex justify-content-center">
                  <MultiSelect v-model="filterModel.value" :options="statuses"
                              placeholder="select Statuses" class="p-column-filter"
                              display= "chip">
                    <template #option="slotProps">
                      <span>{{ printStatus(slotProps.option) }}</span>
                    </template>
                  </MultiSelect>
                </div>
*/
</script>

<style scoped>
.p-card{
  margin: 15px;
  box-shadow: none;
}
</style>
