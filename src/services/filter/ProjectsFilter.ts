import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

export function filterIssuesInProjectWithAStatusWhitelist(
  project: ProjectIF,
  filterConfig: FilterConfigIF
): ProjectIF {
  const filteredIssues = project.issues.filter(
    (issue: IssueIF) =>
      issue.userStatus &&
      filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.userStatus)
  );

  return {
    ...project,
    issues: filteredIssues,
  };
}

export function filterProjectListWithAProjectWhitelist(
  projects: ProjectIF[],
  filterConfig: FilterConfigIF
): ProjectIF[] {
  return projects.filter((project) =>
    filterConfig.projectFilter.projectsWhiteList.includes(project)
  );
}
