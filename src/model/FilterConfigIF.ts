import type { Status } from '@/model/IssueIF';

export interface ProjectFilterConfigIF {
  issueStatusIncludeFilter: Status[];
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
