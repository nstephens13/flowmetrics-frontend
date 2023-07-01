import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

function filterProjectThatHasTheAllowedStatus(
  project: ProjectIF,
  filterConfig: FilterConfigIF,
): ProjectIF {
  const filteredIssues = project.issues.filter((issue: IssueIF) => (
    issue.userStatus
            && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.userStatus)
  ));

  return {
    ...project,
    issues: filteredIssues,
  };
}
export default filterProjectThatHasTheAllowedStatus;
