import { statusLists, Category } from '@/assets/__mockdata__/StatusLists';
import type { ProjectIF } from '@/model/ProjectIF';

export function getIssueCountfromCategory(
  category: Category,
  project: ProjectIF | undefined
): number {
  if (!project) return 0;
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

export function getOpenIssueCount(project: ProjectIF | undefined): number {
  return project
    ? project.issues.length - getIssueCountfromCategory(Category.nonDisplayed, project)
    : 0;
}
