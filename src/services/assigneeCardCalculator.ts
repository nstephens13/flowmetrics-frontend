import { Duration } from 'luxon';
import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { ProjectIF } from '@/model/ProjectIF';

/**
 * Function to calculate the average assignee resting time for the issues
 * @param issues the issues to calculate the average assignee resting time
 * @returns the average assignee resting time for the issues in duration format
 * @author Nived Stephen
 */
export function calculateAverageRestingTime(issues: IssueIF[]): Duration | null {
  if (!issues || issues.length === 0) return null;
  const totalRestingTime = issues.reduce((total, issue) => {
    if (
      issue.assigneeRestingTime !== null &&
      !statusLists[Category.nonDisplayed].includes(issue.status as string)
    ) {
      const duration = Duration.fromObject(issue.assigneeRestingTime);
      return total + duration.as('milliseconds');
    }
    return total;
  }, 0);

  const count = issues.reduce((totalCount, issue) => {
    if (
      issue.assigneeRestingTime !== null &&
      !statusLists[Category.nonDisplayed].includes(issue.status as string)
    ) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);

  return count > 0 ? Duration.fromMillis(totalRestingTime / count) : null;
}

/**
 * Function to get the number of assignees in a project
 * @param project the project to get the number of assignees
 * @returns the number of assignees in a project in number format
 * @author Nived Stephen
 */
export function getAssigneeCountFromIssues(project: ProjectIF): number {
  // we need to get the number of assignees from the issues and also remove duplicates
  if (!project || Object.keys(project).length === 0) return 0;
  let assigneeList: EmployeeIF[] = [];
  for (let i = 0; i < project.issues.length; ++i) {
    if (
      project.issues[i].assignedTo?.id !== null &&
      !statusLists[Category.nonDisplayed].includes(project.issues[i].status as string)
    ) {
      const assignedToId = project.issues[i].assignedTo?.id;
      if (assignedToId !== null) {
        assigneeList.push(assignedToId as unknown as EmployeeIF);
      }
    }
  }
  // remove duplicates
  assigneeList = assigneeList.filter((item, index) => assigneeList.indexOf(item) === index);
  return assigneeList.length;
}
