<template>
  <Card class="background-card">
    <template #title
      >Employee Overview
      <div class="legend-container">
        <div class="open-legend"></div>
        <h6 class="open-font-size">OPEN</h6>
        <div class="in-progress-legend"></div>
        <h6 class="in-progress-font-size">IN PROGRESS</h6>
        <div class="closed-legend"></div>
        <h6 class="closed-font-size">CLOSED</h6>
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
          <div class="open" :style="getBoxHeightStyle(employeeData.openIssues)"></div>
          <div class="in-progress" :style="getBoxHeightStyle(employeeData.inProgressIssues)"></div>
          <div class="closed" :style="getBoxHeightStyle(employeeData.closedIssues)"></div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import calculateWorkload from '../services/workloadCalculator';

function getHeightForStatisticBoxes(count: number) {
  const minHeight = 5; // Minimum height for the box
  const maxHeight = 80; // Maximum height for the box
  // Calculate the height based on the count
  return Math.min(minHeight + count * 5, maxHeight);
}

function calculateUserBackgroundStyle(employee: EmployeeIF) {
  const firstNameLength = employee.firstName.trim().length;
  const lastNameLength = employee.lastName.trim().length;
  const nameLength = (firstNameLength + lastNameLength) * 10;
  // Calculate width of blue background behind username
  const width = nameLength + 10; // Add 10 pixels for padding
  // Calculate height of blue background behind username
  const height = 10 + (nameLength > 0 ? 10 : 0);
  return { width, height };
}

const employeeMap = ref<
Map<EmployeeIF, { openIssues: number; inProgressIssues: number; closedIssues: number }>
>(calculateWorkload(null));

function getUserNameBackgroundStyle(employee: EmployeeIF): string {
  const { width, height } = calculateUserBackgroundStyle(employee);
  return `width: ${width}px; height: ${height}px`;
}

function getBoxHeightStyle(count: number) {
  const height = getHeightForStatisticBoxes(count);
  return `height: ${height}px`;
}
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
}
/* Legend */
.open-legend {
  width: 20px;
  height: 20px;
  background-color: rgba(128, 128, 128, 0.8); /* RGB values and opacity */
}
.open-font-size {
  font-size: 12px;
  margin-left: 10px;
}
.in-progress-legend {
  width: 20px;
  height: 20px;
  background-color: rgba(128, 128, 128, 0.5); /* RGB values and opacity */
  margin-left: 30px;
}
.in-progress-font-size {
  font-size: 12px;
  margin-left: 10px;
}
.closed-legend {
  width: 20px;
  height: 20px;
  background-color: rgba(128, 128, 128, 0.3); /* RGB values and opacity */
  margin-left: 30px;
}
.closed-font-size {
  font-size: 12px;
  margin-left: 10px;
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
.open {
  width: 20px;
  background-color: rgba(128, 128, 128, 0.8); /* RGB values and opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
}
.in-progress {
  width: 20px;
  background-color: rgba(128, 128, 128, 0.5); /* RGB values and opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.closed {
  width: 20px;
  background-color: rgba(128, 128, 128, 0.3); /* RGB values and opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
</style>
