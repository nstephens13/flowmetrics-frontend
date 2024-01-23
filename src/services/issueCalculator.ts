import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import getMockData from '../assets/__mockdata__/mockDataComposer';
import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';

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
 * Calculate the remaining reaction time for an issue.
 *
 * @param issue - The issue for which to calculate the remaining reaction time.
 * @returns [boolean, number] - A tuple containing a boolean indicating whether the issue has an SLA rule,
 * and the remaining reaction time in seconds.
 */
export function calculateRemainingReactionTime(issue: IssueIF): [boolean, number] {
  if (!issue.createdAt || !issue.assignedSlaRule) {
    return [false, 0];
  }

  // Find the shortest reaction time in the SLA rules
  const shortestReactionTime = issue.assignedSlaRule.reduce((minTime: number | null, rule) => {
    if (
      rule.reactionTimeInDays !== null &&
      (minTime === null || rule.reactionTimeInDays < minTime)
    ) {
      return rule.reactionTimeInDays;
    }
    return minTime;
  }, null);

  // If no reaction time is found, return 0
  if (shortestReactionTime === null) {
    return [false, 0];
  }

  // Calculate the expiration date based on the shortest reaction time
  const expirationDate = new Date(issue.createdAt);
  expirationDate.setDate(expirationDate.getDate() + shortestReactionTime);

  // Calculate the remaining time in seconds
  const currentDate = new Date();
  const remainingTimeInSeconds = Math.floor(
    (expirationDate.getTime() - currentDate.getTime()) / 1000
  );

  return [true, remainingTimeInSeconds];
}
/**
 * Returns the remaining time in hours and days
  Returns string 'expired' , when remaining time = 0 returns empty string, when issue has no Sla Rule
 * @param issue An instance of IssueIF or null
*  @function calls calculateRemainingReactionTime and computes time
 * @returns The formatted reaction time in hours and days
 */

export function calculateRemainingTime(issue: IssueIF): string {
  const [hasSlaRule, remainingTimeInSeconds] = calculateRemainingReactionTime(issue);

  if (!hasSlaRule) {
    return ''; // Return an empty string if there's no SLA rule or the time has expired
  }
  if (hasSlaRule && remainingTimeInSeconds <= 0) {
    return 'Expired';
  }

  const remainingDays = Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
  const remainingHours = Math.floor((remainingTimeInSeconds % (60 * 60 * 24)) / (60 * 60));

  if (remainingDays > 1) {
    return `${remainingDays} days`;
  }
  return `${remainingHours} hours`;
}

// function to check if issue has an assigned SLA rule
export function hasSlaRule(issue: IssueIF): boolean {
  return issue.assignedSlaRule !== null;
}

// print assigned SLA rule names of issue
export function printSlaRuleNames(issue: IssueIF): string {
  if (issue.assignedSlaRule === null) {
    return '';
  }
  return issue.assignedSlaRule.map((rule) => rule.name).join(', ');
}

// function to calculate the status changes of an issue from the changeLog
// the status changes are calculated by the switch between the statuses
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
 * @returns Map with the status and the number of issues
 */
export function getStatusesfromIssues(Issues: IssueIF[]): Map<string, number> {
  const mapToReturn: Map<string, number> = new Map([]);
  // write code to get all the statuses from the issue status and return a map with the status and the number of issues
  Issues.forEach((issue) => {
    const numberOfIssues =
      mapToReturn.get(issue.status as string) === undefined
        ? 0
        : mapToReturn.get(issue.status as string);
    if (numberOfIssues !== undefined) {
      mapToReturn.set(issue.status as string, numberOfIssues + 1);
    } else {
      mapToReturn.set(issue.status as string, 1);
    }
  });
  return mapToReturn;
}

/**
 *
 * @param Issues array of issues
 * @param categories array of categories
 * @returns Map with the status and the number of issues
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
  const difference: number =
    currentTime.valueOf() -
    (issue.statusChanges[issue.statusChanges.length - 1].created?.valueOf() ?? 0);
  if (difference >= 86400000) {
    const days: number = difference / 86400000;
    return Number(days.toFixed(0));
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
