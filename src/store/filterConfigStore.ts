import type { DurationLikeObject } from 'luxon';
import { defineStore } from 'pinia';
import type { FilterConfigIF, ProjectFilterConfigIF } from '@/model/FilterConfigIF';
import type { ProjectIF } from '@/model/ProjectIF';

const useFilterConfigStore = defineStore('filterConfig', {
  state: () => ({
    filter: {
      id: 1,
      projectFilter: {
        projectsWhiteList: [] as ProjectIF[],
        issueStatusIncludeFilter: [] as string[],
        minimumAssigneeRestingTime: {} as DurationLikeObject,
        minimumNumberOfStatusChanges: 0,
        issueStateIncludeFilter: [] as string[],
      } as ProjectFilterConfigIF,
    } as FilterConfigIF,
  }),

  getters: {
    getFilterConfig(): FilterConfigIF {
      return this.filter;
    },
  },

  actions: {
    setFilterConfig(config: FilterConfigIF) {
      this.filter = config;
    },
    setMinimumAssigneeRestingTime(minimumAssigneeRestingTime: number | null) {
      this.filter.projectFilter.minimumAssigneeRestingTime = minimumAssigneeRestingTime as number;
    },
    setMinimumNumberOfStatusChanges(minimumNumberOfStatusChanges: number) {
      this.filter.projectFilter.minimumNumberOfStatusChanges = minimumNumberOfStatusChanges;
    },
    setIssueStatusIncludeFilter(issueStatusIncludeFilter: string[]) {
      this.filter.projectFilter.issueStatusIncludeFilter = issueStatusIncludeFilter;
    },
  },
});

export default useFilterConfigStore;
