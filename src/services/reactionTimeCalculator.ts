import { DateTime, type DurationLikeObject } from 'luxon';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { CategoryIF } from '@/model/Sla/CategoryIF';

function calculateReactionTimeFromCreationDate(
  creationDate: Date,
  reactionTime: DurationLikeObject
): DateTime {
  return DateTime.fromJSDate(creationDate).plus(reactionTime);
}

export default function getReactionTimeForIssue(category: CategoryIF, issue: IssueIF): string {
  if (issue.issueType !== null && category.rules.length > 0) {
    const ruleToBeAssigned = category.rules.find((rule) =>
      rule.issueType.includes(issue.issueType as string)
    );
    if (ruleToBeAssigned !== undefined && ruleToBeAssigned.reactionTime !== null) {
      return calculateReactionTimeFromCreationDate(
        issue.createdAt as Date,
        ruleToBeAssigned.reactionTime as DurationLikeObject
      ).toLocaleString(DateTime.DATETIME_FULL);
    }
    return 'No rule found/No reaction time';
  }
  return 'No rule found/Issue type is null';
}
