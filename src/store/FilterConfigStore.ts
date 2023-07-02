import { defineStore } from 'pinia';
import type { FilterConfigIF } from '@/model/FilterConfigIF';
import { devStatusList, planningStatusList } from '@/assets/__mockdata__/mockDataComposer';

const useFilterConfigStore = defineStore('filterConfig', {
  state: () => ({
    filter: {
      id: 1,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [...planningStatusList, ...devStatusList],
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
