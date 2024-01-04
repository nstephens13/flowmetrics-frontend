import type { ProjectIF } from '@/model/ProjectIF';

export interface ProjectFilterConfigIF {
  projectsWhiteList: ProjectIF[];
  issueStatusIncludeFilter: string[];
  minimumAssigneeRestingTime: number;
  minimumNumberOfStatusChanges: number;
  minimumStatusRestingTime: number;
  issueStateIncludeFilter: string[];
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
