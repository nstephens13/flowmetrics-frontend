import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

export function filterProjectThatHasTheAllowedStatus(project: ProjectIF, filterConfig: FilterConfigIF): ProjectIF {
  const filteredIssues = project.issues.filter((issue: IssueIF) => (
    issue.status
            && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.status)
  ));

  return {
    ...project,
    issues: filteredIssues,
  };
}
