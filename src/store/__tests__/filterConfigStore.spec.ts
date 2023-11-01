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
});
