import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import getMockData from '../assets/__mockdata__/mockDataComposer';
import { Category, statusLists } from '@/assets/__mockdata__/IssueProps/statusLists';

/**
 * @brief: The Function map the issues to the Employees.
 *
 * The function takes an array with ProjectIF, loop through all issues,
 * parses the assigned Employees and return a map where the Employee
 * is the key, and the assigned Issues are in a list.
 *
 *
 * @param projects Project Array Object that should be calculated, if null two projects
 * with random mock data will be used
 * @returns {Map} key:EmployeeIF,
 * value: IssueIF[]
 */
export function mapIssuesToEmployees(projects: ProjectIF[] | null): Map<EmployeeIF, IssueIF[]> {
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
  });

  return mapToReturn;
}

/**
 * function to calculate the number of status changes
 * @param issue
 * @returns number of status changes
 */
export function calculateStatusChanges(issue: IssueIF): number {
  if (issue.statusChanges === null) {
    return 0;
  }
  let statusChanges = 0;
  let lastStatus: EmployeeIF | string | null = '';

  issue.statusChanges.forEach((statusChange) => {
    if (statusChange.changes !== null) {
      statusChange.changes.forEach((change) => {
        if (change.changeType === 'status') {
          if (lastStatus !== change.to) {
            statusChanges += 1;
            lastStatus = change.to;
          }
        }
      });
    }
  });

  return statusChanges;
}

/**
 *
 * @param Issues array of issues
 * @param categories array of categories
 * @returns Map with the status and the number of issues
 * @author Nived Stephen
 */
export function getStatusesFromCategories(
  Issues: IssueIF[],
  categories?: Category[]
): Map<string, number> {
  const mapToReturn: Map<string, number> = new Map([]);
  const selectedCategories: Category[] =
    categories === undefined || categories.length === 0
      ? [Category.planning, Category.development, Category.testing, Category.nonDisplayed]
      : categories;

  selectedCategories.forEach((category) => {
    Issues.forEach((issue) => {
      if (statusLists[category].includes(issue.status as string)) {
        const numberOfIssues =
          mapToReturn.get(issue.status as string) === undefined
            ? 0
            : mapToReturn.get(issue.status as string);
        if (numberOfIssues !== undefined) {
          mapToReturn.set(issue.status as string, numberOfIssues + 1);
        } else {
          mapToReturn.set(issue.status as string, 1);
        }
      }
    });
  });

  return mapToReturn;
}
