<template>
  <Card
    class="assignee-card shadow-4"
    style="background-color: var(--flowMetricsBlue); color: #ffffffff"
  >
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="pi pi-users mr-3" style="font-size: 2rem; font-weight: 100"></span>
        <span class="text-xl mt-1"> Assigned employees </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="total-assignee" class="col-7">Total assigned employees :</label>
        <div class="col-5">
          <span id="total-assignee">{{ getAssigneeCountFromIssues(project) }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="average-assignee-resting-time" class="col-7">Average resting time :</label>
        <div class="col-5">
          <span id="average-assignee-resting-time">{{
            calculateAverageRestingTime(project?.issues)
          }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';
import {
  getAssigneeCountFromIssues,
  calculateAverageRestingTime,
} from '@/services/assigneeCardCalculator';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
