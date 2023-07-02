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
          <div class="grid gap-3">
            <Dropdown
              v-model="selectedView"
              :options="views"
              optionLabel="displayName"
              placeholder="Select View"
              class="w-full md:w-14rem"
            />
            <MultiSelect 
              v-model="selectedStatuses"
              :options="statuses"
              optionLabel="displayName"
              placeholder="Select FilterConfig"
              :maxSelectedLabels="1"
              class="w-full md:w-14rem"
            />
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
            <div class="p-4 border-1 surface-border border-round shadow-5 hover:bg-gray-50">
              <EmployeeCard 
                :employee="slotProps.data.employee" 
                :issues="slotProps.data.issues" 
                :categoryNames="slotProps.data.categoryNames"
              />
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Ref } from 'vue';
  
  import EmployeeCard from '@/components/EmployeeCard.vue';
  import calculateWorkload from '@/services/workloadCalculator';
  import getMockData from '@/assets/__mockdata__/mockDataComposer';

  import type { ProjectIF } from '@/model/ProjectIF';
  import type { EmployeeIF } from '@/model/EmployeeIF';
  import type { IssueDataIF } from '@/model/IssueDataIF';
  import type { FilterConfigIF } from '@/model/FilterConfigIF';

  const selectedView = ref<string>('workload'); // Default value is 'workload'
  const views = ref([
    { id: 'workload', displayName: 'Workload View' },
    { id: 'amountOfCommits', displayName: 'Amount of Commits' }
  ]);

  const selectedStatuses = ref(); // Default value is 'workload'
  const statuses = ref([
    { id: 'planned', displayName: 'Planned' },
    { id: 'design', displayName: 'Design' },
    { id: 'inWork', displayName: 'In work' },
    { id: 'review', displayName: 'Review' },
    { id: 'unitTest', displayName: 'Unit Test' },
    { id: 'e2e', displayName: 'E2E' },
    { id: 'closed', displayName: 'Closed' }
  ]);

  const projects: Ref<ProjectIF[]> = ref([
    getMockData(1),
    getMockData(2),
    getMockData(3),
    getMockData(53),
    getMockData(54),
    getMockData(55),
  ] as ProjectIF[]);
  const selectedProject = ref({
    id: 0,
    name: 'Project_Name',
    description: '',
    milestones: [],
    issues: [],
  } as ProjectIF);
  
  const workload: Ref<Map<EmployeeIF, IssueDataIF>> = ref(calculateWorkload(selectedProject.value));
  const employeeList = ref(
    Array.from(workload.value, ([employee, issues]) => ({ employee, issues }))
  );

  watch(selectedProject, (selectedProjectInDropdown) => {
    workload.value = calculateWorkload(selectedProjectInDropdown);
    employeeList.value = Array.from(workload.value, ([employee, issues]) => ({ employee, issues }));
  });

</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
