import { describe, test, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { devStatusList, planningStatusList } from '../../assets/__mockdata__/mockDataComposer';
import useFilterConfigStore from '../FilterConfigStore';

describe('SLA Store', () => {
  setActivePinia(createPinia());

  test('has a filter with id 1 in it', () => {
    const store = useFilterConfigStore();
    expect(store.filter.id).toEqual(1);
  });
  test('has a filter with id 1 in it', () => {
    const store = useFilterConfigStore();
    expect(store.getFilterConfig).toEqual({
      id: 1,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [],
      },
    });
  });

  test('filter has planningStatusList and devStatusList per default', () => {
    const store = useFilterConfigStore();
    const expectedList: string[] = [...planningStatusList, ...devStatusList];
    store.filter.projectFilter.issueStatusIncludeFilter.forEach((filter) => {
      expect(expectedList.includes(filter)).toEqual(true);
    });
  });

  test("filter has now a filter with id2 and devStatusList isn't included anymore", () => {
    const store = useFilterConfigStore();
    const expectedList: string[] = [...planningStatusList, ...devStatusList];
    store.filter.projectFilter.issueStatusIncludeFilter.forEach((filter) => {
      expect(expectedList.includes(filter)).toEqual(true);
    });
    store.setFilterConfig({
      id: 2,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [...planningStatusList],
      },
    });
    const forbiddenList: string[] = [...devStatusList];
    store.filter.projectFilter.issueStatusIncludeFilter.forEach((filter) => {
      expect(store.filter.id).not.toEqual(1);
      expect(store.filter.id).toEqual(2);
      expect(forbiddenList.includes(filter)).toEqual(false);
    });
  });
});
