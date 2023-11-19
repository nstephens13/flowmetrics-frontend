import { expect, test, describe } from 'vitest';
import getMockData from '../../assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '../../model/ProjectIF';
import { calculateRestingTime, mapIssuesToEmployees } from '../issueCalculator';
import { ChangeEventEnum } from '../../model/ChangeEventIF';
import type { IssueIF } from '../../model/IssueIF';
import type { EmployeeIF } from '../../model/EmployeeIF';

describe('Issue Calculator should map correctly ', () => {
  const projects: ProjectIF[] = [];
  test('Component should include the Name John Doe', () => {
    expect('JOHN DOE').toContain('JOHN DOE');
    const issueMap = mapIssuesToEmployees(projects);
    // then
    const number = issueMap.size;
    expect(number).eq(0);
  });

  const testEmployee: EmployeeIF = {
    id: 12,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    emailAddress: 'test.email@email.com',
    status: 'inactive',
    avatarUrl: 'none',
    key: 'test',
  };

  // given
  const additionalIssue: IssueIF = {
    id: 11,
    name: 'IssueName',
    description: '',
    createdBy: null,
    createdAt: null,
    closedAt: null,
    status: '',
    dueTo: null,
    assignedTo: testEmployee,
    statusChanges: null,
    assignedSlaRule: null,
    lastStatusChange: null,
    changelog: null,
  };
  const additionalProject: ProjectIF = {
    id: 4,
    name: 'additional',
    description: 'description',
    slaSubscriber: null,
    issues: [additionalIssue],
  };
  test('map should have 9 entries', () => {
    projects.push(getMockData(2));
    expect(Array.isArray(projects[0].issues)).toBe(true);

    projects.push(additionalProject);
    // when
    projects.push(getMockData(2));
    // when
    const issueMap = mapIssuesToEmployees(projects);
    // then
    expect(issueMap.size).eq(9);
  });

  test('map should have the additional Issue', () => {
    projects.push(additionalProject);
    // when
    const issueMap = mapIssuesToEmployees(projects);

    const issueList = issueMap.get(testEmployee);
    // then
    expect(issueList !== undefined && issueList !== null).toBe(true);
    let check = false;
    if (issueList != null) {
      expect(issueList[0].id).eq(11);
      expect('IssueName'.includes(issueList[0].name)).toBe(true);
      check = true;
    }
    expect(check).toBe(true);
  });
});

describe('calculateRestingTime', () => {
  const assignedTimestamp = new Date('2023-01-01T12:00:00'); // Set a specific timestamp for the assigned event
  const testEmployee: EmployeeIF = {
    id: 12,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    emailAddress: 'test.email@email.com',
    status: 'inactive',
    avatarUrl: 'none',
    key: 'test',
  };
  const testEmployee1: EmployeeIF = {
    id: 12,
    firstName: 'TestFirstName1',
    lastName: 'TestLastName1',
    emailAddress: 'test1.email@email.com',
    status: 'inactive',
    avatarUrl: 'none',
    key: 'test1',
  };

  const testEmployee2: EmployeeIF = {
    id: 13,
    firstName: 'TestFirstName2',
    lastName: 'TestLastName2',
    emailAddress: 'test2.email@email.com',
    status: 'inactive',
    avatarUrl: 'none',
    key: 'test2',
  };

  const testIssueWithMatchingEmployee: IssueIF = {
    id: 1,
    name: 'TestIssue',
    description: 'none',
    createdBy: testEmployee1,
    createdAt: new Date(),
    assignedTo: testEmployee1,
    closedAt: null,
    dueTo: null,
    status: 'Open',
    statusChanges: null,
    lastStatusChange: null,
    assignedSlaRule: null,
    changelog: [
      {
        id: '1',
        changeDescription: ChangeEventEnum.assigned,
        timestamp: assignedTimestamp,
        assigned: testEmployee1,
      },
    ],
  };

  const testIssueWithDifferentEmployee: IssueIF = {
    id: 2,
    name: 'TestIssue2',
    description: 'none',
    createdBy: testEmployee1,
    createdAt: new Date(),
    assignedTo: testEmployee1,
    closedAt: null,
    dueTo: null,
    status: 'Open',
    statusChanges: null,
    lastStatusChange: null,
    assignedSlaRule: null,
    changelog: [
      {
        id: '1',
        changeDescription: ChangeEventEnum.assigned,
        timestamp: assignedTimestamp,
        assigned: testEmployee2, // Different employee in assigned event
      },
    ],
  };

  const testIssue: IssueIF = {
    id: 1,
    name: 'TestIssue',
    description: 'Test description',
    createdBy: testEmployee,
    createdAt: new Date(),
    closedAt: null,
    status: 'Open',
    dueTo: null,
    assignedTo: testEmployee,
    statusChanges: 1,
    lastStatusChange: new Date(),
    assignedSlaRule: null,
    changelog: [
      {
        id: '1',
        changeDescription: ChangeEventEnum.assigned,
        timestamp: assignedTimestamp,
        assigned: testEmployee,
      },
    ],
  };

  test('should return the correct resting time', () => {
    // when
    const [assignedEmployee, restingTimeInSeconds] = calculateRestingTime(testIssue);

    // Calculate the expected resting time based on the specific timestamp
    const currentDate = new Date();
    const expectedRestingTimeInSeconds = Math.floor(
      (currentDate.getTime() - assignedTimestamp.getTime()) / 1000
    );

    // then
    expect(assignedEmployee).toEqual(testEmployee);
    expect(restingTimeInSeconds).toBe(expectedRestingTimeInSeconds);
  });

  test('should handle null assignedTo or changelog', () => {
    // given
    const issueWithoutAssignedTo: IssueIF = { ...testIssue, assignedTo: null };
    const issueWithoutChangelog: IssueIF = { ...testIssue, changelog: null };

    // when
    const [assignedEmployee1, restingTimeInSeconds1] = calculateRestingTime(issueWithoutAssignedTo);
    const [assignedEmployee2, restingTimeInSeconds2] = calculateRestingTime(issueWithoutChangelog);

    // then
    expect(assignedEmployee1).toBeNull();
    expect(restingTimeInSeconds1).toBe(0);
    expect(assignedEmployee2).toBeNull();
    expect(restingTimeInSeconds2).toBe(0);
  });
  test('should return the correct resting time for matching employee', () => {
    // when
    const [assignedEmployee, restingTimeInSeconds] = calculateRestingTime(
      testIssueWithMatchingEmployee
    );

    // Calculate the expected resting time based on the specific timestamp
    const currentDate = new Date();
    const expectedRestingTimeInSeconds = Math.floor(
      (currentDate.getTime() - assignedTimestamp.getTime()) / 1000
    );

    // then
    expect(assignedEmployee).toEqual(testEmployee1);
    expect(restingTimeInSeconds).toBe(expectedRestingTimeInSeconds);
  });

  test('should return 0 resting time for different employee', () => {
    // when
    const [assignedEmployee, restingTimeInSeconds] = calculateRestingTime(
      testIssueWithDifferentEmployee
    );

    // then
    expect(assignedEmployee).toEqual(testEmployee1);
    expect(restingTimeInSeconds).toBe(0);
  });
});
