import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../IssueIF';
import type { SLARule } from '@/model/SLARule';
import { Issue, getSLARules } from '../Issue';

test('getSLARules returns an empty array when assignedSLARule is null', () => {
  const issue = new Issue(
    1,
    'Test Issue',
    null,
    null,
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'John',
    },
    new Date(),
    null,
    null,
    'Open',
    null,
    null
  );

  const slaRules = getSLARules(issue);
  expect(slaRules).toEqual([]);
});

describe('assignedSLARules', () => {
  test('returns assigned SLARules when assignedSLARules is not null', () => {
    const slaRules: SLARule[] = [
      {
        id: 100,
        name: 'rule number1',
        durationInDays: null,
        expirationDate: null,
        maxAssignedEmployees: null,
        occurredIn: null,
      },
      {
        id: 200,
        name: 'rule number2',
        durationInDays: null,
        expirationDate: null,
        maxAssignedEmployees: null,
        occurredIn: null,
      },
    ];

    const issue: IssueIF = {
      id: 1,
      name: 'Test Issue',
      description: null,
      assignedTo: null,
      createdBy: {
        id: 2,
        firstName: 'Mary',
        lastName: 'Gard',
      },
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'Open',
      statusChanges: null,
      assignedSLARule: slaRules,
    };

    const assignedSLARules = issue.assignedSLARule;
    expect(assignedSLARules).toEqual(slaRules);
  });
});
