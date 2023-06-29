<template>
    <Card class="background-card">
        <template #title>
            Employee Overview
            <Divider></Divider>
            <div class="legend-container">
                <div class="first-bar-legend"></div>
                <h6 class="first-bar-font-size">{{ categoryNames.firstCategory }}</h6>
                <div class="second-bar-legend"></div>
                <h6 class="second-bar-font-size">{{ categoryNames.secondCategory }}</h6>
                <div class="third-bar-legend"></div>
                <h6 class="third-bar-font-size">{{ categoryNames.thirdCategory }}</h6>
            </div>
            <div class="dropdown-container">
                <label for="view-select">Select View: </label>
                <select v-model="selectedView" id="view-select">
                    <option value="workload">Workload View</option>
                    <option value="amount commits">Amount of Commits</option>
                </select>
            </div>
            <div class="dropdown-container">
                <label>Select FilterConfig: </label>
                <button class="dropdown-button" @click="isDropdownOpen = !isDropdownOpen">
                    {{ selectedStatuses.length }} Selected
                </button>
                <ul v-show="isDropdownOpen" class="dropdown-menu">
                    <li v-for="status in allStatuses" :key="status">
                        <label>
                            <input
                                type="checkbox"
                                :value="status"
                                v-model="selectedStatuses"
                                @change="updateFilterConfig"
                            />
                            {{ status }}
                        </label>
                    </li>
                </ul>
            </div>
        </template>
        <template #content>

            <div
                    v-for="[employee, employeeData] in employeeMap"
                    :key="employee.id"
                    class="employee-container"
            >
                <div class="user-container">
                    <div class="icon-background">
                        <span class="pi pi-user user-size"></span>
                    </div>

                    <div :style="getUserNameBackgroundStyle(employee)" class="user-name-background">
                        <div class="user-name">
                            {{ employee.firstName.toUpperCase() }}
                            {{ employee.lastName.toUpperCase() }}
                        </div>
                    </div>
                </div>

                <div class="statistics-container">
                    <div class="first-bar" :style="getBoxHeightStyle(employeeData.firstBar)"></div>
                    <div class="second-bar"
                         :style="getBoxHeightStyle(employeeData.secondBar)"></div>
                    <div class="third-bar" :style="getBoxHeightStyle(employeeData.thirdBar)"></div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import {
  computed, onMounted, ref, watch,
} from 'vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import calculateWorkload from '../services/workloadCalculator';
import {
  assignWorkloadMapToBars,
  calculateCssUserBackgroundStyle,
  getCssHeightForStatisticBoxes, parseCategoryNames,
} from './EmployeeOverviewHelper';
import getMockData, {
  devStatusList, nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '@/assets/__mockdata__/mockDataComposer';
import useFilterConfigStore from '@/store/FilterConfigStore';
import { filterProjectThatHasTheAllowedStatus } from '@/services/filter/IssuesStateFilter';
import type { ProjectIF } from '../model/ProjectIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

const filterConfigStore = useFilterConfigStore();
const employeeMap = ref<Map<EmployeeIF,
{ firstBar: number; secondBar: number; thirdBar: number }>>(
  new Map(),
);

const categoryNames = ref<{
  firstCategory: string,
  secondCategory: string,
  thirdCategory: string
}>({
  firstCategory: '',
  secondCategory: '',
  thirdCategory: '',
});
const allStatuses = ref();
const isDropdownOpen = ref(false);
const filterConfig = computed(() => filterConfigStore.getFilterConfig);
const selectedStatuses = ref(filterConfig.value.projectFilter.issueStatusIncludeFilter);

const selectedView = ref<string>('workload'); // Default value is 'workload'

function getUserNameBackgroundStyle(employee: EmployeeIF): string {
  const { width, height } = calculateCssUserBackgroundStyle(employee);
  return `width: ${width}px; height: ${height}px`;
}

function getBoxHeightStyle(count: number) {
  const height = getCssHeightForStatisticBoxes(count);
  return `height: ${height}px`;
}

function readCategoriesDescription(mapToRead: Map<EmployeeIF, any>):
{ firstCategory: string, secondCategory: string, thirdCategory: string } {
  return parseCategoryNames(mapToRead);
}

function displayWorkload(workloadMap: Map<EmployeeIF, {
  planning: number;
  development: number;
  testing: number
}>): Map<EmployeeIF,
  { firstBar: number; secondBar: number; thirdBar: number }> {
  return assignWorkloadMapToBars(workloadMap);
}

function showWorkloadView(filterConfig: FilterConfigIF) {
  const projectToFilter: ProjectIF = getMockData(6);
  const project: ProjectIF = filterProjectThatHasTheAllowedStatus(projectToFilter, filterConfig);
  const workloadMap = calculateWorkload(project);
  employeeMap.value = displayWorkload(workloadMap);
  categoryNames.value = readCategoriesDescription(workloadMap);
}

function showSecondView(filterConfig: FilterConfigIF) {
  const projectToFilter: ProjectIF = getMockData(6);
  const project: ProjectIF = filterProjectThatHasTheAllowedStatus(projectToFilter, filterConfig);
  const workloadMap = calculateWorkload(project);
  employeeMap.value = displayWorkload(workloadMap);
  categoryNames.value = {
    firstCategory: '<10 commits',
    secondCategory: '10-30 commits',
    thirdCategory: '>30 commits',
  };
}
function updateFilterConfig() {
  const updatedFilterConfig = { ...filterConfig.value };
  updatedFilterConfig.projectFilter.issueStatusIncludeFilter = selectedStatuses.value;
  filterConfigStore.setFilterConfig(updatedFilterConfig);
}

watch(
  () => [selectedView.value, filterConfigStore.filter],
  ([selectedView, filterConfig]: [string, FilterConfigIF]) => {
    if (selectedView === 'workload') {
      showWorkloadView(filterConfig);
    } else if (selectedView === 'amount commits') {
      showSecondView(filterConfig);
    }
  },
  { immediate: true },
);
watch(selectedStatuses, () => {
  updateFilterConfig();
});

watch(filterConfig, (newConfig) => {
  selectedStatuses.value = newConfig.projectFilter.issueStatusIncludeFilter;
});

onMounted(() => {
  const statusList: string[] = [...planningStatusList,
    ...devStatusList, ...testingStatusList, ...nonDisplayedStatusList];
  allStatuses.value = statusList;
  // Call showWorkloadView immediately after mounting
  showWorkloadView(filterConfigStore.filter);
});
</script>

<style>
/* Card Component */
.background-card {
    width: auto;
    height: auto;
}

/* Container for legend */
.legend-container {
    display: inline-flex;
    align-items: center; /* Center vertically */
    margin-left: 60px;
    flex-wrap: nowrap;
}

/* Legend */
.first-bar-legend {
    width: 20px;
    height: 20px;
    background-color: rgba(128, 128, 128, 0.8); /* RGB values and opacity */
}

.first-bar-font-size {
    font-size: 12px;
    margin-left: 10px;

}

.second-bar-legend {
    width: 20px;
    height: 20px;
    background-color: rgba(128, 128, 128, 0.5); /* RGB values and opacity */
    margin-left: 30px;
}

.second-bar-font-size {
    font-size: 12px;
    margin-left: 10px;
}

.third-bar-legend {
    width: 20px;
    height: 20px;
    background-color: rgba(128, 128, 128, 0.3); /* RGB values and opacity */
    margin-left: 30px;
}

.third-bar-font-size {
    font-size: 12px;
    margin-left: 10px;
    margin-right: 15px;

}

/* Container for icon with background, user name with background and statistics */
.employee-container {
    display: inline-flex;
    align-items: center; /* Center vertically */
    margin-bottom: 40px;
    margin-right: 40px;
    justify-content: center; /* Center horizontally */
}

/* Container for icon with background and user name with background */
.user-container {
    display: flex;
    align-items: center; /* Center vertically */
    flex-direction: column;
    justify-content: center; /* Center horizontally */
}

/* Employee icon and background */
.icon-background {
    width: 60px;
    height: 60px;
    background-color: rgba(128, 128, 128, 0.9); /* RGB values and opacity */
    border-radius: 5%; /* Change roundness of edges */
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-size {
    font-size: 40px;
    color: white;
}

/* User name and background */
.user-name-background {
    background-color: rgba(45, 108, 193, 0.9);
    border-radius: 0.5em;
    display: flex; /* Centers the name */
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-top: 10px;
}

.user-name {
    font-size: 11px;
    color: white;
    text-align: center;
}

/* Container for statistics */
.statistics-container {
    display: flex;
    align-items: flex-end; /* Align items to the bottom */
    align-self: end;
}

.first-bar {
    width: 20px;
    background-color: rgba(128, 128, 128, 0.8); /* RGB values and opacity */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
}

.second-bar {
    width: 20px;
    background-color: rgba(128, 128, 128, 0.5); /* RGB values and opacity */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.third-bar {
    width: 20px;
    background-color: rgba(128, 128, 128, 0.3); /* RGB values and opacity */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
.dropdown-container {
    position: relative;
    display: inline-block;
    margin-right: 15px
}

.dropdown-button {
    padding: 5px 10px;
    background-color: #eee;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
    padding: 0;
    list-style-type: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-menu li {
    padding: 5px;
}

.dropdown-menu li label {
    display: block;
}

</style>
