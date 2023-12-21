import type { ProjectIF } from '@/model/ProjectIF';

export interface ProjectFilterConfigIF {
  projectsWhiteList: ProjectIF[];
  issueStatusIncludeFilter: string[];
  minimumAssigneeRestingTime: number;
  minimumNumberOfStatusChanges: number;
  minimumStatusRestingTime: number;
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
