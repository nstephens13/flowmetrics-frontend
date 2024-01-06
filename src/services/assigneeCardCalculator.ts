import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ProjectIF } from '@/model/ProjectIF';

export function getAssigneeCountFromIssues(project: ProjectIF | undefined): number {
  // we need to get the number of assignees from the issues and also remove duplicates
  if (!project) return 0;
  let assigneeList: number[] = [];
  for (let i = 0; i < project.issues.length; ++i) {
    if (
      project.issues[i].assignedTo.id !== null &&
      !statusLists[Category.nonDisplayed].includes(project.issues[i].status)
    ) {
      assigneeList.push(project.issues[i].assignedTo.id as EmployeeIF);
    }
  }
  // remove duplicates
  assigneeList = assigneeList.filter((item, index) => assigneeList.indexOf(item) === index);
  return assigneeList.length;
}

export function getAverageAssigneeRestingTime(): string {
  // we need to get the average assignee resting time from the issues
  return '';
}
