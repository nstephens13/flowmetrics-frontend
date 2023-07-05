import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

function filterProjectThatHasTheAllowedStatus(
  projects: ProjectIF[],
  filterConfig: FilterConfigIF
): ProjectIF[] {
  // filter all isues in projects that have the allowed status in the filterConfig
  const filteredProjects = projects.map((project) => {
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
