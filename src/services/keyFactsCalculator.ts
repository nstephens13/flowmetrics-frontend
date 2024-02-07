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
  const categories = slaRulesStore().getCategoriesContainingProject(project.id as number);
  const rules = categories.flatMap((category) => category.rules);
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
    const categories = slaRulesStore().getCategoriesContainingProject(project.id);
    return categories.flatMap((category) => category.rules).length;
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

function calculateTotalSolvingTime(issues: IssueIF[]): Duration {
  return issues.reduce((acc: Duration<true>, issue) => {
    if (issue.createdAt && issue.statusChanges) {
      const lastStatusChangeElement = issue.statusChanges[issue.statusChanges.length - 1];
      if (lastStatusChangeElement.created === null) return acc;

      const createdDateString = issue.createdAt as unknown as string;
      const lastStatusChangeDateString = lastStatusChangeElement.created as unknown as string;

      if (createdDateString === '' || lastStatusChangeDateString === '') return acc;

      const createdDate = DateTime.fromISO(createdDateString);
      const lastStatusChangeDate = DateTime.fromISO(lastStatusChangeDateString);

      const solvingTime = lastStatusChangeDate.diff(createdDate);

      return acc.plus(solvingTime);
    }

    return acc;
  }, Duration.fromMillis(0));
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
  const issuesClosed = issues.filter(
    (issue) => issue.status !== null && statusLists[Category.nonDisplayed].includes(issue.status)
  );
  const totalSolvingTime = calculateTotalSolvingTime(issuesClosed);
  return issuesClosed.length > 0
    ? Duration.fromMillis(totalSolvingTime.as('millisecond') / issuesClosed.length)
    : null; // Fix: Use dividedBy() method
}
