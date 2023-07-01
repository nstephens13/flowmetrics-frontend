<template>
    <Button class="generatePDF" label="Generate PDF" @click="generatePDF"></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import jsPDF from 'jspdf';

const generatePDF = () => {
  // Create a new PDF
  const doc = new jsPDF();
  // Document title
  doc.setFontSize(24);
  doc.text('SLA Rule Report', 10, 15);
  doc.save('SLARuleReport.pdf');
};
</script>
