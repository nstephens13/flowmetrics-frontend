<template>
  <card
    class="status-resting-time-card shadow-4"
    style="background-color: #4b8bf2; color: #ffffffff"
  >
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="pi pi-clock mr-3" style="font-size: 2rem; font-weight: 100"></span>
        <span class="text-xl mt-1"> State resting time </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="planning" class="col-7">Planning :</label>
        <div class="col-5">
          <span id="planning">{{
            calculateStateAverageRestingTime(project?.issues, Category.planning)
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="development" class="col-7">Development :</label>
        <div class="col-5">
          <span id="development">{{
            calculateStateAverageRestingTime(project?.issues, Category.development)
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="testing" class="col-7">Testing :</label>
        <div class="col-5">
          <span id="testing">{{
            calculateStateAverageRestingTime(project?.issues, Category.testing)
          }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import calculateStateAverageRestingTime from '@/services/stateRestingTimeCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
