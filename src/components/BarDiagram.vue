<template>
  <Card class="visualisation-card" style="width: 100%; height: 100%">
    <template #title>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        Issues per status
        <MultiSelect
          ref="multiselect"
          v-model="selectedCategory"
          :options="categories"
          placeholder="Category"
          class="multiselect-container w-full md:w-14rem"
        />
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        <div class="text-sm text-gray-500">Total number of issues {{ totalNumberOfIssues }}</div>
      </div>
    </template>
    <template #content>
      <Chart
        ref="issueChart"
        id="issueChart"
        type="bar"
        :data="chartData"
        :options="chartOptions"
        style="height: 100%; width: 100%"
      />
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { getStatusesFromCategories } from '@/services/issueCalculator';
import { Category, getColorsforStatuses } from '@/assets/__mockdata__/IssueProps/statusLists';
import type { IssueIF } from '@/model/Issue/IssueIF';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
const categories: string[] = [
  Category.planning,
  Category.development,
  Category.testing,
  Category.nonDisplayed,
];

const selectedCategory: Ref<Category[] | undefined> = ref();
const props = defineProps({
  project: {
    type: Object as () => ProjectIF,
    required: true,
    default: () =>
      ({
        id: 0 as number,
        name: '' as string,
        description: '' as string,
        issues: [] as IssueIF[],
        slaSubscriber: null,
      } as ProjectIF),
  },
});

const totalNumberOfIssues = computed(() =>
  Array.from(
    getStatusesFromCategories(props.project.issues, selectedCategory.value).values()
  ).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);

const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: textColor,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: textColorSecondary,
      },
      grid: {
        color: surfaceBorder,
      },
    },
  },
  animation: false,
});

const labels: ComputedRef<string[]> = computed(() =>
  Array.from(getStatusesFromCategories(props.project.issues, selectedCategory.value).keys())
);

const AllNumberOfIssues = computed(() =>
  Array.from(getStatusesFromCategories(props.project.issues, selectedCategory.value).values()).map(
    String
  )
);

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label:
        selectedCategory.value === undefined || selectedCategory.value?.length === 0
          ? 'Issues'
          : selectedCategory.value?.join(', '),
      backgroundColor: getColorsforStatuses(labels.value),
      data: AllNumberOfIssues.value,
    },
  ],
}));

// re-render chart on window resize
window.visualViewport?.addEventListener('resize', () => {
  // re-render chart
  chartOptions.value = { ...chartOptions.value };
});
</script>
