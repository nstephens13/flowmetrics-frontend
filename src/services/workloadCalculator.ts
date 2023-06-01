import type { Project } from '@/model/Project';
import type { Employee } from '@/model/Employee';
import type { Issue } from '@/model/Issue';

// just temporary import
import { getMockData } from './__mockdata__/mockDataComposer';

/**
 * This function calculate the workload from a project team, and give the
 * result as a Map, where a Employee is the key and as the value a tuple,
 * the amount of open and closed assigned Issues.
 *
 * @param project Project Object that should be calculated
 * @returns {Map} key:Employee, value:{openIssues:number, closedIssues:number}
 */
function calculateWorkload(project: Project): Map<Employee,
{ openIssues: number, closedIssues: number }> {
  const mapToReturn: Map<Employee, { openIssues: number, closedIssues: number }> = new Map([]);
  const issueSet: Set<Issue> = new Set<Issue>();
  let projectToCalculate: Project;

  // ToDo: decouple the mock data when everything is setup
  if (project === undefined || project === null) {
    projectToCalculate = getMockData();
  } else {
    projectToCalculate = project;
  }

  function extractEmployeeAndUpdateEmployeeMap(issue: Issue) {
    // checking if the issue is already done, with a set, and if somebody is assigned
    if (!issueSet.has(issue) && issue.assignedTo !== null && issue.assignedTo !== undefined) {
      let numberOpenTickets: number;
      let numberClosedTickets: number;

      // checking if the employee is already with values in the map
      const tuple:
      { openIssues: number, closedIssues: number } | undefined = mapToReturn.get(issue.assignedTo);

      // setting the values to zero if the employee isn't in the map already
      if (tuple !== undefined) {
        numberOpenTickets = tuple.openIssues;
        numberClosedTickets = tuple.closedIssues;
      } else {
        numberOpenTickets = 0;
        numberClosedTickets = 0;
      }

      // if there is no date for closure of the ticket, then it is a still open ticket
      if (issue.closedAt === undefined || issue.closedAt === null) {
        mapToReturn.set(issue.assignedTo, {
          openIssues: numberOpenTickets + 1,
          closedIssues: numberClosedTickets,
        });
      } else {
        mapToReturn.set(issue.assignedTo, {
          openIssues: numberOpenTickets,
          closedIssues: numberClosedTickets + 1,
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
