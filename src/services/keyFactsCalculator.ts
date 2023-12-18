import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';

export function getNumberOfIssues(project: ProjectIF): number {
  if (!project) return 0;
  return project.issues.length;
}

function numberOfFulfilledSlaRules(issue: IssueIF): number {
  if (!issue.assignedSlaRule) return 0;
  let count = 0;
  for (let i = 0; i < issue.assignedSlaRule.length; ++i) {
    if ((issue.assignedSlaRule[i].expirationDate ?? new Date(0)).valueOf() > new Date().valueOf()) {
      count += 1;
    }
  }
  return count;
}

function getNumberOfSlaRulesOfProject(project: ProjectIF): number {
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    count += project.issues[i]?.assignedSlaRule?.length ?? 0;
  }
  return count;
}

export function getPercentageSlaRulesComplied(project: ProjectIF): number {
  if (!project || getNumberOfSlaRulesOfProject(project) === 0) return 0;
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    count += numberOfFulfilledSlaRules(project.issues[i]);
  }
  return (count / getNumberOfSlaRulesOfProject(project)) * 100;
}
