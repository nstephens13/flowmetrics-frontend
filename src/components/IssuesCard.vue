<template>
  <card class="issues-card shadow-4" style="background-color: #0448b5; color: #ffffffff">
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span
          class="mr-3"
          style="font-size: 1.75rem; font-weight: 400; width: 32px; height: 32px"
          >{{ getOpenIssueCount(project) }}</span
        >
        <span class="text-xl mt-1">Open issues </span>
      </div>
    </template>
    <template #content>
      <div class="field grid mb-0">
        <label for="planning" class="col-9">Planning :</label>
        <div class="col-3">
          <span id="planning">{{ getIssueCountfromCategory(Category.planning, project) }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="development" class="col-9">Development :</label>
        <div class="col-3">
          <span id="development">{{
            getIssueCountfromCategory(Category.development, project)
          }}</span>
        </div>
      </div>
      <div class="field grid mb-0">
        <label for="testing" class="col-9">Testing :</label>
        <div class="col-3">
          <span id="testing">{{ getIssueCountfromCategory(Category.testing, project) }}</span>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { getIssueCountfromCategory, getOpenIssueCount } from '@/services/issuesCardCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

defineProps({
  project: Object as () => ProjectIF,
});
</script>
