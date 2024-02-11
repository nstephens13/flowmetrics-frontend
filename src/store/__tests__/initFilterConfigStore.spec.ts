import { createPinia, setActivePinia } from 'pinia';
import useFilterConfigStore from '@/store/filterConfigStore';
import {
  getAllProjects,
  getIssueStatuses,
  initFilterConfigStore,
} from '@/store/mockdata/initFilterConfigStore';
import initProjectStore from '../mockdata/initProjectStore';

describe('initFilterConfigStore', () => {
  setActivePinia(createPinia());
  test('should initialize the filter config store', () => {
    const filterConfigStore = useFilterConfigStore();
    initProjectStore();
    initFilterConfigStore();
    expect(filterConfigStore.getFilterConfig.id).toEqual(1);
    expect(filterConfigStore.getFilterConfig.projectFilter.projectsWhiteList).toEqual(
      getAllProjects()
    );
    expect(filterConfigStore.getFilterConfig.projectFilter.issueStatusIncludeFilter).toEqual(
      getIssueStatuses(getAllProjects())
    );
  });
});
