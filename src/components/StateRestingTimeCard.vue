<template>
  <card class="status-resting-time-card shadow-3">
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="pi pi-clock mr-3" style="font-size: 2rem; font-weight: 100"></span>
        <span class="text-xl mt-1"> State resting time </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label class="col-7 mb-4 font-semibold" for="average">Average resting time</label>
        <div class="col-5">
          <span id="average">{{
            calculateAverageRestingTime(project?.issues)?.toFormat("d 'days' h 'hours'").toString()
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label class="col-7 mb-2 font-semibold" for="planning"
          >{{ Category.planning }}
          <div class="ml-2" :style="{ color: getTextColor(Category.planning) }">
            {{ getPercentOfIncreaseOrDecrease(project?.issues, Category.planning) }}
          </div>
        </label>
        <div class="col-5">
          <span id="planning">{{
            calculateStateAverageRestingTime(project?.issues, Category.planning)
              ?.toFormat("d 'days' h 'hours'")
              .toString()
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label class="col-7 mb-2 font-semibold" for="development"
          >{{ Category.development }}
          <div class="ml-2" :style="{ color: getTextColor(Category.development) }">
            {{ getPercentOfIncreaseOrDecrease(project?.issues, Category.development) }}
          </div></label
        >
        <div class="col-5">
          <span id="development">{{
            calculateStateAverageRestingTime(project?.issues, Category.development)
              ?.toFormat("d 'days' h 'hours'")
              .toString()
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label class="col-7 mb-2 font-semibold" for="testing"
          >{{ Category.testing
          }}<div class="ml-2" :style="{ color: getTextColor(Category.testing) }">
            {{ getPercentOfIncreaseOrDecrease(project?.issues, Category.testing) }}
          </div></label
        >
        <div class="col-5">
          <span id="testing">{{
            calculateStateAverageRestingTime(project?.issues, Category.testing)
              ?.toFormat("d 'days' h 'hours'")
              .toString()
          }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';
import {
  calculateStateAverageRestingTime,
  calculateAverageRestingTime,
  getPercentOfIncreaseOrDecrease,
} from '@/services/stateRestingTimeCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

defineProps({
  project: Object as () => ProjectIF,
});
</script>

<script lang="ts">
export default {
  methods: {
    getTextColor(category: Category): string {
      const percent = getPercentOfIncreaseOrDecrease(this.project?.issues, category) as string;
      return percent.includes('+') ? 'red' : '#02f517';
    },
  },
};
</script>
