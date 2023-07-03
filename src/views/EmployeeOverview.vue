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
              @onChange="updateFilterConfig()"
              placeholder="Select Status"
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
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import useFilterConfigStore from '@/store/FilterConfigStore';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import EmployeeCard from '@/components/EmployeeCard.vue';
import { getIssueStatusList } from '@/model/ProjectIF';

const selectedProject: Ref<ProjectIF> = ref(getMockData(3));
const allStatuses: Ref<string[]> = ref(getIssueStatusList(selectedProject.value.issues));

const filterConfigStore = useFilterConfigStore();
const filterConfig = computed(() => filterConfigStore.getFilterConfig);
const workload: Ref<Map<EmployeeIF, IssueDataIF>> = ref(
  calculateWorkload(filterProjectThatHasTheAllowedStatus(selectedProject.value, filterConfig.value))
);

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

function updateFilterConfig() {
  const updatedFilterConfig = { ...filterConfig.value };
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = selectedStatuses.value;
  filterConfigStore.setFilterConfig(updatedFilterConfig);
}

function updateEmployeeList(project: ProjectIF) {
  const workloadMap = calculateWorkload(
    filterProjectThatHasTheAllowedStatus(project, filterConfig.value)
  );
  employeeList.value = Array.from(workloadMap, ([employee, issues]) => ({ employee, issues }));
  // filter category names for the issues in the emplyeeList that are the keys of the issues in the workloadMap
  categoryNames.value = {
    firstCategory: 'planning',
    secondCategory: 'development',
    thirdCategory: 'testing',
  };
}

watch(selectedStatuses, () => {
  updateFilterConfig();
});

watch(filterConfig, (newConfig) => {
  selectedStatuses.value = newConfig.projectFilter.issueStatusIncludeFilter;
  updateEmployeeList(selectedProject.value);
});

watch(selectedProject, (project) => {
  selectedStatuses.value = [];
  allStatuses.value = getIssueStatusList(project.issues);
  updateEmployeeList(project);
});
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
