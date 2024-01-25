import jsPDF from 'jspdf';
import { ref } from 'vue';
import autoTable from 'jspdf-autotable';
import type { IssueIF } from '@/model/Issue/IssueIF';
import slaRulesStore from '@/store/slaRulesStore';
import type { CategoryIF } from '@/model/Sla/CategoryIF';
import type { ProjectIF } from '@/model/ProjectIF';

const isGenerating = ref(false);

function getListOfSlaRulesThatApplyToIssue(issue: IssueIF, projectId: number): string[] {
  const slaCategories: CategoryIF[] = slaRulesStore().getCategoriesContainingProject(projectId);
  const slaRules: string[] = [];
  slaCategories.forEach((category) => {
    // check if rule attributes like issueType, priority, status, state, etc. match the issue
    // push the name of the category to the slaRules array
    category.rules.forEach((rule) => {
      if (rule.issueType === issue.issueType) {
        if (category.name != null) {
          slaRules.push(`${category.name}-${rule.name}`);
        }
      }
    });
  });
  return slaRules;
}

const GeneratePdf = (project: ProjectIF) => {
  if (isGenerating.value) {
    return; // Do nothing if a PDF is already being generated
  }
  // Disable the button
  isGenerating.value = true;
  const issues = project.issues as IssueIF[];

  // Create a new PDF
  const doc = new jsPDF('landscape', 'mm', 'a4');

  const headerNames = [
    { id: 'ID', name: 'Name', description: 'Description', assignedSlaRule: 'Assigned SLA Rules' },
  ];

  // create an array of issues with id as key and name and description as value and the sla rule assigned to it
  const issueArray = issues.map((issue) => [
    issue.id,
    issue.name,
    issue.description,
    getListOfSlaRulesThatApplyToIssue(issue, project.id),
  ]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  // Document title
  doc.setFont('Helvetica', '', 'bold');
  doc.setFontSize(14);
  doc.text('Sla Rule Report', 10, 10);
  doc.text(date, 265, 10);
  // doc.line(10, 20, 287, 20);
  // Document content
  doc.text('', 10, 30);
  autoTable(doc, {
    head: headerNames,
    body: issueArray,
  });
  doc.save('SlaRuleReport.pdf');
  // Enable the button after a 1-second delay
  setTimeout(() => {
    isGenerating.value = false;
  }, 1000); // 1 seconds (1000 milliseconds)
};

export default GeneratePdf;
