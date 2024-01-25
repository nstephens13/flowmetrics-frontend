import { describe, expect, test } from 'vitest';
import { Duration } from 'luxon';
import getMockData from '../../assets/__mockdata__/mockDataComposer';
import type { FilterConfigIF, ProjectFilterConfigIF } from '../../model/FilterConfigIF';
import type { IssueIF } from '../../model/Issue/IssueIF';
import {
  filterIssuesInProjectWithAStatusWhitelist,
  filterIssuesMinimumStatusChangesAndRestingTime,
  filterProjectIssuesWithMinimalStatusChanges,
  filterProjectIssuesWithMinimumStatusRestingTime,
  filterProjectListWithAProjectWhitelist,
} from '../filter/ProjectsFilter';
import {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '../Issue';
import type { ChangeLogIF } from '../../model/Issue/ChangeLogIF';

describe('Filter Test', () => {
  test('After Applying Filter the Issues without the allowed Status should be deleted from the IssueArray', () => {
    // given
    const allStatusList = [
      ...planningStatusList,
      ...devStatusList,
      ...testingStatusList,
      ...nonDisplayedStatusList,
    ];
    const firstStatusList = [...planningStatusList, ...devStatusList];
    const lastStatusList = [...testingStatusList, ...nonDisplayedStatusList];
    let issueWithLastStatusFound = false;

    // when

    const project = getMockData(6);

    // then
    expect(Array.isArray(project.issues)).toBeTruthy();
    expect(project.issues.length > 279).toBeTruthy();
    project.issues.forEach((issue: IssueIF) => {
      if (issue.status != null) {
        expect(allStatusList.includes(issue.status));

        if (!firstStatusList.includes(issue.status)) {
          expect(lastStatusList.includes(issue.status));
          issueWithLastStatusFound = true;
        }
      }
    });
    expect(issueWithLastStatusFound).toBe(true);

    // given
    const amountIssuesBeforeFilter = project.issues.length;
    const filterConfig: FilterConfigIF = {
      id: 1,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [...planningStatusList, ...devStatusList],
        minimumAssigneeRestingTime: 0,
        minimumNumberOfStatusChanges: 0,
        issueStateIncludeFilter: [],
        minimumStatusRestingTime: 0,
      },
    };

    // when
    const filteredProject = filterIssuesInProjectWithAStatusWhitelist(project, filterConfig);

    // then
    expect(filteredProject.issues.length < amountIssuesBeforeFilter).toBeTruthy();
    filteredProject.issues.forEach((issue: IssueIF) => {
      if (issue.status != null) {
        expect(firstStatusList.includes(issue.status));
        expect(!lastStatusList.includes(issue.status));
      }
    });
  });
});
describe('Filter Test', () => {
  test('After Applying project Whitelist Filter there should be a correct cut set', () => {
    // given

    const project1 = getMockData(6);
    const project2 = getMockData(2);
    const project3 = getMockData(3);

    const filter: FilterConfigIF = {
      id: 1,
      projectFilter: {
        projectsWhiteList: [project2, project3],
        issueStatusIncludeFilter: [],
        minimumAssigneeRestingTime: 0,
        minimumNumberOfStatusChanges: 0,
        issueStateIncludeFilter: [],
        minimumStatusRestingTime: 0,
      },
    };

    const originalSet = [project1, project2, project3];

    // when

    const filteredList = filterProjectListWithAProjectWhitelist(originalSet, filter);

    // then
    expect(filteredList.includes(project1)).toBeFalsy();
  });
});

describe('filterTests', () => {
  const issuesToFilter: IssueIF[] = [
    {
      id: 0,
      name: '',
      description: null,
      priority: null,
      issueType: null,
      assignedTo: null,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: null,
      assigneeRestingTime: null,
      statusRestingTime: Duration.fromMillis(86400000),
      statusChanges: null,
      assigneeChanges: null,
      state: null,
    } as IssueIF,
    {
      id: 1,
      name: '',
      description: null,
      priority: null,
      issueType: null,
      assignedTo: null,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: null,
      assigneeRestingTime: null,
      statusRestingTime: Duration.fromMillis(86400000), // 1 Day
      state: null,
      statusChanges: [
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
      ],
      assigneeChanges: null,
    } as IssueIF,
    {
      id: 2,
      name: '',
      description: null,
      priority: null,
      issueType: null,
      assignedTo: null,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: null,
      assigneeRestingTime: null,
      statusRestingTime: Duration.fromMillis(259200000), // 3 days
      state: null,
      statusChanges: [
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
      ],
      assigneeChanges: null,
    } as IssueIF,
    {
      id: 3,
      name: '',
      description: null,
      priority: null,
      issueType: null,
      assignedTo: null,
      createdBy: null,
      createdAt: null,
      closedAt: null,
      dueTo: null,
      status: null,
      assigneeRestingTime: null,
      statusRestingTime: Duration.fromMillis(259200000), // 3 Days
      state: null,
      statusChanges: [
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
        {
          id: 0,
          created: null,
          author: null,
          changes: null,
        } as ChangeLogIF,
      ],
      assigneeChanges: null,
    } as IssueIF,
  ];
  test('minimumStatusChangesFilter', () => {
    const filter: FilterConfigIF = {
      id: 0,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [],
        minimumAssigneeRestingTime: 0,
        minimumNumberOfStatusChanges: 2,
        minimumStatusRestingTime: 2,
        issueStateIncludeFilter: [],
      } as ProjectFilterConfigIF,
    } as FilterConfigIF;
    const filteredIssues: IssueIF[] = filterProjectIssuesWithMinimalStatusChanges(
      issuesToFilter,
      filter
    );
    expect(filteredIssues.length).toEqual(2);
    expect(filteredIssues[0].id).toEqual(1);
    expect(filteredIssues[1].id).toEqual(3);
  });
  test('minimumStatusRestingTime', () => {
    const filter: FilterConfigIF = {
      id: 0,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [],
        minimumAssigneeRestingTime: 0,
        minimumNumberOfStatusChanges: 2,
        minimumStatusRestingTime: 2,
        issueStateIncludeFilter: [],
      } as ProjectFilterConfigIF,
    } as FilterConfigIF;
    const filteredIssues: IssueIF[] = filterProjectIssuesWithMinimumStatusRestingTime(
      issuesToFilter,
      filter
    );
    expect(filteredIssues.length).toEqual(2);
    expect(filteredIssues[0].id).toEqual(2);
    expect(filteredIssues[1].id).toEqual(3);
  });
  test('minimumRestingTimeAndChanges', () => {
    const filter: FilterConfigIF = {
      id: 0,
      projectFilter: {
        projectsWhiteList: [],
        issueStatusIncludeFilter: [],
        minimumAssigneeRestingTime: 0,
        minimumNumberOfStatusChanges: 2,
        minimumStatusRestingTime: 2,
        issueStateIncludeFilter: [],
      } as ProjectFilterConfigIF,
    } as FilterConfigIF;
    const filteredIssues: IssueIF[] = filterIssuesMinimumStatusChangesAndRestingTime(
      issuesToFilter,
      filter
    );
    expect(filteredIssues.length).toEqual(1);
    expect(filteredIssues[0].id).toEqual(3);
  });
});
