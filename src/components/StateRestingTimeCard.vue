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
        <label for="planning" class="col-9">Planning :</label>
        <div class="col-3">
          <span id="planning">{{ project?.issues.length }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="development" class="col-9">Development :</label>
        <div class="col-3">
          <span id="development">{{ project?.issues.length }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="testing" class="col-9">Testing :</label>
        <div class="col-3">
          <span id="testing">{{ project?.issues.length }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
