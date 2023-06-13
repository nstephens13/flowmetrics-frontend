<script setup>
import { ref, onMounted } from 'vue';
import { DataTable, Column, Chart } from 'primevue/datatable';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Issue from '/model/Issue';
import {
  getArrayOfIssues,
  getTimeLeft,
  // getFormattedDate,
  getAssignedToName,
  getStatus,
  getTicketID,
  countClosedIssues,
  countInProgressIssues,
  countOpenIssues,
} from '@/model/Issue';

</script>
<script>

const chartData = ref();
const chartOptions = ref({
  cutout: '60%',
});

const setChartData = () => {
  // const documentStyle = getComputedStyle(document.body);

  const generateChartData = () => {
    const number1 = countOpenIssues();
    const number2 = countInProgressIssues();
    const number3 = countClosedIssues();
    return [number1, number2, number3];
  };

  const data = generateChartData();
  const total = ref(calculateTotal(data));

  return {
    labels: ['Open', 'InProgress', 'Closed'],
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(51, 102, 255, 1)', // Blue
          'rgba(0, 123, 255, 1)', // Light Blue
          'rgba(0, 204, 255, 1)', // Cyan
        ],
        hoverBackgroundColor: [
          'rgba(51, 102, 255, 0.8)', // Blue (slightly lighter)
          'rgba(0, 123, 255, 0.8)', // Light Blue (slightly lighter)
          'rgba(0, 204, 255, 0.8)', // Cyan (slightly lighter)
        ],
      },
    ],
    total: total.value,
  };
};

onMounted(() => {
  chartData.value = setChartData();
  this.total = calculateTotal(chartData.value.datasets[0].data);
});

export default {
  name: 'TicketCalculator',
  data() {
    return {
      issues: [],
      chartData: chartData.value,
      chartOptions: chartOptions.value,
      total: 0,
    };
  },
  created() {
    this.issues = getArrayOfIssues();
  },
  mounted() {
    chartData.value = setChartData();
    this.total = calculateTotal(chartData.value.datasets[0].data);
  },
  methods: {
    calculateTotal(data) {
      return data.reduce((total, value) => total + value, 0);
    },
  },
};
</script>

<template>

  <div class="Issue">
    <div class="column-table">
      <DataTable :value="issues" tableStyle="min-width: 50rem">
        <Column :field="getTicketID()" header="ID" sortable style="width: 25%"></Column>
        <Column :field="getAssignedToName()" header="Assignee" sortable style="width: 25%"></Column>
        <Column :field="getStatus()" header="Status" sortable style="width: 25%"></Column>
        <Column :field="getTimeLeft()" header="Due To" sortable style="width: 25%"
       :headerClass="'red-text'"
       :bodyClass="'red-text'">
        </Column>
    :headerClass="'red-text'"
    :bodyClass="'red-text'">
        </DataTable>
    </div>
    <div class="column-chart">
      <div class="chart-container">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
        <div class="chart-legend">
          <div v-for="(label, index) in chartData.labels" :key="index" class="chart-legend-item">
            <div class="legend-color" :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] }"></div>
            <div class="legend-label">{{ label }}</div>
            <div class="legend-value">{{ chartData.datasets[0].data[index] }}</div>
          </div>
        </div>
      </div>
      <div class="total-number">{{ total }}</div>
    </div>
  </div>
</template>

<style>

.Issue {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .column-table {
    flex-basis: 75%;
    margin-right: 16px; /* Adjust the margin as needed */
  }

  .column-chart {
    flex-basis: 25%;
  }

  .card {
    display: flex;
    align-items: center;
  }

  .chart-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chart-legend {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }

  .chart-legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .legend-color {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }

  .legend-label {
    margin-right: 8px;
  }

  .total-number {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-left: 16px;
  }
</style>
