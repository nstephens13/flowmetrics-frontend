<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import EmployeeCard from '@/components/EmployeeCard.vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueDataIF } from '@/model/IssueDataIF';
import { getIssueStatusList } from '@/model/ProjectIF';
import { calculateWorkload, mergeEmployees } from '@/services/workloadCalculator';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import useProjectsStore from '@/store/projectStore';
import useFilterConfigStore from '@/store/filterConfigStore';

// Create a reference to the FilterConfigStore and ProjectStore instances
const filterConfigStore = useFilterConfigStore();
const projectStore = useProjectsStore();

// Create a computed reference to the filterConfig from the FilterConfigStore
const filterConfig = computed(() => filterConfigStore.getFilterConfig);

// Create a reference to the calculated workload based on the project whitelist in the filterConfig
const workload: Ref<Map<EmployeeIF, IssueDataIF>> = ref(
  calculateWorkload(filterConfig.value.projectFilter.projectsWhiteList)
);

// Create a reference to all the issue statuses from the projects in the filterConfig
const allStatuses: Ref<string[]> = ref(
  getIssueStatusList(
    filterConfig.value.projectFilter.projectsWhiteList.flatMap((project) => project.issues)
  )
);

// Create a reference to all the projects from the ProjectStore
const allProjects: Ref<ProjectIF[]> = ref(projectStore.getProjects);

// Create a reference to the employee list based on the workload data
const employeeList = ref(
  Array.from(workload.value, ([employee, issues]) => ({ employee, issues }))
);

// Create a reference to the category names with initial empty values
const categoryNames = ref<{
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
}>({
  firstCategory: '',
  secondCategory: '',
  thirdCategory: '',
});

// Create references for selectedStatuses and selectedProjects
const selectedStatuses: Ref<string[]> = ref([]);
const selectedProjects: Ref<ProjectIF[]> = ref([]);

// Function to update the employee list and category names
function updateEmployeeList() {
  // Calculate the workload based on the filtered projects in the filterConfig
  const workloadMap: Map<EmployeeIF, IssueDataIF> = calculateWorkload(
    filterProjectThatHasTheAllowedStatus(filterConfig.value)
  );

  // Update the employee list by merging the workload data
  employeeList.value = mergeEmployees(workloadMap);

  // Set the category names to predefined values
  categoryNames.value = {
    firstCategory: 'Planning',
    secondCategory: 'Development',
    thirdCategory: 'Testing',
  };
}

// Function to update the selected projects and trigger employee list update
function updateSelectedProjects() {
  // Clear the selected statuses
  selectedStatuses.value = [];

  // Update the filterConfig with the selected projects
  const updatedFilterConfig = filterConfig.value;
  updatedFilterConfig.projectFilter.projectsWhiteList = selectedProjects.value;
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = [];
  filterConfigStore.setFilterConfig(updatedFilterConfig);

  // Update the employee list and allStatuses
  updateEmployeeList();
  allStatuses.value = getIssueStatusList(
    filterConfig.value.projectFilter.projectsWhiteList.flatMap((project) => project.issues)
  );
}

// Function to update the selected statuses and trigger employee list update
function updateSelectedStatuses() {
  // Update the filterConfig with the selected statuses
  const updatedFilterConfig = filterConfig.value;
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = selectedStatuses.value;
  filterConfigStore.setFilterConfig(updatedFilterConfig);

  // Update the employee list and allStatuses
  updateEmployeeList();
  allStatuses.value = getIssueStatusList(
    selectedProjects.value.flatMap((project) => project.issues)
  );
}

// Initialize the selectedProjects and selectedStatuses references
selectedProjects.value = filterConfig.value.projectFilter.projectsWhiteList;
selectedStatuses.value = filterConfig.value.projectFilter.issueStatusIncludeFilter;

// Initial update of the employee list
updateEmployeeList();
</script>

<template>
  <Card>
    <template #title>
      <div class="grid">
        <div class="col-12">
          <p>Employee Overview</p>
          <Divider class="p-divider p-divider-horizontal divider-position" />
        </div>
      </div>
    </template>
    <template #content>
      <DataView :value="employeeList" dataKey="employee.id" layout="grid">
        <template #header>
          <div class="grid gap-3">
            <MultiSelect
              v-model="selectedProjects"
              :maxSelectedLabels="1"
              :options="allProjects"
              class="w-full md:w-14rem"
              option-label="name"
              placeholder="Select project"
              @change="updateSelectedProjects()"
            />
            <MultiSelect
              v-model="selectedStatuses"
              :maxSelectedLabels="1"
              :options="allStatuses"
              class="w-full md:w-14rem"
              placeholder="Select status"
              @change="updateSelectedStatuses()"
            />
          </div>
        </template>
        <template #grid="slotProps">
          <div class="xl:col-2 lg:col-3 md:col-4 sm:col-6 col-12 p-2">
            <div class="p-4 border-1 surface-border border-round shadow-1 hover:bg-gray-50">
              <EmployeeCard
                :categoryNames="categoryNames"
                :employee="slotProps.data.employee"
                :issues="slotProps.data.issues"
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
.divider-position {
  width: 100%;
}
</style>
