import { Duration, type DurationLikeObject } from 'luxon';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { CategoryIF } from '@/model/Sla/CategoryIF';

export default function getReactionTimeForIssue(category: CategoryIF, issue: IssueIF): string {
  if (issue.issueType !== null && category.rules.length > 0) {
    const ruleToBeAssigned = category.rules.find((rule) =>
      rule.issueType.includes(issue.issueType as string)
    );
    if (ruleToBeAssigned !== undefined && ruleToBeAssigned.reactionTime !== null) {
      return Duration.fromObject(ruleToBeAssigned.reactionTime as DurationLikeObject)
        .toFormat("d 'days' h 'hours'")
        .toString();
    }
    return 'No rule found/No reaction time';
  }
  return 'No rule found/Issue type is null';
}
