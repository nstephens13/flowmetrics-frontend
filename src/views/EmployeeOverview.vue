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
              v-model="selectedProjects"
              :options="allProjects"
              option-label="name"
              placeholder="Select project"
              :maxSelectedLabels="1"
              class="w-full md:w-14rem"
            />
            <MultiSelect
              v-model="selectedStatuses"
              :options="allStatuses"
              placeholder="Select status"
              :maxSelectedLabels="1"
              class="w-full md:w-14rem"
            />
          </div>
        </template>
        <template #grid="slotProps">
          <div class="xl:col-2 lg:col-3 md:col-4 sm:col-6 col-12 p-2">
            <div class="p-4 border-1 surface-border border-round shadow-1 hover:bg-gray-50">
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
import { calculateWorkload, mergeEmployees } from '@/services/workloadCalculator';
import useFilterConfigStore from '@/store/FilterConfigStore';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import EmployeeCard from '@/components/EmployeeCard.vue';
import { getIssueStatusList } from '@/model/ProjectIF';
import useProjectsStore from '@/store/ProjectStore';
import getMockData from '@/assets/__mockdata__/mockDataComposer';

const filterConfigStore = useFilterConfigStore();
const projectStore = useProjectsStore();

const filterConfig = computed(() => filterConfigStore.getFilterConfig);

[getMockData(1), getMockData(3), getMockData(4), getMockData(6)].forEach((project) => {
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
  const workloadMap: Map<EmployeeIF, IssueDataIF> = calculateWorkload(
    filterProjectThatHasTheAllowedStatus(projects, filterConfig.value)
  );

  employeeList.value = mergeEmployees(workloadMap);
  // filter category names for the issues in the emplyeeList that are the keys of the issues in the workloadMap
  categoryNames.value = {
    firstCategory: 'Planning',
    secondCategory: 'Development',
    thirdCategory: 'Testing',
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
