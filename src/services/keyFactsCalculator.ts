import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';

function numberOfFulfilledSlaRules(issue: IssueIF): number {
  if (!issue.assignedSlaRule) return 0;
  let count = 0;
  for (let i = 0; i < issue.assignedSlaRule.length; ++i) {
    let compareTime;
    if (issue.closedAt == null) compareTime = new Date();
    else compareTime = issue.closedAt;
    if (
      (issue.assignedSlaRule[i].expirationDate ?? new Date(0)).valueOf() > compareTime.valueOf()
    ) {
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

export default function getPercentageSlaRulesComplied(project: ProjectIF): number {
  if (!project || getNumberOfSlaRulesOfProject(project) === 0) return 0;
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    count += numberOfFulfilledSlaRules(project.issues[i]);
  }
  return Math.trunc((count / getNumberOfSlaRulesOfProject(project)) * 100);
}
