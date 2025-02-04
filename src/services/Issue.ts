import type { DurationLikeObject } from 'luxon';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import { Category, statusLists } from '@/assets/__mockdata__/IssueProps/statusLists';

// Issue Class implements IssueIF
class Issue implements IssueIF {
  id: number;

  name: string;

  description: string | null;

  priority: string | null;

  issueType: string | null;

  assignedTo: EmployeeIF | null;

  createdBy: EmployeeIF | null;

  createdAt: Date | null;

  closedAt: Date | null;

  dueTo: Date | null;

  status: string | null;

  assigneeRestingTime: DurationLikeObject | null;

  statusRestingTime: DurationLikeObject | null;

  statusChanges: ChangeLogIF[];

  assigneeChanges: ChangeLogIF[];

  state: string | null;

  static planningStatusList: any;

  constructor(
    id: number,
    name: string,
    description: string | null,
    priority: string | null,
    issueType: string | null,
    assignedTo: EmployeeIF | null,
    createdBy: EmployeeIF,
    createdAt: Date,
    closedAt: Date | null,
    dueTo: Date | null,
    status: string | null,
    assigneeRestingTime: DurationLikeObject | null,
    statusRestingTime: DurationLikeObject | null,
    statusChanges: ChangeLogIF[],
    assigneeChanges: ChangeLogIF[],
    state: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.issueType = issueType;
    this.assignedTo = assignedTo;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.dueTo = dueTo;
    this.status = status;
    this.assigneeRestingTime = assigneeRestingTime;
    this.statusRestingTime = statusRestingTime;
    this.statusChanges = statusChanges;
    this.assigneeChanges = assigneeChanges;
    this.state = state;
  }
}

// Define lists of different category with statuses
const planningStatusList: string[] = statusLists[Category.planning];
const devStatusList: string[] = statusLists[Category.development];
const testingStatusList: string[] = statusLists[Category.testing];
const nonDisplayedStatusList: string[] = statusLists[Category.nonDisplayed];
const nonDisplayedStateList: string[] = [''];

// Function sets State using Issue-Status
function assignStateToIssue(issue: Issue): string | null {
  const status = issue.status || '';

  if (planningStatusList.includes(status)) {
    return Category.planning;
  }
  if (devStatusList.includes(status)) {
    return Category.development;
  }
  if (testingStatusList.includes(status)) {
    return Category.testing;
  }
  if (nonDisplayedStatusList.includes(status)) {
    return null;
  }
  return 'Undefined';
}
/**
 * Returns the name of the employee assigned to the issue.
 * @param issue - The Issue object.
 * @returns The assigned employee's name.
 */

function getAssignedToName(issue: Issue): string {
  if (issue.assignedTo) {
    return `${issue.assignedTo.firstName} ${issue.assignedTo.lastName}`;
  }
  return '';
}

/**
 * Returns the formatted due date of the issue.
 * @param issue - The Issue object.
 * @returns The formatted due date string.
 */
function getFormattedDate(issue: Issue): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return issue.dueTo ? issue.dueTo.toLocaleDateString('en-US', options) : '';
}

/**
 * Returns the number of days left until the due date of the issue.
 * @param issue - The Issue object.
 * @returns The number of days left, or null if no due date is set.
 */
function getTimeLeft(issue: Issue): number | null {
  if (issue.dueTo) {
    const currentTime = new Date().getTime();
    const dueTime = issue.dueTo.getTime();
    const timeLeft = Math.max(0, dueTime - currentTime);
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  }
  return null;
}

/**
 * Counts the number of issues in the given issue list with the specified status.
 * If the status is null, counts all the issues in the list.
 * @param issueList - The list of issues.
 * @param status - The status of the issues to count.
 * @returns The count of issues.
 */
function countIssuesByStatus(issueList: Issue[], status: string | null): number {
  return (status ? issueList.filter((issue) => issue.status === status) : issueList).length;
}

/**
 * Counts the number of issues in the given issue list with the specified state.
 * If the state is null, counts all the issues in the list.
 * @param issueList - The list of issues.
 * @param status - The states of the issues to count.
 * @returns The count of issues.
 */
function countIssuesByState(issueList: Issue[], state: string | null): number {
  return (state ? issueList.filter((issue) => assignStateToIssue(issue) === state) : issueList)
    .length;
}

// export of data array and remain time for ticket calculation
export {
  Issue,
  getTimeLeft,
  getFormattedDate,
  getAssignedToName,
  countIssuesByStatus,
  countIssuesByState,
  assignStateToIssue,
  planningStatusList,
  devStatusList,
  testingStatusList,
  nonDisplayedStatusList,
  nonDisplayedStateList,
};
