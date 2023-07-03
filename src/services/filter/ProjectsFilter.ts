import type { ProjectIF } from '@/model/ProjectIF';

import type { IssueIF } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';
import type { MilestoneIF } from '@/model/MilestoneIF';

export function filterIssuesInProjectWithAStatusWhitelist(
  project: ProjectIF,
  filterConfig: FilterConfigIF
): ProjectIF {
  const filteredIssues = project.issues.filter(
    (issue: IssueIF) =>
      issue.status && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.status)
  );
  const filteredMilestones: MilestoneIF[] = [];
  project.milestones.forEach((milestone) => {
    const newMilestone: MilestoneIF = {
      id: milestone.id,
      issues: [],
      description: milestone.description,
      name: milestone.name,
    };
    filteredMilestones.push(newMilestone);
    const issues = milestone.issues.filter(
      (issue: IssueIF) =>
        issue.status && filterConfig.projectFilter.issueStatusIncludeFilter.includes(issue.status)
    );
    newMilestone.issues = issues;
  });

  return {
    ...project,
    issues: filteredIssues,
    milestones: filteredMilestones,
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
