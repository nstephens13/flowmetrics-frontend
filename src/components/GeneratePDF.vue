<template>
  <Button class="generatePDF" label="Generate PDF" @click="generatePDF"></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/IssueIF';
import type { SLARule } from '@/model/SLARule';

const project = getMockData(7) as ProjectIF;
const issues = project.issues as IssueIF[];
const slaRulesSet: Set<SLARule> = new Set<SLARule>();

issues.forEach((issue) => {
  if (issue.assignedSLARule != null) {
    slaRulesSet.add(issue.assignedSLARule);
  }
});

const generatePDF = () => {
  // Create a new PDF
  const doc = new jsPDF('landscape', 'mm', 'a4');

  const headerNames = [['ID', 'Name', 'Description', 'Assigned SLA Rule']];
  const issueArray = issues.map((issue) => [
    issue.id,
    issue.name,
    issue.description,
    issue.assignedSLARule,
  ]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`;
  // doc.setProperties(issues, slaRulesSet); -> is this right?
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
};
</script>

<style scoped>
.generatePDF {
  background-color: mediumseagreen;
}
</style>
