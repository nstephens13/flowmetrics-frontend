<template>
  <card class="assignee-card border-3 p-0" style="border-color: #4b8bf2">
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="mr-3" style="font-size: 1.75rem">{{ project?.issues.length }}</span>
        <span class="text-xl mt-2">Total issues </span>
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
