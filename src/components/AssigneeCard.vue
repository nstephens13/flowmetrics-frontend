<template>
  <card class="assignee-card border-3 p-0" style="border-color: #4b8bf2">
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="pi pi-users mr-3" style="font-size: 2rem; font-weight: 100"></span>
        <span class="text-xl mt-1"> Assignee </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="total-assignee" class="col-9">Total assignees :</label>
        <div class="col-3">
          <span id="total-assignee">{{ project?.issues.length }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="average-assignee-resting-time" class="col-9"
          >Average assignee resting time :</label
        >
        <div class="col-3">
          <span id="average-assignee-resting-time">{{
            getPercentageSlaRulesComplied(project)
          }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import getPercentageSlaRulesComplied from '@/services/keyFactsCalculator';
import type { ProjectIF } from '@/model/ProjectIF';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
