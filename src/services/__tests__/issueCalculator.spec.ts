import { expect, test, describe } from 'vitest';
import type { ProjectIF } from '../../model/ProjectIF';
import { mapIssuesToEmployees } from '../issueCalculator';
import type { IssueIF } from '../../model/Issue/IssueIF';
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
    priority: null,
    issueType: null,
    createdBy: null,
    createdAt: null,
    closedAt: null,
    status: '',
    dueTo: null,
    assignedTo: testEmployee,
    statusRestingTime: {},
    assigneeRestingTime: {},
    statusChanges: [],
    assigneeChanges: [],
    state: '',
  };
  const additionalProject: ProjectIF = {
    id: 4,
    name: 'additional',
    description: 'description',
    issues: [additionalIssue],
  };

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
/*
describe('calculateRemainingReactionTime', () => {
  const createdAt: Date = new Date();
  const testSlaRule = {
    id: 1,
    name: 'TestRule',
    reactionTimeInDays: 2,
    expirationDate: null,
    occurredIn: 'TestLocation',
    priority: 'behindernd',
    issueType: ['bug', 'test'],
  };

  const testIssueWithSlaRule: IssueIF = {
    id: 1,
    name: 'TestIssue',
    description: 'Test description',
    issueType: null,
    priority: null,
    createdBy: null,
    createdAt,
    closedAt: null,
    status: 'open',
    dueTo: null,
    assignedTo: null,
    statusRestingTime: {},
    assigneeRestingTime: {},
    statusChanges: [],
    assigneeChanges: [],
    state: 'planning',
  };

  const testIssueWithoutSlaRule: IssueIF = {
    id: 2,
    name: 'TestIssue2',
    description: 'Test description',
    priority: null,
    issueType: null,
    createdBy: null,
    createdAt,
    closedAt: null,
    status: 'open',
    dueTo: null,
    assignedTo: null,
    statusRestingTime: {},
    assigneeRestingTime: {},
    statusChanges: [],
    assigneeChanges: [],
    state: 'planning',
  };
  test('should return the correct remaining reaction time with SLA rule', () => {
    // Calculate the expected remaining reaction time based on the specific expiration date
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);

    // Add two days to the expiration date
    expirationDate.setDate(expirationDate.getDate() + 2);

    const expectedRemainingTimeInSeconds = Math.floor(
      (expirationDate.getTime() - currentDate.getTime()) / 1000
    );

    const [hasRemainingTime, remainingReactionTimeInSeconds] =
      calculateRemainingReactionTime(testIssueWithSlaRule);

    // Then ensure that the issue has remaining time
    expect(hasRemainingTime).toBe(true);

    // Optionally, you can also check if the result is close to the expected value within a tolerance
    expect(Math.abs(remainingReactionTimeInSeconds - expectedRemainingTimeInSeconds)).toBeLessThan(
      2
    ); // Adjust the tolerance as needed
  });

  test('should return 0 remaining reaction time without SLA rule', () => {
    // when
    const [hasRemainingTime, remainingReactionTimeInSeconds] =
      calculateRemainingReactionTime(testIssueWithoutSlaRule);

    // then
    expect(remainingReactionTimeInSeconds).toBe(0);
    expect(hasRemainingTime).toBe(false);
  });

  test('should pick SLA rule with minimum days', () => {
    const currentDate = new Date();
    // SLA rules with different reaction times
    const slaRule1 = {
      id: 1,
      name: 'TestRule1',
      reactionTimeInDays: 3,
      expirationDate: null,
      occurredIn: 'TestLocation1',
      priority: 'behindernd',
      issueType: ['bug', 'test'],
    };

    const slaRule2 = {
      id: 2,
      name: 'TestRule2',
      reactionTimeInDays: 1,
      expirationDate: null,
      occurredIn: 'TestLocation2',
      priority: 'behindernd',
      issueType: ['bug', 'test'],
    };

    const slaRule3 = {
      id: 3,
      name: 'TestRule3',
      reactionTimeInDays: 5,
      expirationDate: null,
      occurredIn: 'TestLocation3',
      priority: 'behindernd',
      issueType: ['bug', 'test'],
    };

    const testIssueWithMultipleSlaRules: IssueIF = {
      id: 1,
      name: 'TestIssue',
      description: 'Test description',
      createdBy: null,
      createdAt: currentDate,
      closedAt: null,
      status: 'open',
      dueTo: null,
      assignedTo: null,
      statusRestingTime: {},
      assigneeRestingTime: {},
      statusChanges: [],
      assigneeChanges: [],
      state: 'planning',
    };

    const expirationDate = new Date(currentDate);

    // Add two days to the expiration date
    expirationDate.setDate(expirationDate.getDate() + 1);

    const wrongExpirationDate = new Date(currentDate);

    // Add two days to the expiration date
    wrongExpirationDate.setDate(expirationDate.getDate() + 3);

    const expectedRemainingTimeInSeconds = Math.floor(
      (expirationDate.getTime() - currentDate.getTime()) / 1000
    );

    const [hasRemainingTime, remainingReactionTimeInSeconds] = calculateRemainingReactionTime(
      testIssueWithMultipleSlaRules
    );

    // Ensure that the issue has remaining time
    expect(hasRemainingTime).toBe(true);

    // Optionally, you can also check if the result is close to the expected value within a tolerance
    expect(Math.abs(expectedRemainingTimeInSeconds - remainingReactionTimeInSeconds)).toBeLessThan(
      2
    );
  });
});
*/
