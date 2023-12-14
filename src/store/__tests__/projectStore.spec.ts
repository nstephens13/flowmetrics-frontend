import { describe, expect, test, afterEach, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useProjectsStore from '../projectStore';
import type { ProjectIF } from '@/model/ProjectIF';

// Test Project Data
const project1: ProjectIF = {
  id: 1,
  name: 'Project 1',
  description: 'Project 1 description',
  slaSubscriber: null,
  issues: [
    {
      id: 1,
      status: 'open',
      name: 'Issue 1',
      description: 'Issue 1 description',
      assignedTo: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
        emailAddress: 'bern.mustermann@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'bmustermann',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
        emailAddress: 'bern.mustermann@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'bmustermann',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      assignedSlaRule: null,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: null,
      statusChanges: null,
    },
    {
      id: 3,
      status: 'in progress',
      name: 'Issue 3',
      description: 'Issue 3 description',
      assignedTo: {
        id: 6,
        firstName: 'Gabi',
        lastName: 'Winkler',
        emailAddress: 'gabi.winkler@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'gwinkler',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
        emailAddress: 'bern.mustermann@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'bmustermann',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      assignedSlaRule: null,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: null,
      statusChanges: null,
    },
  ],
};
const project2: ProjectIF = {
  id: 2,
  name: 'Project 2',
  description: 'Project 2 description',
  slaSubscriber: null,
  issues: [
    {
      id: 5,
      status: 'open',
      name: 'Issue 5',
      description: 'Issue 5 description',
      assignedTo: {
        id: 7,
        firstName: 'Franzi',
        lastName: 'Siemens',
        emailAddress: 'franzi.siemens@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'fsiemens',
      },
      createdBy: {
        id: 8,
        firstName: 'Helmut',
        lastName: 'Freiherr',
        emailAddress: 'helmut.freiherr@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'hfreiherr',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      assignedSlaRule: null,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: null,
      statusChanges: null,
    },
    {
      id: 3,
      status: 'in progress',
      name: 'Issue 3',
      description: 'Issue 3 description',
      assignedTo: {
        id: 6,
        firstName: 'Gabi',
        lastName: 'Winkler',
        emailAddress: 'gabi.winkle@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'gwinkler',
      },
      createdBy: {
        id: 4,
        firstName: 'Bernd',
        lastName: 'Mustermann',
        emailAddress: 'bern.mustermann@email.com',
        status: 'active',
        avatarUrl: 'none',
        key: 'bmustermann',
      },
      dueTo: new Date('2021-01-01'),
      createdAt: new Date('2021-01-01'),
      closedAt: new Date('2021-01-02'),
      assignedSlaRule: null,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: null,
      statusChanges: null,
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
