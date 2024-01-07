import { Duration } from 'luxon';
import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';
import type { IssueIF } from '@/model/Issue/IssueIF';

export function calculateStateAverageRestingTime(
  issues: IssueIF[] | undefined,
  category: Category
): Duration | null {
  if (!issues) return null;
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

export function calculateAverageRestingTime(issues: IssueIF[] | undefined): Duration | null {
  if (!issues) return null;
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

// function to get the percent of increase or decrease of the resting time in a category compared to the average resting time and return the percent with + or - sign in front to indicate the increase or decrease
export function getPercentOfIncreaseOrDecrease(
  issues: IssueIF[] | undefined,
  category: Category
): string {
  if (!issues) return '';
  const averageRestingTime = calculateAverageRestingTime(issues);
  const stateAverageRestingTime = calculateStateAverageRestingTime(issues, category);
  if (averageRestingTime === null || stateAverageRestingTime === null) return '';
  const percent =
    ((stateAverageRestingTime.as('milliseconds') - averageRestingTime.as('milliseconds')) /
      averageRestingTime.as('milliseconds')) *
    100;
  return percent > 0 ? ` +${percent.toFixed(2)}% ` : ` ${percent.toFixed(2)}% `;
}
