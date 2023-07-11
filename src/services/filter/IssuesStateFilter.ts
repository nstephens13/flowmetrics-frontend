import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

/**
 * Filters projects based on the allowed status specified in the filter configuration.
 *
 * @param filterConfig - The filter configuration containing the allowed status.
 * @returns An array of projects that have issues with the allowed status.
 */
function filterProjectThatHasTheAllowedStatus(filterConfig: FilterConfigIF): ProjectIF[] {
  // filter all isues in projects that have the allowed status in the filterConfig
  const filteredProjects = filterConfig.projectFilter.projectsWhiteList.map((project) => {
    const filteredIssues = project.issues.filter(
      (issue: IssueIF) =>
        issue.status && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.status)
    );
    return {
      ...project,
      issues: filteredIssues,
    };
  });
  return filteredProjects;
}
export default filterProjectThatHasTheAllowedStatus;
