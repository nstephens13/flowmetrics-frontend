import type { EmployeeIF } from './EmployeeIF';
import type { IssueIF } from './IssueIF';
import { Status } from './IssueIF';
import IssueJson2 from '../assets/__mockdata__/Issues_2.json';

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
  }
}

function loadIssueDataFromFile(issueJson: Array<any>): Issue[] {
  const issueData: Issue[] = [];
  structuredClone(issueJson).forEach((issue) => {
    issueData.push({
      id: issue.id,
      name: issue.name,
      description: issue.description,
      assignedTo: issue.assignedTo,
      createdBy: issue.createdBy,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: new Date(issue.createdAt),
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status,
    });
  });
  return issueData;
}

// builds array of objects uses data given, creates Issue objects
function getArrayOfIssues(): Issue[] {
  return loadIssueDataFromFile(IssueJson2);
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
  return issue.dueTo ? issue.dueTo.toLocaleDateString(undefined, options) : '';
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
  Issue, getArrayOfIssues, getTimeLeft, getFormattedDate,
  getAssignedToName, countIssuesByStatus,
};
