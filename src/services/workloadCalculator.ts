import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import { Status } from '../model/IssueIF';
import type { IssueDataIF } from '@/model/IssueDataIF';

// just temporary import
import getMockData from '../assets/__mockdata__/mockDataComposer';

/**
 * This function calculate the workload from a project team, and give the
 * result as a Map, where a Employee is the key and as the value a tuple,
 * the amount of assigned Issues that are open but not closed or in progress, the
 * amount of Issues that are in progress, and the amount that are closed
 *
 * @param project Project Object that should be calculated, if null a project
 * with random mock data will be used
 * @returns {Map} key:Employee,
 * value:{ openIssues: number; inProgressIssues: number; closedIssues: number }
 */
function calculateWorkload(project: ProjectIF | null): Map<EmployeeIF, IssueDataIF> {
  const mapToReturn: Map<EmployeeIF, IssueDataIF> = new Map([]);
  const issueSet: Set<IssueIF> = new Set<IssueIF>();
  let projectToCalculate: ProjectIF;

  /**
   * ToDo: decouple the mock data when everything is setup
   */
  if (project === undefined || project === null) {
    projectToCalculate = getMockData();
  } else {
    projectToCalculate = project;
  }

  function extractEmployeeAndUpdateEmployeeMap(issue: IssueIF) {
    // checking if the issue is already done, with a set, and if somebody is assigned
    if (!issueSet.has(issue) && issue.assignedTo !== null && issue.assignedTo !== undefined) {
      // checking if the employee is already with values in the map
      const issueData = mapToReturn.get(issue.assignedTo) ?? {
        openIssues: 0,
        inProgressIssues: 0,
        closedIssues: 0,
      };
      // if there is no date for closure of the ticket, then it is a still open ticket
      if (issue.closedAt === undefined || issue.closedAt === null) {
        if (issue.status === Status.InProgress) {
          mapToReturn.set(issue.assignedTo, {
            openIssues: issueData.openIssues,
            inProgressIssues: issueData.inProgressIssues + 1,
            closedIssues: issueData.closedIssues,
          });
        } else {
          mapToReturn.set(issue.assignedTo, {
            openIssues: issueData.openIssues + 1,
            inProgressIssues: issueData.inProgressIssues,
            closedIssues: issueData.closedIssues,
          });
        }
      } else {
        mapToReturn.set(issue.assignedTo, {
          openIssues: issueData.openIssues,
          inProgressIssues: issueData.inProgressIssues,
          closedIssues: issueData.closedIssues + 1,
        });
      }
      issueSet.add(issue);
    }
  }

  projectToCalculate.issues.forEach((issue) => {
    extractEmployeeAndUpdateEmployeeMap(issue);
  });
  projectToCalculate.milestones.forEach((milestone) => {
    milestone.issues.forEach((issue) => {
      extractEmployeeAndUpdateEmployeeMap(issue);
    });
  });
  return mapToReturn;
}

export default calculateWorkload;
