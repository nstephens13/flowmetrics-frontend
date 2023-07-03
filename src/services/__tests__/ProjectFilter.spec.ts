import { describe, expect, test } from 'vitest';
import getMockData, {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '../../assets/__mockdata__/mockDataComposer';
import type { FilterConfigIF } from '../../model/FilterConfigIF';
import type { IssueIF } from '../../model/IssueIF';
import {
  filterIssuesInProjectWithAStatusWhitelist,
  filterProjectListWithAProjectWhitelist,
} from '../filter/ProjectsFilter';

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
      },
    };

    const originalSet = [project1, project2, project3];

    // when

    const filteredList = filterProjectListWithAProjectWhitelist(originalSet, filter);

    // then
    expect(filteredList.includes(project1)).toBeFalsy();
  });
});
