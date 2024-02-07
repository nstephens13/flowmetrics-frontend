import type { ProjectIF } from '@/model/ProjectIF';
import { getProject } from '@/assets/__mockdata__/mockdata';
import type { IssueIF } from '@/model/Issue/IssueIF';
import { Issue } from '@/services/Issue';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';

function convertIsoToDate(isoDateString: Date): Date {
  return new Date(isoDateString);
}

function convertStatusChanges(statusChanges: ChangeLogIF[]): ChangeLogIF[] {
  return statusChanges.map((statusChange) => ({
    id: statusChange.id,
    created: convertIsoToDate(statusChange.created as Date),
    author: statusChange.author,
    changes: statusChange.changes,
  }));
}

/**
 * Function to fetch a project from the backend server
 * @param projectId the id of the project to be fetched
 * @returns {Promise<ProjectIF>} will return the project as a ProjectIF or a rejected promise
 * @throws {Error} gets Project from mock data if response is unsuccessful
 * @author Nived Stephen
 */
export default async function fetchProject(projectId: number): Promise<ProjectIF> {
  let projectIdToBeFetched = projectId;
  if (projectIdToBeFetched === 0 || projectIdToBeFetched > 20) {
    projectIdToBeFetched = 1;
  }
  const endpoint = `/api/project/${projectIdToBeFetched}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const issues = data.issues.map(
      (issue: IssueIF) =>
        new Issue(
          issue.id,
          issue.name,
          issue.description,
          issue.priority,
          issue.issueType,
          issue.assignedTo,
          issue.createdBy as EmployeeIF,
          convertIsoToDate(issue.createdAt as Date),
          issue.closedAt ? convertIsoToDate(issue.closedAt) : null,
          issue.dueTo ? convertIsoToDate(issue.dueTo) : null,
          issue.status,
          issue.assigneeRestingTime,
          issue.statusRestingTime,
          convertStatusChanges(issue.statusChanges),
          issue.assigneeChanges,
          issue.state
        ) as IssueIF
    );

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      issues,
    } as ProjectIF;
  } catch (err) {
    return getProject(projectIdToBeFetched);
  }
}
