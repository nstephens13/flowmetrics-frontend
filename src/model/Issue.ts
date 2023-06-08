import type { EmployeeIF } from './EmployeeIF';
import type { IssueIF } from './IssueIF';

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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  }, {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

// function to calculate days left of Tickets until due date
function remainTime(issue: Issue): number | null {
  if (issue.dueTo) {
    const currentTime = new Date().getTime();
    const dueTime = issue.dueTo.getTime();
    return Math.max(0, dueTime - currentTime);
  }
  return null;
}

// export of data array and remaintime for ticket calculation
export { getArrayOfIssues, remainTime };
