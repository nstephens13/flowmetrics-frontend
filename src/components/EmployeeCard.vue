<template>
  <div class="grid">
    <div class="flex align-items-center justify-content-center col-2">
      <Avatar :label="employee.firstName.charAt(0) + employee.lastName.charAt(0)" class="mr-2" size="large"
        style="background-color:#2196F3; color: #ffffff" />
    </div>
    <div class="col-6">
      <h3>{{ employee.firstName + " " + employee.lastName }}</h3>
    </div>
    <div class="flex align-items-center align-content-left col-4">
      <Chip :label="'Employee ID : ' + employee.id"></Chip>
    </div>
  </div>
  <div class="">
    <!-- <p>Total Tickets : {{issues.openIssues + issues.inProgressIssues + issues.closedIssues}}</p> -->
  </div>
  <Divider />
  <div class="flex-none flex flex-column gap-2">
    <div class="grid">
      <label for="Open" class="col-3">Open</label>
      <div class="col-9 md:col-9">
        <ProgressBar :value="issues.openIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.openIssues }}/{{ issues.openIssues + issues.inProgressIssues + issues.closedIssues }}
        </ProgressBar>
      </div>
    </div>
    <div class="grid">
      <label for="In Progress" class="col-3">In Progress</label>
      <div class="col-9 md:col-9">
        <ProgressBar
          :value="issues.inProgressIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.inProgressIssues }}/{{ issues.openIssues + issues.inProgressIssues + issues.closedIssues }}
        </ProgressBar>
      </div>
    </div>
    <div class="field grid">
      <label for="Closed" class="col-3">Closed</label>
      <div class="col-9 md:col-9">
        <ProgressBar :value="issues.closedIssues / (issues.openIssues + issues.inProgressIssues + issues.closedIssues) * 100">
          {{ issues.closedIssues }}/{{ issues.openIssues + issues.inProgressIssues + issues.closedIssues }}
        </ProgressBar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const AvatarLabel = ref();
const props = defineProps({
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
</style>
