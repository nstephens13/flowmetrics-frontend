import { describe, expect, test, afterEach, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useProjectsStore from '@/store/ProjectStore';
import type { ProjectIF } from '@/model/ProjectIF';

// Test Project Data
const project1: ProjectIF = {
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
      assignedTo: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
      },
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
      assignedTo: {
        id: 6,
        firstName: 'Gabi',
        lastName: 'Winkler',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      statusChanges: null,
      assignedSLARule: null,
      lastStatusChange: null,
    },
  ],
};
const project2: ProjectIF = {
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
      assignedTo: {
        id: 7,
        firstName: 'Franzi',
        lastName: 'Siemens',
      },
      createdBy: {
        id: 8,
        firstName: 'Helmut',
        lastName: 'Freiherr',
      },
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
      assignedTo: {
        id: 6,
        firstName: 'Gabi',
        lastName: 'Winkler',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      statusChanges: null,
      assignedSLARule: null,
      lastStatusChange: null,
    },
  ],
};

describe('useProjectStore', () => {
  let store: ReturnType<typeof useProjectsStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  afterEach(() => {
    store.$reset();
  });
  test('should add a project to the Project store', () => {
    store = useProjectsStore();
    store.addProject(project1);
    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual(project1);
  });
  test('should add multiple projects to the Project store', () => {
    store = useProjectsStore();
    store.addProject(project1);
    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual(project1);
    store.addProject(project2);
    expect(store.projects).toHaveLength(2);
    expect(store.projects[1]).toEqual(project2);
  });
  test('should delete a project from the Project store', () => {
    store = useProjectsStore();
    store.addProject(project1);
    store.addProject(project2);
    expect(store.projects).toHaveLength(2);
    store.deleteProject(project1.id);
    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual(project2);
  });
  test('should not delete a project from the Project store if the id is not found', () => {
    store = useProjectsStore();
    store.addProject(project1);
    store.addProject(project2);
    expect(store.projects).toHaveLength(2);
    store.deleteProject(3);
    expect(store.projects).toHaveLength(2);
  });
  test('should return all projects from the Project store', () => {
    store = useProjectsStore();
    store.addProject(project1);
    store.addProject(project2);
    expect(store.projects).toHaveLength(2);
    expect(store.getProjects).toEqual([project1, project2]);
  });
});
