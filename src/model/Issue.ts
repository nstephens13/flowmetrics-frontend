import type { EmployeeIF } from './EmployeeIF';
import type { IssueIF } from './IssueIF';
import type { SlaRule } from '@/model/SlaRule';
import type { ChangeEventIF } from '@/model/ChangeEventIF';

// Issue Class implements IssueIF
class Issue implements IssueIF {
  id: number;

  name: string;

  description: string | null;

  assignedTo: EmployeeIF | null;

  createdBy: EmployeeIF | null;

  createdAt: Date | null;

  closedAt: Date | null;

  dueTo: Date | null;

  status: string | null;

  statusChanges: number | null;

  assignedSlaRule: SlaRule[] | null;

  lastStatusChange: Date | null;

  changelog: ChangeEventIF[] | null;

  constructor(
    id: number,
    name: string,
    description: string | null,
    assignedTo: EmployeeIF | null,
    createdBy: EmployeeIF,
    createdAt: Date,
    closedAt: Date | null,
    dueTo: Date | null,
    status: string | null,
    statusChanges: number | null,
    assignedSlaRule: SlaRule[] | null,
    lastStatusChange: Date | null,
    changelog: ChangeEventIF[] | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.dueTo = dueTo;
    this.status = status;
    this.statusChanges = statusChanges;
    this.assignedSlaRule = assignedSlaRule;
    this.lastStatusChange = lastStatusChange;
    this.changelog = changelog;
  }
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
 * Returns SLA-Rules assigned to an Issue
 * @returns The Array of SLARules assigned to an Issue, can be null
 */
function getSlaRules(issue: Issue) {
  return issue.assignedSlaRule ?? [];
}

// export of data array and remain time for ticket calculation
export {
  Issue,
  getTimeLeft,
  getFormattedDate,
  getAssignedToName,
  countIssuesByStatus,
  getSlaRules,
};
