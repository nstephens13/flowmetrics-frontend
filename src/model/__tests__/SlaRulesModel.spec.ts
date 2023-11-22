import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../IssueIF';
import type { SlaRule } from '../SlaRule';
import { getSlaRules, Issue } from '../Issue';

test('getSlaRules returns an empty array when assignedSlaRule is null', () => {
  const issue = new Issue(
    1,
    'Test Issue',
    null,
    null,
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'John',
      emailAddress: 'anna.john@email.com',
      status: 'active',
      avatarUrl: 'none',
      key: 'ajohn',
    },
    new Date(),
    null,
    null,
    'Open',
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );

  const slaRules = getSlaRules(issue);
  expect(slaRules).toEqual([]);
});

describe('assignedSlaRules', () => {
  test('returns assigned SlaRules when assignedSlaRules is not null', () => {
    const slaRules: SlaRule[] = [
      {
        id: 100,
        name: 'rule number1',
        durationInDays: null,
        expirationDate: null,
        occurredIn: null,
        reactionTime: null,
      },
      {
        id: 200,
        name: 'rule number2',
        durationInDays: null,
        expirationDate: null,
        occurredIn: null,
        reactionTime: null,
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
        emailAddress: 'mary.gard@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'mgard',
      },
      createdAt: new Date(),
      closedAt: null,
      dueTo: null,
      status: 'Open',
      assignedSlaRule: slaRules,
      analyseStatusChanges: null,
      umsetzungStatusChanges: null,
      testStatusChanges: null,
      lastStatusChange: null,
      changelog: null,
    };

    const assignedSlaRules = issue.assignedSlaRule;
    expect(assignedSlaRules).toEqual(slaRules);
  });
});
