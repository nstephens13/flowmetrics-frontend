<template>
  <div class="card">
    <div class="flex flex-wrap align-items-center justify-content-start gap-1">
      <Avatar
        :label="employee.firstName.charAt(0) + employee.lastName.charAt(0)"
        class="mr-2"
        size="large"
        style="background-color: #2d6dc1; color: #ffffff"
      />
      <h3 class="EmployeeName" style="margin-right: auto">{{
        employee.firstName + ' ' + employee.lastName
      }}</h3>
      <Chip :label="'Employee ID : ' + employee.id"></Chip>
    </div>
    <div class="flex flex-column gap-1 py-5">
      <div class="field grid">
        <label for="TotalTickets" class="col-12 font-bold">
          Total Tickets : {{ totalIssues }}
        </label>
      </div>
      <!--Open Issues Progress Bar-->
      <div class="field grid">
        <label for="Open" class="col-3 font-bold">Open</label>
        <div class="col-9 md:col-9">
          <ProgressBar
            class="openIssuesProgressbar"
            :value="(issues.openIssues / totalIssues) * 100"
            >{{ issues.openIssues }}
          </ProgressBar>
        </div>
      </div>
      <!--In Progress Issues Progress Bar-->
      <div class="field grid">
        <label for="In Progress" class="col-3 font-bold">InProgress</label>
        <div class="col-9 md:col-9">
          <ProgressBar
            class="inProgressIssuesProgressbar"
            :value="(issues.inProgressIssues / totalIssues) * 100"
            >{{ issues.inProgressIssues }}
          </ProgressBar>
        </div>
      </div>
      <!--Closed Issues Progress Bar-->
      <div class="field grid">
        <label for="Closed" class="col-3 font-bold">Closed</label>
        <div class="col-9 md:col-9">
          <ProgressBar
            class="closedIssuesProgressbar"
            :value="(issues.closedIssues / totalIssues) * 100"
            >{{ issues.closedIssues }}
          </ProgressBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const p = defineProps({
  employee: {
    type: Object,
    required: true,
  },
  issues: {
    type: Object as () => {
      openIssues: number;
      inProgressIssues: number;
      closedIssues: number;
    },
    required: true,
  },
});

const totalIssues = computed(
  () => p.issues.openIssues + p.issues.inProgressIssues + p.issues.closedIssues
);
</script>

<style scoped>
.p-card {
  margin: 15px;
  width: 500px;
}

:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(to right, #0e448a, #5790db);
}
</style>
