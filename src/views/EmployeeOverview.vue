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
              v-model="filterConfigStore.filter.projectFilter.projectsWhiteList"
              :maxSelectedLabels="1"
              :options="allProjects"
              class="w-full md:w-14rem"
              option-label="name"
              placeholder="Select project"
            />
            <MultiSelect
              v-model="filterConfigStore.filter.projectFilter.issueStatusIncludeFilter"
              :maxSelectedLabels="1"
              :options="allStatuses"
              class="w-full md:w-14rem"
              placeholder="Select status"
            />
          </div>
        </template>
        <template #grid="slotProps">
          <div
            class="xl:col-2 lg:col-3 md:col-4 sm:col-6 col-12 p-2"
            :style="
              slotProps.data.employee.firstName === 'Unassigned'
                ? 'color: rgba(169, 169, 169, 0.8)'
                : ''
            "
            data-test="unassigned-employee"
          >
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

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import EmployeeCard from '@/components/EmployeeCard.vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueDataIF } from '@/model/Issue/IssueDataIF';
import { getIssueStatusList } from '@/model/ProjectIF';
import { calculateWorkload, mergeEmployees } from '@/services/workloadCalculator';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import useProjectsStore from '@/store/projectStore';
import useFilterConfigStore from '@/store/filterConfigStore';

// Create a reference to the FilterConfigStore and ProjectStore instances
const filterConfigStore = useFilterConfigStore();
const projectStore = useProjectsStore();

// Create a reference to all the issue statuses from the projects in the filterConfig
const allStatuses: ComputedRef<string[]> = computed(() =>
  getIssueStatusList(
    filterConfigStore.filter.projectFilter.projectsWhiteList.flatMap((project) => project.issues)
  )
);

// Create a reference to all the projects from the ProjectStore
const allProjects: ComputedRef<ProjectIF[]> = computed(() => projectStore.getProjects);

function moveUnassignedEmployeeToFront(
  employeeListParam: { employee: EmployeeIF; issues: IssueDataIF }[]
): { employee: EmployeeIF; issues: IssueDataIF }[] {
  // Move the unassigned employee to the front of the list
  const unassignedIndex = employeeListParam.findIndex(
    (employee) => employee.employee.firstName === 'Unassigned'
  );

  let newEmployeeList = employeeListParam;

  // Returns -1 if no element is found
  if (unassignedIndex !== -1) {
    const unassignedEmployee = employeeListParam.splice(unassignedIndex, 1)[0];
    newEmployeeList = [unassignedEmployee, ...employeeListParam];
  }
  return newEmployeeList;
}

// Create a reference to the employee list based on the workload data
const employeeList = computed(() =>
  moveUnassignedEmployeeToFront(
    mergeEmployees(
      calculateWorkload(filterProjectThatHasTheAllowedStatus(filterConfigStore.getFilterConfig))
    )
  )
);

// Create a reference to the category names with initial empty values
const categoryNames = ref<{
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
}>({
  firstCategory: 'Planning',
  secondCategory: 'Development',
  thirdCategory: 'Testing',
});
</script>

<style scoped>
.p-card {
  margin: 15px;
  box-shadow: none;
}
.divider-position {
  width: 100%;
}
</style>
