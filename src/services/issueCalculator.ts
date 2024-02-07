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

/**
 * Returns the maximum issue count from the given array of issues.
 * If the issues array is empty, the function returns 100.
 * @param issues An array of issues
 * @returns The maximum issue count
 */
export function getIssueCountMax(issues: IssueIF[]): number {
  if (issues.length === 0) {
    return 100;
  }
  return issues.length;
}

/**
 * if time since last status change is null, return 0
 * @param issue an instance of an IssueIF
 * @return returns resting time in hours or if more than 24 hours returns in days
 */
export function printRestingTime(issue: IssueIF): string {
  if (issue.statusChanges == null) {
    return '0';
  }
  const currentTime: Date = new Date();
  const difference: number =
    currentTime.valueOf() -
    (issue.statusChanges[issue.statusChanges.length - 1].created?.valueOf() ?? 0);
  if (difference >= 86400000) {
    return `${(difference / 86400000).toFixed(0).toString()}d`; // returns time in days (86400000 ms = 1 day)
  }
  return `${(difference / 3600000).toFixed(0).toString()}h`; // returns the time in hours (3600000 ms = 1 hour)
}

/**
 * returns resting Time (status) as number in days. returns 0 when days less than 1
 * returns 0, when there are no status changes
 * @param issue an instance of an IssueIF
 * @return returns resting time days as number
 */

export function printRestingDays(issue: IssueIF): number {
  if (issue.statusChanges == null) {
    return 0;
  }
  const currentTime: Date = new Date();

  if (issue.statusChanges.length > 0) {
    const lastStatusChangeDate = issue.statusChanges[issue.statusChanges.length - 1].created;

    if (lastStatusChangeDate !== null) {
      const difference: number = currentTime.valueOf() - lastStatusChangeDate.valueOf();
      if (difference >= 86400000) {
        const days: number = difference / 86400000;
        return Number(days.toFixed(0));
      }
    }
    return currentTime.valueOf();
  }
  return 0;
}

/**
 * Returns the full name of the assigned employee.
 * If the employee is null, it returns an empty string.
 * @param employee An instance of EmployeeIF or null
 * @returns The formatted full name of the employee
 */
export function printAssignedTo(employee: EmployeeIF | null): string {
  const firstName = employee?.firstName ?? '';
  const lastName = employee?.lastName ?? '';
  return `${firstName} ${lastName}`;
}
