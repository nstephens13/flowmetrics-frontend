import { expect, test, describe } from 'vitest';
import getMockData from '../../assets/__mockdata__/mockDataComposer';
import type { ProjectIF } from '../../model/ProjectIF';
import mapIssuesToEmployees from '../issueCalculator';
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
  };
  const additionalProject: ProjectIF = {
    id: 4,
    name: 'additional',
    description: 'description',
    milestones: [],
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
