import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { devStatusList, planningStatusList } from '../../assets/__mockdata__/mockDataComposer';
import { useFilterConfigStore, useProjectsStore, useSLAStore } from '@/store/FlowmetricsStore';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

describe('Filter Configuration Store', () => {
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

describe('useProjectsStore', () => {
  let store: ReturnType<typeof useProjectsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    store.$reset();
  });

  test('should add a project to the store', () => {
    store = useProjectsStore();
    const project = {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      milestones: [],
      slaSubscriber: null,
      issues: [
        {
          id: 1,
          status: 'Open',
          name: 'Issue 1',
          description: 'Issue 1 description',
          assignedTo: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
        {
          id: 3,
          status: 'In Progress',
          name: 'Issue 3',
          description: 'Issue 3 description',
          assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
          createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
      ],
    };
    store.addProject(project);

    expect(store.projects).toHaveLength(5);
    expect(store.projects[4]).toEqual(project);
  });

  test('should delete a project from the store', () => {
    store = useProjectsStore();
    const project1 = {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      milestones: [],
      slaSubscriber: null,
      issues: [
        {
          id: 1,
          status: 'Open',
          name: 'Issue 1',
          description: 'Issue 1 description',
          assignedTo: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
        {
          id: 3,
          status: 'In Progress',
          name: 'Issue 3',
          description: 'Issue 3 description',
          assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
          createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
      ],
    };
    const project2 = {
      id: 2,
      name: 'Project 2',
      description: 'Project 2 description',
      milestones: [],
      slaSubscriber: null,
      issues: [
        {
          id: 5,
          status: 'Open',
          name: 'Issue 5',
          description: 'Issue 5 description',
          assignedTo: { id: 7, firstName: 'Franzi', lastName: 'Siemens' },
          createdBy: { id: 8, firstName: 'Helmut', lastName: 'Freiherr' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
        {
          id: 3,
          status: 'In Progress',
          name: 'Issue 3',
          description: 'Issue 3 description',
          assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
          createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
          dueTo: new Date('2021-01-01'),
          createdAt: new Date('2021-01-01'),
          closedAt: new Date('2021-01-02'),
          statusChanges: null,
          assignedSLARule: null,
        },
      ],
    };
    store.addProject(project1);
    store.addProject(project2);

    expect(store.projects).toHaveLength(6);

    store.deleteProject(project1.id);

    expect(store.projects).toHaveLength(5);
    expect(store.projects[4]).toEqual(project2);
  });
});

describe('SLA Store', () => {
  setActivePinia(createPinia());

  const store = useSLAStore();
  test('has 3 Subscribers in the Beginning', () => {
    expect(store.subscriber.length).toEqual(3);
  });
  test('has 3 Rules in the Beginning', () => {
    expect(store.rules.length).toEqual(3);
  });
  const subscriber: SLASubscriber = {
    id: null,
    name: 'New Subscriber',
    description: 'New Description',
  };
  test('adds Subscribers', () => {
    store.addSubscriber(subscriber);

    expect(store.subscriber).toContain(subscriber);
  });
  const rule: SLARule = {
    id: null,
    name: 'New Rule',
    durationInDays: 3,
    expirationDate: null,
    maxAssignedEmployees: 5,
    occurredIn: null,
  };
  test('adds Rules', () => {
    store.addRule(rule);

    expect(store.rules).toContain(rule);
  });
  test('adds new Configuration', () => {
    expect(store.slaCategories.length).toEqual(0);
    store.initializeCategories();

    expect(store.slaCategories.length).toBeGreaterThanOrEqual(3);
  });
  const category: SLACategory = {
    id: null,
    name: 'New Category',
    rule,
    subscriber,
  };
  test('adds new Configuration', () => {
    store.addSLACategory(category);

    expect(store.slaCategories).toContain(category);
  });

  test('has 4 Subscribers now', () => {
    expect(store.subscriber.length).toEqual(4);
  });
  test('has 4 Rules now', () => {
    expect(store.rules.length).toEqual(4);
  });
  test('remove last category item', () => {
    store.deleteSLACategory(category);

    expect(store.slaCategories.findIndex((c) => c.id === category?.id)).toBe(-1);
  });
});
