import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

/**
 * Filters the issues in a project based on the allowed status whitelist specified in the filter configuration.
 *
 * @param project - The project to filter.
 * @param filterConfig - The filter configuration containing the allowed status whitelist.
 * @returns The filtered project with only the issues that have the allowed status.
 */
export function filterIssuesInProjectWithAStatusWhitelist(
  project: ProjectIF,
  filterConfig: FilterConfigIF
): ProjectIF {
  const filteredIssues = project.issues.filter(
    (issue: IssueIF) =>
      issue.status && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.status)
  );

  return {
    ...project,
    issues: filteredIssues,
  };
}

/**
 * Filters a project list based on the projects whitelist specified in the filter configuration.
 *
 * @param projects - The project list to filter.
 * @param filterConfig - The filter configuration containing the projects whitelist.
 * @returns The filtered project list with only the projects that are in the whitelist.
 */
export function filterProjectListWithAProjectWhitelist(
  projects: ProjectIF[],
  filterConfig: FilterConfigIF
): ProjectIF[] {
  return projects.filter((project) =>
    filterConfig.projectFilter.projectsWhiteList.includes(project)
  );
}
