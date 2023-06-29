import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import { Status } from '../model/IssueIF';

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
 * value:{ planning: number; development: number; testing: number }
 */
function calculateWorkload(
  project: ProjectIF | null,
): Map<EmployeeIF, { planning: number; development: number; testing: number }> {
  const mapToReturn: Map<
  EmployeeIF,
  { planning: number; development: number; testing: number }
  > = new Map([]);
  const issueSet: Set<IssueIF> = new Set<IssueIF>();
  let projectToCalculate: ProjectIF;

  /**
   * ToDo: decouple the mock data when everything is setup
   */
  if (project === undefined || project === null) {
    projectToCalculate = getMockData(3);
  } else {
    projectToCalculate = project;
  }

  function extractEmployeeAndUpdateEmployeeMap(issue: IssueIF) {
    // checking if the issue is already done, with a set, and if somebody is assigned
    if (!issueSet.has(issue) && issue.assignedTo !== null && issue.assignedTo !== undefined) {
      let numberPlannedTickets: number;
      let numberInDevTickets: number;
      let numberInTestingTickets: number;

      // checking if the employee is already with values in the map
      const tuple:
      | { planning: number; development: number; testing: number }
      | undefined = mapToReturn.get(issue.assignedTo);

      // setting the values to zero if the employee isn't in the map already
      if (tuple !== undefined) {
        numberPlannedTickets = tuple.planning;
        numberInDevTickets = tuple.development;
        numberInTestingTickets = tuple.testing;
      } else {
        numberPlannedTickets = 0;
        numberInDevTickets = 0;
        numberInTestingTickets = 0;
      }

      // if there is no date for closure of the ticket, then it is a still open ticket
      if (issue.closedAt === undefined || issue.closedAt === null) {
        if (issue.status === Status.InProgress) {
          mapToReturn.set(issue.assignedTo, {
            planning: numberPlannedTickets,
            development: numberInDevTickets + 1,
            testing: numberInTestingTickets,
          });
        } else {
          mapToReturn.set(issue.assignedTo, {
            planning: numberPlannedTickets + 1,
            development: numberInDevTickets,
            testing: numberInTestingTickets,
          });
        }
      } else {
        mapToReturn.set(issue.assignedTo, {
          planning: numberPlannedTickets,
          development: numberInDevTickets,
          testing: numberInTestingTickets + 1,
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
