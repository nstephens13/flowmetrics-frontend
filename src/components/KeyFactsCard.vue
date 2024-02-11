<template>
  <card class="key-facts-card shadow-3">
    <template #title
      ><div class="flex flex-row justify-content-start">
        <span class="pi pi-key mr-3 text-4xl"></span>
        <span class="text-xl mt-1"> Key facts </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="average-solving-time" class="col-7 mb-2 font-semibold"
          >Average solving time</label
        >
        <div class="col-5">
          <span id="average-solving-time">{{
            calculateAverageSolvingTime(project?.issues ?? [])
              ?.toFormat("d 'days' h 'hours'")
              .toString()
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="sla-rule-complied" class="col-7 mb-2 font-semibold">Sla rule complied</label>
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
  project: {
    type: Object as () => ProjectIF,
    required: true,
    default: () => ({} as ProjectIF),
  },
});
</script>
