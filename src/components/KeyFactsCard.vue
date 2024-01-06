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
        <label for="average-solving-time" class="col-9">Average solving time: </label>
        <div class="col-3">
          <span id="average-solving-time">{{ project?.issues.length }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="sla-rule-complied" class="col-9">SLA rule complied (in %): </label>
        <div class="col-3">
          <span id="sla-rule-complied">{{ getPercentageSlaRulesComplied(project) }}</span>
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
