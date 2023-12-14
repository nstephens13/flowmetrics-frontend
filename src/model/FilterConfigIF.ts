import type { ProjectIF } from '@/model/ProjectIF';

export interface ProjectFilterConfigIF {
  projectsWhiteList: ProjectIF[];
  issueStatusIncludeFilter: string[];
  issueStateIncludeFilter: string[];
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
