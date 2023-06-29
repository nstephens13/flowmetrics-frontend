<template>
  <Card>
    <template #title>
      <div class="grid">
        <div class="col-12">
          <label class="PageTitel">Employee Overview</label>
        </div>
      </div>
      <Divider />
    </template>
    <template #content>
      <DataView :value="employeeList" dataKey="employee.id" layout="grid">
        <template #header>
          <div class="card p-fluid">
            <Dropdown
              v-model="selectedProject"
              :options="projects"
              optionLabel="name"
              placeholder="Select a project"
              class="w-full md:w-14rem"
            />
          </div>
        </template>
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border border-round shadow-5 hover:bg-gray-50 ">
              <EmployeeCard :employee="slotProps.data.employee" :issues="slotProps.data.issues" />
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import EmployeeCard from '@/components/EmployeeCard.vue'

const selectedProject = ref({
  id: 0,
  name: 'Project_Name',
  description: '',
  milestones: [],
  issues: []
} as ProjectIF)


const workload: Ref<Map<EmployeeIF,{ openIssues: number; inProgressIssues: number; closedIssues: number }>> = ref(calculateWorkload(selectedProject.value));
const employeeList = ref(Array.from(workload.value, ([employee, issues]) => ({ employee, issues})));


watch(selectedProject, (selectedProject) => {
    workload.value = calculateWorkload(selectedProject);
    employeeList.value = Array.from(workload.value, ([employee, issues]) => ({ employee, issues}));
});

</script>

<script lang="ts">
import calculateWorkload from '@/services/workloadCalculator'
import type { ProjectIF } from '@/model/ProjectIF'
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import type { Ref } from 'vue'
import type { EmployeeIF } from '@/model/EmployeeIF';

const projects: Ref<ProjectIF[]> = ref([
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(53),
  getMockData(54),
  getMockData(55)
] as ProjectIF[])
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
