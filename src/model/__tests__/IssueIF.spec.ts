import { describe, test, expect } from 'vitest';
import {
  Issue,
  countIssuesByStatus,
  getAssignedToName,
  getFormattedDate,
  getTimeLeft,
} from '../../services/Issue';
import type { EmployeeIF } from '../EmployeeIF';

describe('Issue Class', () => {
  test('creates an instance of Issue with the provided properties', () => {
    const id = 1;
    const name = 'Test Issue';
    const description = 'This is a test issue';
    const assignedTo = null;
    const createdBy: EmployeeIF = {
      id: 34,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@email.com',
      status: 'active',
      avatarUrl: 'none',
      key: 'jdoe',
    };
    const createdAt = new Date();
    const closedAt = null;
    const dueTo = new Date();
    const status = 'open';
    const state = '';

    const issue = new Issue(
      id,
      name,
      description,
      null,
      null,
      assignedTo,
      createdBy,
      createdAt,
      closedAt,
      dueTo,
      status,
      {},
      {},
      [],
      [],
      ''
    );

    expect(issue.id).toBe(id);
    expect(issue.name).toBe(name);
    expect(issue.description).toBe(description);
    expect(issue.assignedTo).toBe(assignedTo);
    expect(issue.createdBy).toBe(createdBy);
    expect(issue.createdAt).toBe(createdAt);
    expect(issue.closedAt).toBe(closedAt);
    expect(issue.dueTo).toBe(dueTo);
    expect(issue.status).toBe(status);
    expect(issue.state).toBe(state);
  });
});

describe('getAssignedToName', () => {
  test('returns the assigned name when assignedTo is not null', () => {
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 34,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jdoe',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const assignedToName = getAssignedToName(issue);
    expect(assignedToName).toBe('John Doe');
  });

  test('returns an empty string when assignedTo is null', () => {
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      null,
      null,
      null,
      [],
      [],
      ''
    );
    const assignedToName = getAssignedToName(issue);
    expect(assignedToName).toBe('');
  });
});

describe('getFormattedDate', () => {
  test('returns a formatted date string when dueTo is not null', () => {
    const dueTo = new Date('2023-07-01');
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      dueTo,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const formattedDate = getFormattedDate(issue);
    expect(formattedDate).toBe('July 1, 2023');
  });

  test('returns an empty string when dueTo is null', () => {
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const formattedDate = getFormattedDate(issue);
    expect(formattedDate).toBe('');
  });
});

describe('getTimeLeft', () => {
  test('returns the number of days left when dueTo is in the future', () => {
    const currentTime = new Date();
    const dueTo = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      dueTo,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const timeLeft = getTimeLeft(issue);
    const expectedTimeLeft = Math.ceil(
      (dueTo.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
    );
    expect(timeLeft).toBe(expectedTimeLeft);
  });

  test('returns 0 when dueTo is in the past', () => {
    const dueTo = new Date('2023-06-29');
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      dueTo,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const timeLeft = getTimeLeft(issue);
    expect(timeLeft).toBe(0);
  });

  test('returns null when dueTo is null', () => {
    const issue = new Issue(
      1,
      'Test Issue',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      '',
      null,
      null,
      [],
      [],
      ''
    );
    const timeLeft = getTimeLeft(issue);
    expect(timeLeft).toBeNull();
  });
});

describe('countIssuesByStatus', () => {
  const issueList = [
    new Issue(
      1,
      'Issue 1',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      'open',
      null,
      null,
      [],
      [],
      'development'
    ),
    new Issue(
      2,
      'Issue 2',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 34,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jdoe',
      },
      new Date(),
      null,
      null,
      'closed',
      null,
      null,
      [],
      [],
      'testing'
    ),
    new Issue(
      3,
      'Issue 3',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      'in progress',
      null,
      null,
      [],
      [],
      'development'
    ),
    new Issue(
      4,
      'Issue 4',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 34,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jdoe',
      },
      new Date(),
      null,
      null,
      'open',
      {},
      {},
      [],
      [],
      'planning'
    ),
    new Issue(
      5,
      'Issue 5',
      null,
      null,
      null,
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      {
        id: 4245,
        firstName: 'Jane',
        lastName: 'Smith',
        emailAddress: 'jane.smith@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'jsmith',
      },
      new Date(),
      null,
      null,
      'closed',
      null,
      null,
      [],
      [],
      'planning'
    ),
  ];

  test('returns the count of issues with the specified status', () => {
    const openIssuesCount = countIssuesByStatus(issueList, 'open');
    const closedIssuesCount = countIssuesByStatus(issueList, 'closed');
    const inProgressIssuesCount = countIssuesByStatus(issueList, 'in progress');

    expect(openIssuesCount).toBe(2);
    expect(closedIssuesCount).toBe(2);
    expect(inProgressIssuesCount).toBe(1);
  });

  test('returns the count of all issues when status is null', () => {
    const totalIssuesCount = countIssuesByStatus(issueList, null);
    expect(totalIssuesCount).toBe(issueList.length);
  });
});
