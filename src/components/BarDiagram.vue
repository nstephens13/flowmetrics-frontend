<template>
  <card style="background-color: #ffffff; color: var(--flowMetricsBlue); width: 100%">
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-100rem h-30rem" />
    </template>
  </card>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';
import { getStatusesfromIssues } from '@/services/issueCalculator';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const props = defineProps({
  project: {
    type: Object as () => ProjectIF,
    required: true,
  },
});

const chartOptions = ref({});

const chartData = computed(() => {
  const labels = Array.from(getStatusesfromIssues(props.project.issues).keys());
  const AllNumberOfIssues = Array.from(getStatusesfromIssues(props.project.issues).values());
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
