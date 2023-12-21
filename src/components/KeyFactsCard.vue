<template>
  <card style="background-color: var(--flowMetricsBlue); color: #ffffffff; width: 400px">
    <template #title> Key Facts </template>
    <template #content>
      <div class="flex flex-row justify-content-between">
        <div class="flex flex-column mr-2">
          <div>Opened issues:</div>
          <div>SLA rule complied (in %): </div>
        </div>
        <div class="flex flex-column">
          <div class="font-bold">{{ project?.issues.length }}</div>
          <div class="font-bold">{{ getPercentageSlaRulesComplied(project) }}</div>
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
