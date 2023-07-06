<script setup lang="ts">
import { computed, ref } from 'vue';
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

const filterConfigStore = useFilterConfigStore();
const projectStore = useProjectsStore();

const filterConfig = computed(() => filterConfigStore.getFilterConfig);

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

const selectedStatuses: Ref<string[]> = ref([]);
const selectedProjects: Ref<ProjectIF[]> = ref([]);

function updateEmployeeList() {
  const workloadMap: Map<EmployeeIF, IssueDataIF> = calculateWorkload(
    filterProjectThatHasTheAllowedStatus(filterConfig.value)
  );

  employeeList.value = mergeEmployees(workloadMap);
  categoryNames.value = {
    firstCategory: 'Planning',
    secondCategory: 'Development',
    thirdCategory: 'Testing',
  };
}

function updateSelectedProjects() {
  selectedStatuses.value = [];
  const updatedFilterConfig = filterConfig.value;
  updatedFilterConfig.projectFilter.projectsWhiteList = selectedProjects.value;
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = [];
  filterConfigStore.setFilterConfig(updatedFilterConfig);
  updateEmployeeList();
  allStatuses.value = getIssueStatusList(
    filterConfig.value.projectFilter.projectsWhiteList.flatMap((project) => project.issues)
  );
}

function updateSelectedStatuses() {
  const updatedFilterConfig = filterConfig.value;
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = selectedStatuses.value;
  filterConfigStore.setFilterConfig(updatedFilterConfig);

  updateEmployeeList();
  allStatuses.value = getIssueStatusList(
    selectedProjects.value.flatMap((project) => project.issues)
  );
}

selectedProjects.value = filterConfig.value.projectFilter.projectsWhiteList;
selectedStatuses.value = filterConfig.value.projectFilter.issueStatusIncludeFilter;
updateEmployeeList();
</script>

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
              @change="updateSelectedProjects()"
              placeholder="Select project"
              :maxSelectedLabels="1"
              class="w-full md:w-14rem"
            />
            <MultiSelect
              v-model="selectedStatuses"
              :options="allStatuses"
              placeholder="Select status"
              @change="updateSelectedStatuses()"
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

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
</style>
