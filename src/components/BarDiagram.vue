<template>
  <Card>
    <template #title>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        Issues per status
        <MultiSelect
          v-model="selectedCategory"
          :options="categories"
          placeholder="Category"
          class="w-full md:w-14rem"
          id="category-select"
        />
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        <div class="text-sm text-gray-500">Total number of issues {{ totalNumberOfIssues }}</div>
      </div>
    </template>
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-100rem h-30rem" />
    </template>
  </Card>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, type Ref } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { getStatusesFromCategories } from '@/services/issueCalculator';
import { Category, getColorsforStatuses } from '@/assets/__mockdata__/StatusLists';

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
  },
});

const totalNumberOfIssues = computed(() =>
  Array.from(
    getStatusesFromCategories(props.project.issues, selectedCategory.value).values()
  ).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);

const chartData = computed(() => {
  const labels = Array.from(
    getStatusesFromCategories(props.project.issues, selectedCategory.value).keys()
  );
  const AllNumberOfIssues = Array.from(
    getStatusesFromCategories(props.project.issues, selectedCategory.value).values()
  );
  return {
    labels,
    datasets: [
      {
        label:
          selectedCategory.value === undefined ||
          JSON.stringify(selectedCategory.value) ===
            JSON.stringify(['planning', 'development', 'testing', 'nonDisplayed']) ||
          selectedCategory.value?.length === 0
            ? 'Issues'
            : selectedCategory.value?.join(', '),
        backgroundColor: getColorsforStatuses(labels),
        data: AllNumberOfIssues,
      },
    ],
  };
});

const chartOptions = ref({});

onMounted(() => {
  chartOptions.value = {
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
  };
});
</script>
