<template>
  <Button class="generatePDF" label="Generate PDF" @click="generatePDF"></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import jsPDF from 'jspdf';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/IssueIF';
import type { SLARule } from '@/model/SLARule';

const project = getMockData(7) as ProjectIF;
const issues = project.issues as IssueIF[];
const slaRule = issues.assignedSLARule as SLARule;

const generatePDF = () => {
  // Create a new PDF
  const doc = new jsPDF();
  // Document title
  doc.setFontSize(24);
  doc.text('SLA Rule Report', 10, 15);
  // Document content
  project.issues.forEach((issue) => {
    doc.setFontSize(18);
    doc.text('SLA Rule 1', 10, 25);
    doc.text({ issues }, 10, 30);
  });
  doc.save('SLARuleReport.pdf');
};
</script>
