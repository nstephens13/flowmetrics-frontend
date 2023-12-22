<template>
  <card style="background-color: #ffffff; width: 100%">
    <template #title>
      <div class="flex flex-row align-content-center align-items-center justify-content-between">
        <p>Issues per Status</p>
        <MultiSelect
          v-model="selectedCategory"
          :options="categories"
          placeholder="Category"
          class="w-full md:w-14rem"
        />
      </div>
    </template>
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-100rem h-30rem" />
    </template>
  </card>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, type Ref } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { getStatusesFromCategories } from '@/services/issueCalculator';
import { Category } from '@/assets/__mockdata__/StatusLists';

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

const chartOptions = ref({});

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
        label: 'Issues',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        data: AllNumberOfIssues,
      },
    ],
  };
});

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
