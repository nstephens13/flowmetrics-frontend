import { describe, expect, test } from 'vitest';
import getMockData, {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '../../assets/__mockdata__/mockDataComposer';
import type { FilterConfigIF } from '../../model/FilterConfigIF';
import type { IssueIF } from '../../model/IssueIF';
import filterProjectThatHasTheAllowedStatus from '../filter/IssuesStateFilter';

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
        issueStatusIncludeFilter: [...planningStatusList, ...devStatusList],
      },
    };

    // when
    const filteredProject = filterProjectThatHasTheAllowedStatus(project, filterConfig);

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
