import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../../model/Issue/IssueIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { EmployeeIF } from '../../model/EmployeeIF';
import { Category } from '../../assets/__mockdata__/StatusLists';
import {
  calculateStateAverageRestingTime,
  calculateAverageRestingTime,
  getPercentOfIncreaseOrDecrease,
} from '../stateRestingTimeCalculator';

const testProject: ProjectIF = {
  id: 1,
  name: 'testProject',
  description: 'testProject',
  slaSubscriber: null,
  issues: [
    {
      id: 1,
      name: '1',
      description: null,
      assignedTo: {
        id: 1,
        firstName: 'firstName_1',
        lastName: 'lastName_1',
        emailAddress: '0',
        avatarUrl: '0',
        status: 'active',
        key: '0',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'Planned',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
    {
      id: 2,
      name: '2',
      description: null,
      assignedTo: {
        id: 2,
        firstName: 'firstName_2',
        lastName: 'lastName_2',
        emailAddress: '1',
        avatarUrl: '1',
        status: 'active',
        key: '1',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'Design',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
    {
      id: 3,
      name: '3',
      description: null,
      assignedTo: {
        id: 3,
        firstName: 'firstName_3',
        lastName: 'lastName_3',
        emailAddress: '2',
        avatarUrl: '2',
        status: 'active',
        key: '2',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'Open',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
    {
      id: 4,
      name: '4',
      description: null,
      assignedTo: {
        id: 4,
        firstName: 'firstName_4',
        lastName: 'lastName_4',
        emailAddress: '3',
        avatarUrl: '3',
        status: 'active',
        key: '3',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'Review',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
    {
      id: 5,
      name: '5',
      description: null,
      assignedTo: {
        id: 5,
        firstName: 'firstName_5',
        lastName: 'lastName_5',
        emailAddress: '4',
        avatarUrl: '4',
        status: 'active',
        key: '4',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'Unit test',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
    {
      id: 6,
      name: '6',
      description: null,
      assignedTo: {
        id: 6,
        firstName: 'firstName_6',
        lastName: 'lastName_6',
        emailAddress: '5',
        avatarUrl: '5',
        status: 'active',
        key: '5',
      } as EmployeeIF,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: 'E2E',
      statusChanges: [],
      lastStatusChange: null,
      assigneeRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      assigneeChanges: null,
      statusRestingTime: {
        weeks: 0,
        days: 1,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
  ],
};

describe('stateRestingTimeCalculator', () => {
  test('calculateStateAverageRestingTime', () => {
    expect(
      calculateStateAverageRestingTime(testProject.issues, Category.planning)
        ?.toFormat("d 'days' h 'hours'")
        .toString()
    ).toEqual('1 days 4 hours');
    expect(
      calculateStateAverageRestingTime(testProject.issues, Category.development)
        ?.toFormat("d 'days' h 'hours'")
        .toString()
    ).toEqual('1 days 4 hours');
    expect(
      calculateStateAverageRestingTime(testProject.issues, Category.testing)
        ?.toFormat("d 'days' h 'hours'")
        .toString()
    ).toEqual('1 days 4 hours');
    expect(
      calculateStateAverageRestingTime(testProject.issues, Category.nonDisplayed)
        ?.toFormat("d 'days' h 'hours'")
        .toString()
    ).toEqual(undefined);
  });
  test('calculateStateAverageRestingTime with empty issues', () => {
    expect(calculateStateAverageRestingTime(undefined, Category.planning)).toEqual(null);
    expect(calculateStateAverageRestingTime(undefined, Category.development)).toEqual(null);
    expect(calculateStateAverageRestingTime(undefined, Category.testing)).toEqual(null);
    expect(calculateStateAverageRestingTime(undefined, Category.nonDisplayed)).toEqual(null);
  });
  test('calculateAverageRestingTime', () => {
    expect(
      calculateAverageRestingTime(testProject.issues)?.toFormat("d 'days' h 'hours'").toString()
    ).toEqual('1 days 4 hours');
  });
  test('calculateAverageRestingTime with empty issues', () => {
    expect(calculateAverageRestingTime(undefined)).toEqual(null);
  });
  test('getPercentOfIncreaseOrDecrease', () => {
    expect(getPercentOfIncreaseOrDecrease(testProject.issues, Category.planning)).toEqual(' 0.00%');
  });
  test('getPercentOfIncreaseOrDecrease with empty issues', () => {
    expect(getPercentOfIncreaseOrDecrease(undefined, Category.planning)).toEqual('');
  });
});
