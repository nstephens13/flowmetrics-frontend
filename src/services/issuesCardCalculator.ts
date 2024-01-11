import { statusLists, Category } from '@/assets/__mockdata__/StatusLists';
import type { ProjectIF } from '@/model/ProjectIF';

/**
 * Function to get the number of issues in a category
 * @param category the category to get the number of issues
 * @param project the project to get the number of issues
 * @returns the number of issues in a category
 * @author Nived Stephen
 */
export function getIssueCountFromCategory(category: Category, project: ProjectIF): number {
  if (!project || Object.keys(project).length === 0) return 0;
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    if (
      project.issues[i].status &&
      statusLists[category].includes(project.issues[i].status as string)
    )
      count += 1;
  }
  return count;
}

/**
 * Function to get the total number of open issues in a category
 *
 * @param project the project to get the number of issues
 * @returns the total number of open issues
 * @author Nived Stephen
 */
export function getOpenIssueCount(project: ProjectIF): number {
  if (typeof project !== 'undefined' && Object.keys(project).length !== 0 && project.issues) {
    return project.issues.length - getIssueCountFromCategory(Category.nonDisplayed, project);
  }
  return 0;
}
