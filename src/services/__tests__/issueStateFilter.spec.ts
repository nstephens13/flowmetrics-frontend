import { describe, assert, test } from 'vitest';
import filterProjectThatHasTheAllowedStatus from '@/services/filter/IssuesStateFilter';
import type { FilterConfigIF } from '@/model/FilterConfigIF';

describe('filterProjectThatHasTheAllowedStatus', () => {
  test('should filter projects based on the allowed status', () => {
    const projects = [
      {
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
            status: 'In progress',
            name: 'Issue 3',
            description: 'Issue 3 description',
            assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
            createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
            dueTo: new Date('2021-01-01'),
            createdAt: new Date('2021-01-01'),
            closedAt: new Date('2021-01-02'),
          },
        ],
      },
      {
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
            status: 'In progress',
            name: 'Issue 3',
            description: 'Issue 3 description',
            assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
            createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
            dueTo: new Date('2021-01-01'),
            createdAt: new Date('2021-01-01'),
            closedAt: new Date('2021-01-02'),
          },
        ],
      },
    ];

    const filterConfig: FilterConfigIF = {
      id: 4,
      projectFilter: {
        projectsWhiteList: projects,
        issueStatusIncludeFilter: ['Open', 'In progress'],
      },
    };

    const filteredProjects = filterProjectThatHasTheAllowedStatus(projects, filterConfig);

    assert.deepStrictEqual(filteredProjects, [
      {
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
            status: 'In progress',
            name: 'Issue 3',
            description: 'Issue 3 description',
            assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
            createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
            dueTo: new Date('2021-01-01'),
            createdAt: new Date('2021-01-01'),
            closedAt: new Date('2021-01-02'),
          },
        ],
      },
      {
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
            status: 'In progress',
            name: 'Issue 3',
            description: 'Issue 3 description',
            assignedTo: { id: 6, firstName: 'Gabi', lastName: 'Winkler' },
            createdBy: { id: 4, firstName: 'Bernd', lastName: 'Mustermann' },
            dueTo: new Date('2021-01-01'),
            createdAt: new Date('2021-01-01'),
            closedAt: new Date('2021-01-02'),
          },
        ],
      },
    ]);
  });
});
