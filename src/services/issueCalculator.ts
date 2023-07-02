import type { ProjectIF } from '../model/ProjectIF';
import type { EmployeeIF } from '../model/EmployeeIF';
import type { IssueIF } from '../model/IssueIF';
import getMockData from '../assets/__mockdata__/mockDataComposer';

/**
 * @brief: The Function map the issues to the Employees.
 *
 * The function takes a array with ProjectIF, loop through all issues,
 * parses the assigned Employees and return a map where the Employee
 * is the key, and the assigned Issues are in a list.
 *
 *
 * @param projects Project Array Object that should be calculated, if null two projects
 * with random mock data will be used
 * @returns {Map} key:EmployeeIF,
 * value: IssueIF[]
 */
function mapIssuesToEmployees(projects: ProjectIF[] | null): Map<EmployeeIF, IssueIF[]> {
  const mapToReturn: Map<EmployeeIF, IssueIF[]> = new Map([]);
  const issueSet: Set<IssueIF> = new Set<IssueIF>();
  let projectsToCalculate: ProjectIF[];

  /**
   * ToDo: decouple the mock data when everything is setup
   */
  if (projects === undefined || projects === null) {
    projectsToCalculate = [getMockData(3), getMockData(6)];
  } else {
    projectsToCalculate = projects;
  }

  function extractEmployeeAndUpdateEmployeeMap(issue: IssueIF) {
    // checking if the issue is already done, with a set, and if somebody is assigned
    if (!issueSet.has(issue) && issue.assignedTo !== null && issue.assignedTo !== undefined) {
      // checking if the employee is already with values in the map
      const issueList: IssueIF[] | undefined = mapToReturn.get(issue.assignedTo);

      // setting the values to zero if the employee isn't in the map already
      if (issueList !== undefined) {
        issueList.push(issue);
        mapToReturn.set(issue.assignedTo, issueList);
      } else {
        mapToReturn.set(issue.assignedTo, [issue]);
      }
    }
    issueSet.add(issue);
  }
  projectsToCalculate.forEach((projectToCalculate) => {
    projectToCalculate.issues.forEach((issue) => {
      extractEmployeeAndUpdateEmployeeMap(issue);
    });
    projectToCalculate.milestones.forEach((milestone) => {
      milestone.issues.forEach((issue) => {
        extractEmployeeAndUpdateEmployeeMap(issue);
      });
    });
  });

  return mapToReturn;
}

export default mapIssuesToEmployees;
