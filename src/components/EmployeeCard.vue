<template>
  <div class="grid">
    <div class="flex align-items-center justify-content-center col-2">
      <Avatar :label="employee.firstName.charAt(0) + employee.lastName.charAt(0)" class="mr-2" size="large"
        style="background-color:#2d6dc1; color: #ffffff" />
    </div>
    <div class="col-6">
      <h3 class="Name">{{ employee.firstName + " " + employee.lastName }}</h3>
    </div>
    <div class="flex align-items-center align-content-left col-4">
      <Chip :label="'Employee ID : ' + employee.id"></Chip>
    </div>
  </div>
  <Divider />
  <div class="flex-none flex flex-column gap-2">
    <div class="grid">
      <label for="totaltickets" class="col-12 font-bold ">
        Total Tickets : {{ issues.openIssues + issues.inProgressIssues + issues.closedIssues }}
      </label>
      <label for="Open" class="col-3 font-bold">Open</label>
      <div class="col-9 md:col-9">
        <ProgressBar 
          class="openIssuesProgressbar"
          :value="issues.openIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.openIssues }}
        </ProgressBar>
      </div>
    </div>
    <div class="grid">
      <label for="In Progress" class="col-3 font-bold">In Progress</label>
      <div class="col-9 md:col-9">
        <ProgressBar
        class="inProgressIssuesProgressbar"
          :value="issues.inProgressIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.inProgressIssues }}
        </ProgressBar>
      </div>
    </div>
    <div class="field grid">
      <label for="Closed" class="col-3 font-bold">Closed</label>
      <div class="col-9 md:col-9">
        <ProgressBar
        class="closedIssuesProgressbar"
          :value="issues.closedIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.closedIssues }}
        </ProgressBar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  employee: {
    type: Object,
    required: true
  },
  issues: {
    type: Object as () => { openIssues: number; inProgressIssues: number; closedIssues: number },
    required: true
  }
})
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