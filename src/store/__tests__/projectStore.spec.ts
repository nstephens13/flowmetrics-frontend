import { describe, beforeEach, afterEach, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useProjectsStore from '@/store/ProjectStore';

describe('useProjectsStore', () => {
  let store: ReturnType<typeof useProjectsStore>;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useProjectsStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test('should add a project to the store', () => {
    const project = {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      milestones: [],
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
        },
      ],
    };
    store.addProject(project);

    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual(project);
  });

  test('should delete a project from the store', () => {
    const project1 = {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description',
      milestones: [],
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
        },
      ],
    };
    const project2 = {
      id: 2,
      name: 'Project 2',
      description: 'Project 2 description',
      milestones: [],
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
        },
      ],
    };
    store.addProject(project1);
    store.addProject(project2);

    expect(store.projects).toHaveLength(2);

    store.deleteProject(project1.id);

    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual(project2);
  });
});
