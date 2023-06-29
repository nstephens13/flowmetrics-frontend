import { defineStore } from 'pinia';
import { Status } from '@/model/IssueIF';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

const useFilterConfigStore = defineStore('filterConfig', {
  state: () => ({
    filter: {
      id: 1,
      projectFilter: {
        issueStatusIncludeFilter: ['Open', 'In Progress'],
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
