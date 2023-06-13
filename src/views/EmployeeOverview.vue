<template>
    <Card class="background-card">
        <template #title>Employee Overview</template>

        <template #content>

            <div v-for="([employee, employeeData]) in employeeMap"
                 :key="employee.id"
                 class="icon-container">

                <div class="user-details">
                    <div class="icon-background">
                        <span class="pi pi-user user-size"></span>
                    </div>

                    <div :style="getUserNameBackgroundStyle(employee)" class="user-name-background">
                        <div class="user-name">
                            {{ employee.firstName }} {{ employee.lastName }}
                        </div>
                    </div>
                </div>

                <div class="statistics-container">
                    <div class="open" :style="getBoxHeightStyle(employeeData.openIssues)"></div>
                    <div class="in-progress"
                         :style="getBoxHeightStyle(employeeData.inProgressIssues)">
                    </div>
                    <div class="closed" :style="getBoxHeightStyle(employeeData.closedIssues)"></div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import type { EmployeeIF } from '@/model/EmployeeIF';
import calculateWorkload from '../services/workloadCalculator';
import { calculateUserBackgroundStyle, getHeightForStatisticBoxes } from './EmployeeOverviewHelper';

export default defineComponent({
  name: 'EmployeeOverview',
  // Component options and logic
  components: {
    Card,
  },

  // Component properties
  props: {},

  // Computed property for dynamic styling
  computed: {
    employeeMap: (): Map<EmployeeIF,
    { openIssues: number;
      inProgressIssues: number;
      closedIssues: number }> => calculateWorkload(null),

    getUserNameBackgroundStyle: (): ((employee: EmployeeIF) => string) => (employee) => {
      const { width, height } = calculateUserBackgroundStyle(employee);
      return `width: ${width}px; height: ${height}px`;
    },

    getBoxHeightStyle: ():((count: number) => string) => (count: number) => `height: ${getHeightForStatisticBoxes(count)}px`,
  },
});
</script>

<style>
/* Card Component */
.background-card {
    /* width: 3072px; /* Set the width to match the MacBook Pro 16'' screen width */
    height: 700px;
}

.card-title {
    font-size: 20px;
}

.icon-container {
    display: inline-flex;
    align-items: center; /* Center vertically */
    margin-bottom: 40px;
    margin-right: 40px;
    justify-content: center; /* Center horizontally */

}

.user-details {
    display: flex;
    align-items: center; /* Center vertically */
    flex-direction: column;
    justify-content: center; /* Center horizontally */
}

/* Employee icon and background */
.icon-background {
    width: 60px;
    height: 60px;
    background-color: rgba(128, 128, 128, 0.4); /* RGB values and opacity */
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
    border-radius: 5%;
    display: flex; /* Centers the name */
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-top: 10px;
}

.user-name {
    font-size: 13px;
    color: white;
    text-align: center;
}

/* Statistics */
.statistics-container {
    display: flex;
    align-items: flex-end; /* Align items to the bottom */
    align-self: end;
}

.open {
    width: 20px;
    background-color: #CCCCCC;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
}

.in-progress {
    width: 20px;
    background-color: #808080;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.closed {
    width: 20px;
    background-color: #404040;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
</style>
