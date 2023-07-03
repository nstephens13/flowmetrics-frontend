<template>
  <div class="card">
    <div class="flex flex-wrap align-items-center justify-content-start gap-1">
      <Avatar
        :label="employee.firstName.charAt(0) + employee.lastName.charAt(0)"
        class="mr-2"
        size="large"
        style="background-color: #2d6dc1; color: #ffffff"
      />
      <h3 class="EmployeeName" style="margin-right: auto">{{
        employee.firstName + ' ' + employee.lastName
      }}</h3>
      <Chip :label="'Employee ID : ' + employee.id"></Chip>
    </div>
    <div class="flex flex-column gap-1 mt-2">
      <div class="field mb-0">
        <label for="TotalTickets" class="col-12 font-bold">
          Total Tickets : {{ totalIssues }}
        </label>
      </div>
      <!--Open Issues Progress Bar-->
      <div class="field mb-0">
        <label class="mb-2 font-semibold" for="planningProgressbar">{{
          categoryNames.firstCategory
        }}</label>
        <div class="">
          <ProgressBar
            class="planningProgressbar"
            id="planningProgressbar"
            :value="(issues.planning / totalIssues) * 100"
            >{{ issues.planning }}
          </ProgressBar>
        </div>
      </div>
      <!--In Progress Issues Progress Bar-->
      <div class="field mb-0">
        <label class="mb-2 font-semibold" for="developmentProgressbar">{{
          categoryNames.secondCategory
        }}</label>
        <div class="">
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
        <div class="">
          <ProgressBar
            class="testingProgressbar"
            id="testingProgressbar"
            :value="(issues.testing / totalIssues) * 100"
            >{{ issues.testing }}
          </ProgressBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const p = defineProps({
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

const totalIssues = computed(() => p.issues.planning + p.issues.development + p.issues.testing);
</script>

<style scoped>
.p-card {
  margin: 15px;
  width: 500px;
}

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
