import {Duration, type DurationLikeObject} from 'luxon';
import type {ProjectIF} from '@/model/ProjectIF';
import type {IssueIF} from '@/model/Issue/IssueIF';
import type {FilterConfigIF, ProjectFilterConfigIF} from '@/model/FilterConfigIF';
import {FilterService} from "primevue/api";
import filter = FilterService.filter;

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

function DurationLikeObjectToDays(durationLikeObject: DurationLikeObject | null): number {
  if (durationLikeObject === null) {
    return 0;
  }
  const duration = Duration.fromDurationLike(durationLikeObject);
  return duration.as('days');
}

/**
 * Filters a project list based on the minimum assignee resting time specified in the filter configuration.
 *
 * @param projects - The project list to filter.
 * @param filterConfig - The filter configuration containing the minimum assignee resting time.
 * @returns The filtered project list with only the projects that have an assignee resting time greater than the minimum assignee resting time.
 */
export function filterProjectIssuesWithAMinimumAssigneeRestingTime(
  project: ProjectIF,
  filterConfig: FilterConfigIF
): IssueIF[] {
  const filteredIssues: IssueIF[] = project.issues.filter(
    (issue: IssueIF) =>
      DurationLikeObjectToDays(issue.assigneeRestingTime) >=
      filterConfig.projectFilter.minimumAssigneeRestingTime
  );

  return filteredIssues;
}

export function filterProjectIssuesWithMinimumStatusRestingTime(
  issues: IssueIF[],
  filterConfig: FilterConfigIF
): IssueIF[] {
  return issues.filter(
    (issue: IssueIF) =>
      DurationLikeObjectToDays(issue.statusRestingTime) >=
      filterConfig.projectFilter.minimumStatusRestingTime
  );
}

export function filterProjectIssuesWithMinimalStatusChanges(
  issues: IssueIF[],
  filterConfig: FilterConfigIF
): IssueIF[] {
  return issues.filter(
    (issue: IssueIF) =>
      (issue.statusChanges ? issue.statusChanges.length : 0) >=
      filterConfig.projectFilter.minimumNumberOfStatusChanges
  );
}

export function filterIssuesMinimumStatusChangesAndRestingTime(
  issues: IssueIF[],
  filterConfig: FilterConfigIF
): IssueIF[] {
  return filterProjectIssuesWithMinimumStatusRestingTime(
    filterProjectIssuesWithMinimalStatusChanges(issues, filterConfig),
    filterConfig
  );
}
