import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../Issue/IssueIF';
import type { SlaRule } from '../Sla/SlaRule';

describe('assignedSlaRules', () => {
  test('returns assigned SlaRules when assignedSlaRules is not null', () => {
    const slaRules: SlaRule[] = [
      {
        id: 100,
        name: 'rule number1',
        reactionTimeInDays: null,
        expirationDate: null,
        occurredIn: null,
        priority: null,
        issueType: [],
      },
      {
        id: 200,
        name: 'rule number2',
        reactionTimeInDays: null,
        expirationDate: null,
        occurredIn: null,
        priority: null,
        issueType: [],
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
      status: 'open',
      assignedSlaRule: slaRules,
      statusRestingTime: null,
      assigneeRestingTime: null,
      statusChanges: [],
      assigneeChanges: [],
      state: 'planning',
    };

    const assignedSlaRules = issue.assignedSlaRule;
    expect(assignedSlaRules).toEqual(slaRules);
  });
});
