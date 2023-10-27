import { describe, beforeEach, afterEach, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useProjectsStore from '@/store/ProjectStore';

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
          lastStatusChange: null,
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
          lastStatusChange: null,
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
          lastStatusChange: null,
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
          lastStatusChange: null,
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
          lastStatusChange: null,
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
          lastStatusChange: null,
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
