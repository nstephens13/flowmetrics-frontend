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
            <MultiSelect
              v-model="selectedStatuses"
              :options="allStatuses"
              placeholder="Select Status"
              :maxSelectedLabels="1"
              class="w-full md:w-14rem"
            />
            <MultiSelect
              v-model="selectedProjects"
              :options="allProjects"
              option-label="name"
              placeholder="Select Projects"
              :maxSelectedLabels="1"
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
                :categoryNames="categoryNames"
              />
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueDataIF } from '@/model/IssueDataIF';
import calculateWorkload from '@/services/workloadCalculator';
import useFilterConfigStore from '@/store/FilterConfigStore';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import EmployeeCard from '@/components/EmployeeCard.vue';
import { getIssueStatusList } from '@/model/ProjectIF';
import useProjectsStore from '@/store/ProjectStore';
import getMockData from '@/assets/__mockdata__/mockDataComposer';

const filterConfigStore = useFilterConfigStore();
const projectStore = useProjectsStore();

const filterConfig = computed(() => filterConfigStore.getFilterConfig);

[
  getMockData(1),
  getMockData(2),
  getMockData(3),
  getMockData(4),
  getMockData(5),
  getMockData(6),
].forEach((project) => {
  projectStore.addProject(project);
});

const workload: Ref<Map<EmployeeIF, IssueDataIF>> = ref(
  calculateWorkload(filterConfig.value.projectFilter.projectsWhiteList)
);

const allStatuses: Ref<string[]> = ref(
  getIssueStatusList(
    filterConfig.value.projectFilter.projectsWhiteList.flatMap((project) => project.issues)
  )
);

const allProjects: Ref<ProjectIF[]> = ref(projectStore.getProjects);

const employeeList = ref(
  Array.from(workload.value, ([employee, issues]) => ({ employee, issues }))
);

const categoryNames = ref<{
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
}>({
  firstCategory: '',
  secondCategory: '',
  thirdCategory: '',
});

const selectedStatuses = ref(filterConfig.value.projectFilter.issueStatusIncludeFilter);
const selectedProjects = ref(filterConfig.value.projectFilter.projectsWhiteList);

function updateEmployeeList(projects: ProjectIF[]) {
  const workloadMap = calculateWorkload(
    filterProjectThatHasTheAllowedStatus(projects, filterConfig.value)
  );
  employeeList.value = Array.from(workloadMap, ([employee, issues]) => ({ employee, issues }));
  // filter category names for the issues in the emplyeeList that are the keys of the issues in the workloadMap
  categoryNames.value = {
    firstCategory: 'planning',
    secondCategory: 'development',
    thirdCategory: 'testing',
  };
}

watch(selectedProjects, (projects) => {
  const updatedFilterConfig = { ...filterConfig.value };
  updatedFilterConfig.projectFilter.projectsWhiteList = projects;
  filterConfigStore.setFilterConfig(updatedFilterConfig);

  selectedStatuses.value = [];
  updateEmployeeList(projects);
  allStatuses.value = getIssueStatusList(projects.flatMap((project) => project.issues));
});

watch(selectedStatuses, (statuses) => {
  const updatedFilterConfig = { ...filterConfig.value };
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = statuses;
  filterConfigStore.setFilterConfig(updatedFilterConfig);

  updateEmployeeList(selectedProjects.value);
  allStatuses.value = getIssueStatusList(
    selectedProjects.value.flatMap((project) => project.issues)
  );
});
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
