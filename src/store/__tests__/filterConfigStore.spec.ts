import type { DurationLikeObject } from 'luxon';
import { describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useFilterConfigStore from '../filterConfigStore';
import type { ProjectIF } from '@/model/ProjectIF';
import type { ProjectFilterConfigIF } from '@/model/FilterConfigIF';

// Test Data
const filterConfig1 = {
  id: 1,
  projectFilter: {
    projectsWhiteList: [] as ProjectIF[],
    issueStatusIncludeFilter: [] as string[],
    minimumAssigneeRestingTime: {} as DurationLikeObject,
    minimumNumberOfStatusChanges: 0,
    issueStateIncludeFilter: [] as string[],
  } as ProjectFilterConfigIF,
};

describe('FilterConfigStore Tests', () => {
  setActivePinia(createPinia());
  test(' Filter id should be 1', () => {
    const filterConfigStore = useFilterConfigStore();
    expect(filterConfigStore.getFilterConfig.id).toEqual(1);
  });
  test('setFilterConfig and getFilterConfig', () => {
    const filterConfigStore = useFilterConfigStore();
    filterConfigStore.setFilterConfig(filterConfig1);
    expect(filterConfigStore.getFilterConfig).toEqual(filterConfig1);
  });
  test('setMinimumAssigneeRestingTime', () => {
    const filterConfigStore = useFilterConfigStore();
    filterConfigStore.setMinimumAssigneeRestingTime(1);
    expect(filterConfigStore.getFilterConfig.projectFilter.minimumAssigneeRestingTime).toEqual(1);
  });
  test('setMinimumNumberOfStatusChanges', () => {
    const filterConfigStore = useFilterConfigStore();
    filterConfigStore.setMinimumNumberOfStatusChanges(1);
    expect(filterConfigStore.getFilterConfig.projectFilter.minimumNumberOfStatusChanges).toEqual(1);
  });
  test('setIssueStatusIncludeFilter', () => {
    const filterConfigStore = useFilterConfigStore();
    filterConfigStore.setIssueStatusIncludeFilter(['test']);
    expect(filterConfigStore.getFilterConfig.projectFilter.issueStatusIncludeFilter).toEqual([
      'test',
    ]);
  });
});
