<template>
  <card style="background-color: var(--flowMetricsBlue); color: #ffffffff">
    <template #title> Key Facts </template>
    <template #content>
      <div> Opened issues: {{ getNumberOfIssues(project) }} </div>
      <div> Complied SLA Rules: {{ getPercentageSlaRulesComplied(project) }}%</div>
    </template>
  </card>
</template>

<script setup lang="ts">
import { getNumberOfIssues, getPercentageSlaRulesComplied } from '@/services/keyFactsCalculator';
import type { ProjectIF } from '@/model/ProjectIF';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
