import type { EmployeeIF } from './EmployeeIF';
import type { IssueIF } from './IssueIF';
import { Status } from './IssueIF';
import type { SLARule } from '@/model/SLARule';

// Issue Class implements IssueIF
class Issue implements IssueIF {
  id: number;

  name: string;

  description: string | null;

  assignedTo: EmployeeIF | null;

  createdBy: EmployeeIF;

  createdAt: Date;

  closedAt: Date | null;

  dueTo: Date | null;

  status: Status | null;

  userStatus: string | null;

  slaRule: SLARule | null;

  constructor(
    id: number,
    name: string,
    description: string | null,
    assignedTo: EmployeeIF | null,
    createdBy: EmployeeIF,
    createdAt: Date,
    closedAt: Date | null,
    dueTo: Date | null,
    status: Status | null,
    userStatus: string | null,
    slaRule: SLARule | null,
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
    this.userStatus = userStatus;
    this.slaRule = slaRule;
  }
}

// function to return assigned name
function getAssignedToName(issue: Issue): string {
  if (issue.assignedTo) {
    return `${issue.assignedTo.firstName} ${issue.assignedTo.lastName}`;
  }
  return '';
}

// function accepts due-to Issue-Object & transforms to date
function getFormattedDate(issue: Issue): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return issue.dueTo ? issue.dueTo.toLocaleDateString('en-US', options) : '';
}

// accepts due to Issue-Object & transfers to time
function getTimeLeft(issue: Issue): number | null {
  if (issue.dueTo) {
    const currentTime = new Date().getTime();
    const dueTime = issue.dueTo.getTime();
    const timeLeft = Math.max(0, dueTime - currentTime);
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  }
  return null;
}

function countIssuesByStatus(issueList: Issue[], status: Status | null): number {
  // filter the issue list by status and return the length of the filtered array
  // if the status is null, return the length of the issue list

  return (status ? issueList.filter((issue) => issue.status === status) : issueList).length;
}

// export of data array and remain time for ticket calculation
export {
  Issue, getTimeLeft, getFormattedDate, getAssignedToName, countIssuesByStatus,
};
