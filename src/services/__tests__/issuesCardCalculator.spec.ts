import { describe, expect, test } from 'vitest';
import type { IssueIF } from '../../model/Issue/IssueIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { EmployeeIF } from '../../model/EmployeeIF';
import { getIssueCountfromCategory, getOpenIssueCount } from '../issuesCardCalculator';
import { Category } from '../../assets/__mockdata__/StatusLists';

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
      statusRestingTime: null,
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
      statusRestingTime: null,
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
      statusRestingTime: null,
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
      statusRestingTime: null,
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
      statusRestingTime: null,
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
      statusRestingTime: null,
      state: null,
      assignedSlaRule: null,
      changelog: null,
    } as IssueIF,
  ],
};

describe('assigneeCardCalculator', () => {
  test('getIssueCountfromCategory', () => {
    expect(getIssueCountfromCategory(Category.planning, testProject)).toBe(3);
    expect(getIssueCountfromCategory(Category.development, testProject)).toBe(1);
    expect(getIssueCountfromCategory(Category.testing, testProject)).toBe(2);
    expect(getIssueCountfromCategory(Category.nonDisplayed, testProject)).toBe(0);
  });
  test('getIssueCountfromCategory with empty project', () => {
    expect(getIssueCountfromCategory(Category.planning, undefined)).toBe(0);
    expect(getIssueCountfromCategory(Category.development, undefined)).toBe(0);
    expect(getIssueCountfromCategory(Category.testing, undefined)).toBe(0);
    expect(getIssueCountfromCategory(Category.nonDisplayed, undefined)).toBe(0);
  });
  test('getIssueCountfromCategory with empty project issues', () => {
    expect(getIssueCountfromCategory(Category.planning, { ...testProject, issues: [] })).toBe(0);
    expect(getIssueCountfromCategory(Category.development, { ...testProject, issues: [] })).toBe(0);
    expect(getIssueCountfromCategory(Category.testing, { ...testProject, issues: [] })).toBe(0);
    expect(getIssueCountfromCategory(Category.nonDisplayed, { ...testProject, issues: [] })).toBe(
      0
    );
  });
  test('getOpenIssueCount', () => {
    expect(getOpenIssueCount(testProject)).toBe(6);
  });
  test('getOpenIssueCount with empty project', () => {
    expect(getOpenIssueCount(undefined)).toBe(0);
  });
  test('getOpenIssueCount with empty project issues', () => {
    expect(getOpenIssueCount({ ...testProject, issues: [] })).toBe(0);
  });
});
