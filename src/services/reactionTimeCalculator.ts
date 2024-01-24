import { DateTime, type DurationLikeObject } from 'luxon';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { CategoryIF } from '@/model/Sla/CategoryIF';

/**
 * Function to calculate the reaction time for an issue
 * @param creationDate The date when the issue was created
 * @param reactionTime The reaction time to be added to the creation date
 * @returns The date when the issue should be reacted to
 * @author Nived Stephen
 */
function calculateReactionTimeFromCreationDate(
  creationDate: Date,
  reactionTime: DurationLikeObject
): DateTime {
  return DateTime.fromJSDate(creationDate).plus(reactionTime);
}

/**
 * Function to get the reaction time for an issue based on the category rules
 * @param category Category to be checked
 * @param issue Issue to be checked
 * @returns The reaction time for the issue based on the category rules, or a message if no rule is found or the issue type is null
 * @author Nived Stephen
 */
export default function getReactionTimeForIssue(category: CategoryIF, issue: IssueIF): string {
  if (category !== undefined && issue.issueType !== null && category.rules.length > 0) {
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
  return 'No rule found';
}
