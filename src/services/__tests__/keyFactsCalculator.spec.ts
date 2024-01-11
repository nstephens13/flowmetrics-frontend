import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../../model/Issue/IssueIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { SlaRule } from '../../model/Sla/SlaRule';
import { getPercentageSlaRulesComplied, calculateAverageSolvingTime } from '../keyFactsCalculator';
import type { ChangeLogIF } from '../../model/Issue/ChangeLogIF';
// Pair 1
const date1 = new Date('2024-01-08T12:00:00');
const date2 = new Date('2024-01-09T16:00:00');

// Pair 2
const date3 = new Date('2024-02-15T06:00:00');
const date4 = new Date('2024-02-16T10:00:00');

describe('keyFactsTests', () => {
  const testProject: ProjectIF = {
    id: 0,
    name: '0',
    description: '0',
    slaSubscriber: null,
    issues: [
      {
        id: 1,
        name: '1',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: date1,
        closedAt: null,
        dueTo: null,
        status: 'Resolved',
        statusChanges: [
          {
            id: 0,
            created: date2,
            author: null,
            changes: null,
          } as ChangeLogIF,
        ],
        lastStatusChange: null,
        assigneeRestingTime: null,
        assigneeChanges: null,
        statusRestingTime: null,
        state: null,
        assignedSlaRule: [
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: new Date(new Date().valueOf() + 1000000),
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: new Date(0),
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
        ],
      } as IssueIF,
      {
        id: 2,
        name: '2',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: date3,
        closedAt: new Date(new Date().valueOf() + 100000),
        dueTo: null,
        status: 'Closed',
        statusChanges: [
          {
            id: 0,
            created: date4,
            author: null,
            changes: null,
          } as ChangeLogIF,
        ],
        lastStatusChange: null,
        assigneeRestingTime: null,
        assigneeChanges: null,
        statusRestingTime: null,
        state: null,
        assignedSlaRule: [
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: new Date(new Date().valueOf() + 1000000),
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: new Date(0),
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
        ],
      } as IssueIF,
      {
        id: 3,
        name: '3',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: date1,
        closedAt: null,
        dueTo: null,
        status: 'Resolved',
        statusChanges: [
          {
            id: 0,
            created: date2,
            author: null,
            changes: null,
          } as ChangeLogIF,
        ],
        lastStatusChange: null,
        assigneeRestingTime: null,
        assigneeChanges: null,
        statusRestingTime: null,
        state: null,
        assignedSlaRule: [
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: null,
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
          {
            id: null,
            name: null,
            reactionTimeInDays: null,
            expirationDate: new Date(0),
            occurredIn: null,
            priority: null,
            issueType: null,
          } as SlaRule,
        ],
      } as IssueIF,
      {
        id: 4,
        name: '4',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: date3,
        closedAt: null,
        dueTo: null,
        status: 'Closed',
        statusChanges: [
          {
            id: 0,
            created: date4,
            author: null,
            changes: null,
          } as ChangeLogIF,
        ],
        lastStatusChange: null,
        assignedSlaRule: [],
        assigneeRestingTime: null,
        assigneeChanges: null,
        statusRestingTime: null,
        state: null,
      } as IssueIF,
    ],
  } as ProjectIF;

  test('getPercentageSlaRulesComplied', () => {
    expect(getPercentageSlaRulesComplied(testProject)).toEqual('33 %');
  });
  test('calculateAverageSolvingTime', () => {
    expect(
      calculateAverageSolvingTime(testProject.issues)?.toFormat("d 'days' h 'hours'").toString()
    ).toEqual('1 days 4 hours');
  });
  test('calculateAverageSolvingTime with empty issues', () => {
    expect(calculateAverageSolvingTime([])).toEqual(null);
  });
});
