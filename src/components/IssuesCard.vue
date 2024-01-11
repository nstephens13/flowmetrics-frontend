<template>
  <card class="issues-card shadow-3">
    <template #title>
      <div class="flex flex-row justify-content-start">
        <span class="mr-3 text-3xl font-semibold" style="width: 32px; height: 32px">{{
          getOpenIssueCount(project)
        }}</span>
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
                (getIssueCountFromCategory(Category.planning, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountFromCategory(Category.planning, project) }}
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
                (getIssueCountFromCategory(Category.development, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountFromCategory(Category.development, project) }}
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
                (getIssueCountFromCategory(Category.testing, project) /
                  getOpenIssueCount(project)) *
                100
              "
              >{{ getIssueCountFromCategory(Category.testing, project) }}
            </ProgressBar>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import type { ProjectIF } from '@/model/ProjectIF';
import { getIssueCountFromCategory, getOpenIssueCount } from '@/services/issuesCardCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

defineProps({
  project: {
    type: Object as () => ProjectIF,
    required: true,
    default: () => ({} as ProjectIF),
  },
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
