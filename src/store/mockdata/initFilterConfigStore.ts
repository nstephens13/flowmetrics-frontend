import useFilterConfigStore from '@/store/filterConfigStore';
import { getIssueStatusList, type ProjectIF } from '@/model/ProjectIF';
import type { ProjectFilterConfigIF } from '@/model/FilterConfigIF';
import useProjectsStore from '@/store/projectStore';

export function getAllProjects(): ProjectIF[] {
  const projectStore = useProjectsStore();
  return projectStore.getProjects;
}

export function getIssueStatuses(projects: ProjectIF[]): string[] {
  return getIssueStatusList(projects.flatMap((project) => project.issues));
}
export function initFilterConfigStore() {
  const filterConfigStore = useFilterConfigStore();
  filterConfigStore.setFilterConfig({
    id: 1,
    projectFilter: {
      projectsWhiteList: getAllProjects(),
      issueStatusIncludeFilter: getIssueStatuses(getAllProjects()),
      minimumAssigneeRestingTime: 0,
      minimumNumberOfStatusChanges: 0,
      issueStateIncludeFilter: [] as string[],
    } as ProjectFilterConfigIF,
  });
}
