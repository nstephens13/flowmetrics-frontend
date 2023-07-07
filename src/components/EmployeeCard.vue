<template>
  <div class="flex flex-column">
    <div class="flex align-items-center justify-content-center">
      <Avatar
        :label="employee.firstName.charAt(0) + employee.lastName.charAt(0)"
        size="large"
        style="background-color: #2d6dc1; color: #ffffff"
      />
    </div>
    <div class="flex align-items-center justify-content-center">
      <label class="font-bold text-xl my-1" id="firstName" style="white-space: nowrap">
        {{ employee.firstName }}
      </label>
    </div>
    <div class="flex align-items-center justify-content-center">
      <label class="font-bold text-xl mb-1" id="lastName" style="white-space: nowrap">
        {{ employee.lastName }}
      </label>
    </div>
    <div class="flex align-items-center justify-content-center" style="white-space: nowrap">
      <label id="ticketCount"> Total issues: {{ totalIssues }} </label>
    </div>
  </div>
  <div class="flex flex-column gap-1 mt-2">
    <!--Open Issues Progress Bar-->
    <div class="field mb-0">
      <label class="mb-2 font-semibold" for="planningProgressbar">{{
        categoryNames.firstCategory
      }}</label>
      <div>
        <ProgressBar
          class="planningProgressbar"
          id="planningProgressbar"
          :value="(issues.planning / totalIssues) * 100"
          >{{ issues.planning }}
        </ProgressBar>
      </div>
    </div>
    <!--In progress Issues Progress Bar-->
    <div class="field mb-0">
      <label class="mb-2 font-semibold" for="developmentProgressbar">{{
        categoryNames.secondCategory
      }}</label>
      <div>
        <ProgressBar
          class="developmentProgressbar"
          id="developmentProgressbar"
          :value="(issues.development / totalIssues) * 100"
          >{{ issues.development }}
        </ProgressBar>
      </div>
    </div>
    <!--Closed Issues Progress Bar-->
    <div class="field mb-0">
      <label class="mb-2 font-semibold" for="testingProgressbar">{{
        categoryNames.thirdCategory
      }}</label>
      <div>
        <ProgressBar
          class="testingProgressbar"
          id="testingProgressbar"
          :value="(issues.testing / totalIssues) * 100"
          >{{ issues.testing }}
        </ProgressBar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define the props for the component
const prop = defineProps({
  employee: {
    type: Object,
    required: true,
  },
  issues: {
    type: Object as () => {
      planning: number;
      development: number;
      testing: number;
    },
    required: true,
  },
  categoryNames: {
    type: Object as () => {
      firstCategory: string;
      secondCategory: string;
      thirdCategory: string;
    },
    required: true,
  },
});
// Calculate the total number of issues by summing up the counts in the 'issues' prop
const totalIssues = computed(() => prop.issues.planning + prop.issues.development + prop.issues.testing);
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
