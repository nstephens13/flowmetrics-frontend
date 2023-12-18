import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../../model/Issue/IssueIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { SlaRule } from '../../model/Sla/SlaRule';
import getPercentageSlaRulesComplied from '../keyFactsCalculator';

describe('keyFactsTests', () => {
  const testProject = {
    id: 0,
    name: '0',
    description: '0',
    issues: [
      {
        id: 0,
        name: '0',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: null,
        closedAt: null,
        dueTo: null,
        status: null,
        statusChanges: [],
        lastStatusChange: null,
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
        changelog: null,
      } as IssueIF,
      {
        id: 0,
        name: '0',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: null,
        closedAt: new Date(new Date().valueOf() + 100000),
        dueTo: null,
        status: null,
        statusChanges: [],
        lastStatusChange: null,
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
        changelog: null,
      } as IssueIF,
      {
        id: 0,
        name: '0',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: null,
        closedAt: null,
        dueTo: null,
        status: null,
        statusChanges: [],
        lastStatusChange: null,
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
        changelog: null,
      } as IssueIF,
      {
        id: 0,
        name: '0',
        description: null,
        assignedTo: null,
        createdBy: null,
        createdAt: null,
        closedAt: null,
        dueTo: null,
        status: null,
        statusChanges: [],
        lastStatusChange: null,
        assignedSlaRule: [],
        changelog: null,
      } as IssueIF,
    ],
  } as ProjectIF;

  test('percentageCorrect', () => {
    expect(getPercentageSlaRulesComplied(testProject)).toEqual(33);
  });
});
