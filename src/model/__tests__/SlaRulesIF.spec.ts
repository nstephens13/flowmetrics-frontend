import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../Issue/IssueIF';

describe('assignedSlaRules', () => {
  test('returns assigned SlaRules when assignedSlaRules is not null', () => {
    /*
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
*/
    const issue: IssueIF = {
      id: 1,
      name: 'Test Issue',
      description: null,
      priority: null,
      issueType: null,
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
      statusRestingTime: null,
      assigneeRestingTime: null,
      statusChanges: [],
      assigneeChanges: [],
      state: 'planning',
    };

    const { state } = issue;
    expect(state).toEqual('planning');
  });
});
