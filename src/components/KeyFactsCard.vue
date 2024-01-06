<template>
  <card class="key-facts-card shadow-4" style="background-color: #002869; color: #ffffffff">
    <template #title
      ><div class="flex flex-row justify-content-start">
        <span class="pi pi-key mr-3" style="font-size: 2rem; font-weight: 100"></span>
        <span class="text-xl mt-1"> Key Facts </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="total-assignee" class="col-9">Opened issues: </label>
        <div class="col-3">
          <span id="total-assignee">{{ project?.issues.length }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="average-assignee-resting-time" class="col-9">SLA rule complied (in %): </label>
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
