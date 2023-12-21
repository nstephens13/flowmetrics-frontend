<template>
  <card style="background-color: #ffffff; color: var(--flowMetricsBlue); width: 100%">
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" class="w-100rem h-20rem" />
    </template>
  </card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ProjectIF } from '@/model/ProjectIF';

const chartData = ref();
const chartOptions = ref();

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

defineProps({
  project: {
    type: Object as () => ProjectIF,
    required: true,
  },
});
onMounted(() => {
  chartData.value = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
        borderColor: documentStyle.getPropertyValue('--pink-500'),
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
  chartOptions.value = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
});
</script>
