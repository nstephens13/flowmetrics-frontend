<template>
  <card class="issues-card shadow-3">
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
      <div class="flex flex-column gap-1 mr-4">
        <!--open Issues Progress Bar-->
        <div class="field mb-0">
          <label class="mb-2 font-semibold" for="planningProgressbar">{{
            Category.planning
          }}</label>
          <div>
            <ProgressBar
              class="planningProgressbar"
              id="planningProgressbar"
              :value="
                (getIssueCountfromCategory(Category.planning, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountfromCategory(Category.planning, project) }}
            </ProgressBar>
          </div>
        </div>
        <!--in progress Issues Progress Bar-->
        <div class="field mb-0">
          <label class="mb-2 font-semibold" for="planningProgressbar">{{
            Category.development
          }}</label>
          <div>
            <ProgressBar
              class="developmentProgressbar"
              id="developmentProgressbar"
              :value="
                (getIssueCountfromCategory(Category.development, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountfromCategory(Category.development, project) }}
            </ProgressBar>
          </div>
        </div>
        <!--Closed Issues Progress Bar-->
        <div class="field mb-0">
          <label class="mb-2 font-semibold" for="planningProgressbar">{{ Category.testing }}</label>
          <div>
            <ProgressBar
              class="testingProgressbar"
              id="testingProgressbar"
              :value="
                (getIssueCountfromCategory(Category.testing, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountfromCategory(Category.testing, project) }}
            </ProgressBar>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';
import { getIssueCountfromCategory, getOpenIssueCount } from '@/services/issuesCardCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

defineProps({
  project: Object as () => ProjectIF,
});
</script>

<style scoped>
:deep(.developmentProgressbar .p-progressbar-value) {
  background: linear-gradient(to right, #515f68, #748696);
}
:deep(.planningProgressbar .p-progressbar-value) {
  background: linear-gradient(to right, #1961be, #69a5f3);
}
:deep(.testingProgressbar .p-progressbar-value) {
  background: linear-gradient(to right, #6d6172, #b595bb);
}
</style>
