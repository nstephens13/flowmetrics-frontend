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
const slaRulesSet: Set<SLARule> = new Set<SLARule>();

issues.forEach((issue) => {
  if (issue.assignedSLARule != null) {
    slaRulesSet.add(issue.assignedSLARule);
  }
});

const generatePDF = () => {
  // Create a new PDF
  const doc = new jsPDF('landscape', 'mm', 'a4');
  // Attributes needed for the PDF
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`;
  doc.setProperties(issues, slaRulesSet);
  // Document setup
  // doc.setFont('Helvetica'); -> does not work
  // Document title
  doc.setFontSize(16);
  doc.text('SLA Rule Report', 10, 15);
  doc.text(date, 265, 15);
  doc.line(10, 20, 287, 22);
  // Document content
  doc.setFontSize(12);
  let ySLA = 30;
  let yIssue = 30;
  slaRulesSet.forEach((slaRule) => {
    doc.text(`SLA Rule ID: ${slaRule.id} Name: ${slaRule.name}`, 10, (ySLA += 10));
    issues.forEach((issue) => {
      doc.text(`Issue ID: ${issue.id}`, 10, (yIssue += 10));
      // if issues at the end of the page
      // doc.addPage('landscape', 'mm', 'a4');
    });
  });
  doc.save('SLARuleReport.pdf');
};
</script>

<style scoped>
.generatePDF {
  background-color: mediumseagreen;
}
</style>
