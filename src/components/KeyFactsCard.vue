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
        <label for="average-solving-time" class="col-7">Average solving time: </label>
        <div class="col-5">
          <span id="average-solving-time">{{ calculateAverageSolvingTime(project?.issues) }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="sla-rule-complied" class="col-7">SLA rule complied (in %): </label>
        <div class="col-5">
          <span id="sla-rule-complied">{{ getPercentageSlaRulesComplied(project) }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import {
  getPercentageSlaRulesComplied,
  calculateAverageSolvingTime,
} from '@/services/keyFactsCalculator';
import type { ProjectIF } from '@/model/ProjectIF';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
