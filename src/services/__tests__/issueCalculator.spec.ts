import { assert, expect, test, describe } from 'vitest';
import getMockData from '../../assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '../../model/ProjectIF';
import mapIssuesToEmployees from '../issueCalculator';
import type { IssueIF } from '../../model/IssueIF';
import type { EmployeeIF } from '../../model/EmployeeIF';

describe('Issue Calculator should map correctly ', () => {
  // given
  const projects: ProjectIF[] = [];
  const testEmployee: EmployeeIF = {
    id: 12,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
  };
  const additionalIssue: IssueIF = {
    id: 11,
    name: 'IssueName',
    description: '',
    createdBy: null,
    createdAt: null,
    closedAt: null,
    status: null,
    userStatus: '',
    dueTo: null,
    assignedTo: testEmployee,
  };
  const additionalProject: ProjectIF = {
    id: 4,
    name: 'additional',
    description: 'description',
    milestones: [],
    issues: [additionalIssue],
  };

  // when
  projects.push(getMockData(2));

  // then
  test('issues should be an array', () => {
    // expect and assert are build in functions from the framework
    assert(Array.isArray(projects[0].issues));
  });

  test('map should have 4 entries', () => {
    // when
    const issueMap = mapIssuesToEmployees(projects);
    // then
    expect(issueMap.size).eq(9);
  });

  // given
  projects.push(getMockData(2));
  projects.push(additionalProject);

  test('map should have 9 entries', () => {
    // when
    const issueMap = mapIssuesToEmployees(projects);
    // then
    expect(issueMap.size).eq(9);
  });

  test('map should have the additional Issue', () => {
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
