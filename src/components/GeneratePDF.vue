<template>
  <Button
    label="Generate PDF"
    @click="generatePDF"
    style="background-color: var(--flowMetricsBlue)"
  ></Button>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import jsPDF from 'jspdf';
import { ref } from 'vue';
import autoTable from 'jspdf-autotable';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/IssueIF';
import { hasSLARule, printSLARuleNames } from '@/model/IssueIF';

const isGenerating = ref(false);
const project = getMockData(7) as ProjectIF;
const issues = project.issues as IssueIF[];

const generatePDF = () => {
  if (isGenerating.value) {
    return; // Do nothing if a PDF is already being generated
  }
  // Disable the button
  isGenerating.value = true;

  // Create a new PDF
  const doc = new jsPDF('landscape', 'mm', 'a4');

  const headerNames = [
    { id: 'ID', name: 'Name', description: 'Description', assignedSLARule: 'Assigned SLA Rule' },
  ];

  const issueArray = issues.map((issue) => [
    issue.id,
    issue.name,
    issue.description,
    hasSLARule(issue) ? printSLARuleNames(issue) : 'No SLA Rules assigned',
  ]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  // Document title
  doc.setFont('Helvetica', '', 'bold');
  doc.setFontSize(14);
  doc.text('SLA Rule Report', 10, 10);
  doc.text(date, 265, 10);
  // doc.line(10, 20, 287, 20);
  // Document content
  doc.text('', 10, 30);
  autoTable(doc, {
    head: headerNames,
    body: issueArray,
  });
  doc.save('SLARuleReport.pdf');
  // Enable the button after a 1-second delay
  setTimeout(() => {
    isGenerating.value = false;
  }, 1000); // 1 seconds (1000 milliseconds)
};
</script>

<style scoped></style>
