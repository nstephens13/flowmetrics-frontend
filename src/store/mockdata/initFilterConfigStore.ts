import useFilterConfigStore from '@/store/filterConfigStore';
import type { ProjectIF } from '@/model/ProjectIF';
import type { ProjectFilterConfigIF } from '@/model/FilterConfigIF';

export default function initFilterConfigStore() {
  const filterConfigStore = useFilterConfigStore();
  filterConfigStore.setFilterConfig({
    id: 1,
    projectFilter: {
      projectsWhiteList: [] as ProjectIF[],
      issueStatusIncludeFilter: [] as string[],
    } as ProjectFilterConfigIF,
  });
}
