import { Duration } from 'luxon';
import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';
import type { IssueIF } from '@/model/Issue/IssueIF';

/**
 * Function to calculate the average resting time for the issues in a category
 *
 * @param issues the issues to calculate the average resting time
 * @param category the category to calculate the average resting time
 * @returns the average resting time for the issues in a category
 * @author Nived Stephen
 */
export function calculateStateAverageRestingTime(
  issues: IssueIF[],
  category: Category
): Duration | null {
  if (!issues || issues.length === 0) return null;
  const totalRestingTime = issues.reduce((total, issue) => {
    if (
      issue.statusRestingTime !== null &&
      statusLists[category].includes(issue.status as string)
    ) {
      const duration = Duration.fromObject(issue.statusRestingTime);
      return total + duration.as('milliseconds');
    }
    return total;
  }, 0);

  const count = issues.reduce((totalCount, issue) => {
    if (
      issue.assigneeRestingTime !== null &&
      statusLists[category].includes(issue.status as string)
    ) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);

  return count > 0 ? Duration.fromMillis(totalRestingTime / count) : null;
}

/**
 * Function to calculate the average resting time for the issues
 *
 * @param issues the issues to calculate the average resting time
 * @returns the average resting time for the issues
 * @author Nived Stephen
 */
export function calculateAverageRestingTime(issues: IssueIF[]): Duration | null {
  if (!issues || issues.length === 0) return null;
  const totalRestingTime = issues.reduce((total, issue) => {
    if (
      issue.statusRestingTime !== null &&
      !statusLists[Category.nonDisplayed].includes(issue.status as string)
    ) {
      const duration = Duration.fromObject(issue.statusRestingTime);
      return total + duration.as('milliseconds');
    }
    return total;
  }, 0);

  const count = issues.reduce((totalCount, issue) => {
    if (
      issue.assigneeRestingTime !== null &&
      !statusLists[Category.nonDisplayed].includes(issue.status as string)
    ) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);

  return count > 0 ? Duration.fromMillis(totalRestingTime / count) : null;
}

/**
 * Function to calculate the percent of increase or decrease for the average resting time
 *
 * @param issues the issues to calculate the percent of increase or decrease
 * @param category the category to calculate the percent of increase or decrease
 * @returns the percent of increase or decrease
 * @author Nived Stephen
 */
export function getPercentOfIncreaseOrDecrease(issues: IssueIF[], category: Category): string {
  if (!issues || issues.length === 0) return '';
  const averageRestingTime = calculateAverageRestingTime(issues);
  const stateAverageRestingTime = calculateStateAverageRestingTime(issues, category);
  if (averageRestingTime === null || stateAverageRestingTime === null) return '';
  const percent =
    ((stateAverageRestingTime.as('milliseconds') - averageRestingTime.as('milliseconds')) /
      averageRestingTime.as('milliseconds')) *
    100;
  return percent > 0 ? ` +${percent.toFixed(2)}% ` : ` ${percent.toFixed(2)}%`;
}
