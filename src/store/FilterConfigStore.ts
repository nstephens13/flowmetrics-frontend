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
  },
});

export default useFilterConfigStore;
