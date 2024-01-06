import { Duration } from 'luxon';
import { Category, statusLists } from '@/assets/__mockdata__/StatusLists';
import type { IssueIF } from '@/model/Issue/IssueIF';

export default function calculateStateAverageRestingTime(
  issues: IssueIF[] | undefined,
  category: Category
): string {
  if (!issues) return '-';
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
      !statusLists[category].includes(issue.status as string)
    ) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);

  return count > 0
    ? Duration.fromMillis(totalRestingTime / count)
        .toFormat("d 'days' h 'hours' m 'minutes'")
        .toString()
    : '-';
}
