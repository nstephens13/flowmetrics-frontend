import { DateTime, Duration } from 'luxon';
import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import { Category, statusLists } from '@/assets/__mockdata__/IssueProps/statusLists';
import slaRulesStore from '@/store/slaRulesStore';

/**
 * @brief function to calculate the amount of issues that fulfills sla rules
 *
 * @param project project to analyze
 * @returns number of complied sla rules of one issue
 */
function numberOfIssueThatFulfillsSlaRules(project: ProjectIF): number {
  const category = slaRulesStore().getCategoriesContainingProject(project.id as number);
  const { rules } = category;
  const { issues } = project;
  return issues.filter((issue) =>
    rules.some((rule) => rule.issueType.includes(issue.issueType as string))
  ).length;
}

/**
 * @brief returns the amount of times sla rules are found in issues
 *
 * @param project project to analyze
 * @returns number of sla rules
 */
function getNumberOfSlaRulesOfProject(project: ProjectIF): number {
  if (!project || Object.keys(project).length === 0) {
    return slaRulesStore().getCategoriesContainingProject(project.id as number).rules.length;
  }
  return 0;
}

/**
 * @brief The Function calculates the amount of sla rules complied in a project
 *
 * @param project analyzed project
 * @returns percentile of complied Sla rules, without digits after the comma
 */
export function getPercentageSlaRulesComplied(project: ProjectIF): string {
  if (!project || Object.keys(project).length === 0 || getNumberOfSlaRulesOfProject(project) === 0)
    return '0 %';
  return `${Math.trunc(
    (numberOfIssueThatFulfillsSlaRules(project) / getNumberOfSlaRulesOfProject(project)) * 100
  )} %`;
}

/**
 * @brief calculates the average solving time of issues
 *
 * @param issues issues to analyze
 * @returns average solving time of issues
 * @author Nived Stephen
 */
export function calculateAverageSolvingTime(issues: IssueIF[]): Duration | null {
  if (issues.length === 0) return null;
  const totalRestingTime = issues.reduce((total: number, issue: IssueIF) => {
    if (
      statusLists[Category.nonDisplayed].includes(issue.status as string) &&
      issue.statusChanges !== null
    ) {
      const createdAt = DateTime.fromJSDate(issue.createdAt as Date);

      if (issue.statusChanges === null || issue.statusChanges.length === 0) return total;
      const statusRestingTime = DateTime.fromJSDate(
        issue.statusChanges[issue.statusChanges.length - 1].created as Date
      );
      return total + statusRestingTime.diff(createdAt).as('milliseconds');
    }
    return total;
  }, 0);

  const count = issues.reduce((totalCount, issue) => {
    if (statusLists[Category.nonDisplayed].includes(issue.status as string)) {
      return totalCount + 1;
    }
    return totalCount;
  }, 0);
  return count > 0 ? Duration.fromMillis(totalRestingTime / count) : null;
}
