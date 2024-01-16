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
    /**
     * Sets the filter configuration.
     *
     * @param {FilterConfigIF} config - The new filter configuration.
     */
    setFilterConfig(config: FilterConfigIF) {
      this.filter = config;
    },

    /**
     * Sets the minimum assignee resting time.
     *
     * @param {number | null} minimumAssigneeRestingTime - The minimum assignee resting time.
     */
    setMinimumAssigneeRestingTime(minimumAssigneeRestingTime: number | null) {
      this.filter.projectFilter.minimumAssigneeRestingTime = minimumAssigneeRestingTime as number;
    },

    /**
     * Sets the minimum number of status changes.
     *
     * @param {number} minimumNumberOfStatusChanges - The minimum number of status changes.
     */
    setMinimumNumberOfStatusChanges(minimumNumberOfStatusChanges: number) {
      this.filter.projectFilter.minimumNumberOfStatusChanges = minimumNumberOfStatusChanges;
    },

    /**
     * Sets the issue status include filter.
     *
     * @param {string[]} issueStatusIncludeFilter - The issue status include filter.
     */
    setIssueStatusIncludeFilter(issueStatusIncludeFilter: string[]) {
      this.filter.projectFilter.issueStatusIncludeFilter = issueStatusIncludeFilter;
    },
  },
});

export default useFilterConfigStore;
