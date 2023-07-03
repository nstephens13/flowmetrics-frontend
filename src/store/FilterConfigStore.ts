import { defineStore } from 'pinia';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

const useFilterConfigStore = defineStore('filterConfig', {
  state: () => ({
    filter: {
      id: 1,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [],
      },
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
