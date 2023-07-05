<template>
  <Button class="generatePDF" label="Generate PDF" @click="generatePDF"></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import jsPDF from 'jspdf';
import type { ProjectIF } from '@/model/ProjectIF';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
</script>

<script lang="ts">
import getMockData from "@/assets/__mockdata__/mockDataComposer";

const props = defineProps({
  slaRule: {
    type: Object,
    required: true,
  },
  issue: {
    type: Object,
    required: true,
  },
});

const project = getMockData(7);

const generatePDF = () => {
  // Create a new PDF
  const doc = new jsPDF();
  // Get needed objects
  const issues = getMockData();
  // Document title
  doc.setFontSize(24);
  doc.text('SLA Rule Report', 10, 15);
  doc.text('SLA Rule', 10, 25);
  doc.save('SLARuleReport.pdf');
};
</script>
