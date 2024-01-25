import { DateTime, type DurationLikeObject } from 'luxon';
import { describe, test, expect } from 'vitest';
import type { CategoryIF } from '../../model/Sla/CategoryIF';
import type { IssueIF } from '../../model/Issue/IssueIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { RuleIF } from '../../model/Sla/RuleIF';
import getReactionTimeForIssue from '../reactionTimeCalculator';

const category: CategoryIF = {
  id: 1,
  name: 'Category 1',
  project: {
    id: 1,
    name: 'Project 1',
    description: 'Project 1 description',
    issues: [
      {
        id: 1,
        name: 'Issue 1',
        description: 'Issue 1 description',
        priority: 'Priority 1',
        issueType: 'type1',
        assignedTo: null,
        createdBy: null,
        createdAt: new Date(),
        closedAt: null,
        dueTo: null,
        status: null,
        assigneeRestingTime: null,
        statusRestingTime: null,
        statusChanges: null,
        assigneeChanges: null,
        state: null,
      } as IssueIF,
      {
        id: 2,
        name: 'Issue 2',
        description: 'Issue 2 description',
        priority: 'Priority 2',
        issueType: 'type2',
        assignedTo: null,
        createdBy: null,
        createdAt: new Date(),
        closedAt: null,
        dueTo: null,
        status: null,
        assigneeRestingTime: null,
        statusRestingTime: null,
        statusChanges: null,
        assigneeChanges: null,
        state: null,
      } as IssueIF,
    ],
  } as ProjectIF,
  rules: [
    {
      id: 1,
      name: 'Rule 1',
      reactionTime: {
        days: 1,
      } as DurationLikeObject,
      expirationDate: null,
      occurredIn: null,
      priority: null,
      issueType: 'type1',
    } as RuleIF,
  ],
} as CategoryIF;

describe('reactionTimeCalculator', () => {
  test('should return the reaction time for the issue', () => {
    const response = getReactionTimeForIssue([category], category.project.issues[0]);
    const creationDate = category.project.issues[0].createdAt;
    const { reactionTime } = category.rules[0];
    const expectedResponse = DateTime.fromJSDate(creationDate as Date)
      .plus(reactionTime as DurationLikeObject)
      .toLocaleString(DateTime.DATETIME_FULL);
    expect(response).toBe(expectedResponse);
  });
  test('should return "No rule found/No reaction time" if the rule is not found', () => {
    const response = getReactionTimeForIssue([category], category.project.issues[1]);
    const expectedResponse = 'No rule found/No reaction time';
    expect(response).toBe(expectedResponse);
  });
});
