import type { EmployeeIF } from './EmployeeIF';
import type { IssueIF } from './IssueIF';
import { Status } from './IssueIF';

// Enum to set status of Issue
enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed',
}

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

  status: Status;

  // constructor sets variabels for issue object
  constructor(
    id: number,
    name: string,
    description: string | null,
    assignedTo: EmployeeIF | null,
    createdBy: EmployeeIF,
    createdAt: Date,
    closedAt: Date | null,
    dueTo: Date | null,
    status: Status,
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

// builds array of objects uses data given, creates Issue objects
function getArrayOfIssues(): Issue[] {
  const issueData: IssueIF[] = [{
    id: 14898,
    name: 'Issue 1',
    description: 'This is the first issue',
    assignedTo: null,
    createdBy: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdAt: new Date('2023-06-01'),
    closedAt: null,
    dueTo: new Date('2023-06-30'),
    status: Status.Open,
  },
  {
    id: 148093,
    name: 'Issue 2',
    description: null,
    assignedTo: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdBy: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdAt: new Date('2023-06-02'),
    closedAt: new Date('2023-06-05'),
    dueTo: new Date('2023-06-10'),
    status: Status.Closed,
  },
  {
    id: 23253,
    name: 'Issue 3',
    description: 'This is the third issue',
    assignedTo: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdBy: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdAt: new Date('2023-06-03'),
    closedAt: null,
    dueTo: new Date('2023-07-20'),
    status: Status.InProgress,
  },
  {
    id: 49764,
    name: 'Issue 4',
    description: 'This is the fourth issue',
    assignedTo: null,
    createdBy: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdAt: new Date('2023-06-04'),
    closedAt: null,
    dueTo: new Date('2023-06-15'),
    status: Status.Open,
  },
  {
    id: 3423455,
    name: 'Issue 5',
    description: 'This is the fifth issue',
    assignedTo: {
      id: 3, firstName: 'Robert', lastName: 'Johnson', assignedIssues: [],
    },
    createdBy: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdAt: new Date('2023-06-05'),
    closedAt: null,
    dueTo: new Date('2023-06-25'),
    status: Status.InProgress,
  },
  {
    id: 654353,
    name: 'Issue 6',
    description: 'This is the sixth issue',
    assignedTo: null,
    createdBy: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdAt: new Date('2023-06-10'),
    closedAt: null,
    dueTo: new Date('2023-06-20'),
    status: Status.Open,
  },
  {
    id: 32542527,
    name: 'Issue 7',
    description: null,
    assignedTo: {
      id: 4, firstName: 'Emily', lastName: 'Jones', assignedIssues: [],
    },
    createdBy: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdAt: new Date('2023-06-15'),
    closedAt: null,
    dueTo: new Date('2023-06-30'),
    status: Status.InProgress,
  },
  {
    id: 345358,
    name: 'Issue 8',
    description: 'This is the eighth issue',
    assignedTo: {
      id: 3, firstName: 'Robert', lastName: 'Johnson', assignedIssues: [],
    },
    createdBy: {
      id: 3, firstName: 'Robert', lastName: 'Johnson', assignedIssues: [],
    },
    createdAt: new Date('2023-06-20'),
    closedAt: null,
    dueTo: new Date('2023-07-10'),
    status: Status.InProgress,
  },
  {
    id: 9645754,
    name: 'Issue 9',
    description: 'This is the ninth issue',
    assignedTo: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdBy: {
      id: 4, firstName: 'Emily', lastName: 'Jones', assignedIssues: [],
    },
    createdAt: new Date('2023-06-25'),
    closedAt: null,
    dueTo: new Date('2023-07-15'),
    status: Status.InProgress,
  },
  {
    id: 132440,
    name: 'Issue 10',
    description: 'This is the tenth issue',
    assignedTo: {
      id: 2, firstName: 'Jane', lastName: 'Smith', assignedIssues: [],
    },
    createdBy: {
      id: 1, firstName: 'John', lastName: 'Doe', assignedIssues: [],
    },
    createdAt: new Date('2023-06-30'),
    closedAt: null,
    dueTo: new Date('2023-07-20'),
    status: Status.InProgress,
  },
  ];

  // map method to transform array of IssueIF objects into an array of Issue objects
  const issues: Issue[] = issueData.map((issue) => new Issue(
    issue.id,
    issue.name,
    issue.description,
    issue.assignedTo,
    issue.createdBy,
    issue.createdAt,
    issue.closedAt,
    issue.dueTo,
    issue.status,
  ));

  return issues;
}
// function to return assigned name
function getAssignedToName(issue: Issue): string {
  if (issue.assignedTo) {
    return `${issue.assignedTo.firstName} ${issue.assignedTo.lastName}`;
  }
  return '';
}

// function for issue-status
function getStatus(issue: Issue): Status {
  return issue.status;
}

function getTicketID(issue: Issue): number {
  return issue.id;
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
const countIssuesByStatus = (arr: Issue[], status: Status): number => arr.filter((issue) => issue.status === status).length;

// Function to count the total number of "Open" issues
const countOpenIssues = (arr: Issue[]): number => countIssuesByStatus(arr, Status.Open);

// Function to count the total number of "Closed" issues
const countClosedIssues = (arr: Issue[]): number => countIssuesByStatus(arr, Status.Closed);

// Function to count the total number of "In Progress" issues
const countInProgressIssues = (arr: Issue[]): number => countIssuesByStatus(arr, Status.InProgress);

// export of data array and remaintime for ticket calculation
export {
  Issue, getArrayOfIssues, getTimeLeft, getFormattedDate,
  getAssignedToName, getStatus, getTicketID, countClosedIssues, countInProgressIssues,
  countOpenIssues,

};
