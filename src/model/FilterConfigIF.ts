export interface ProjectFilterConfigIF {
  issueStatusIncludeFilter: string[];
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
