import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';

import type { IssueDataIF } from '@/model/IssueDataIF';

// just temporary import
import {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '@/assets/__mockdata__/mockDataComposer';

const UnassignedEmployee: EmployeeIF = {
  id: 0,
  firstName: 'Unassigned',
  lastName: 'Employee'
}
/**
 * This function calculate the workload from a project team, and give the
 * result as a Map, where a Employee is the key and as the value a tuple,
 * the amount of assigned Issues that are open but not closed or In progress, the
 * amount of Issues that are In progress, and the amount that are closed
 *
 * @param project Project Object that should be calculated, if null a project
 * with random mock data will be used
 * @returns {Map} key:Employee,
 * value:{ planning: number; development: number; testing: number }
 */
export function calculateWorkload(projects: ProjectIF[]): Map<EmployeeIF, IssueDataIF> {
  let mapToReturn: Map<EmployeeIF, { planning: number; development: number; testing: number }> =
    new Map([]);
  let issueSet: Set<IssueIF> = new Set<IssueIF>();

  projects.forEach((project) => {

    project.issues.forEach((issue) => {
      const result = extractEmployeeAndUpdateEmployeeMap(issue, issueSet, mapToReturn);
      issueSet = result.issueSet;
      mapToReturn = result.mapToReturn;
    });

    project.milestones.forEach((milestone) => {
      milestone.issues.forEach((issue) => {
        const result = extractEmployeeAndUpdateEmployeeMap(issue, issueSet, mapToReturn);
        issueSet = result.issueSet;
        mapToReturn = result.mapToReturn;
      });
    });
  });
  return mapToReturn;
}


export function mergeEmployees(
  workloadMap: Map<EmployeeIF, IssueDataIF>
): { employee: EmployeeIF; issues: IssueDataIF }[] {
  const employeeList: { employee: EmployeeIF; issues: IssueDataIF }[] = [];
  // merge employees with same id in the workloadMap
  workloadMap.forEach((issues, employee) => {
    const employeeInList = employeeList.find(
      (employeeElement) => employeeElement.employee.id === employee.id
    );
    if (employeeInList) {
      employeeInList.issues = {
        development: employeeInList.issues.development + issues.development,
        planning: employeeInList.issues.planning + issues.planning,
        testing: employeeInList.issues.testing + issues.testing,
      };
    } else {
      employeeList.push({ employee, issues });
    }
  });

  return employeeList;
}


function extractEmployeeAndUpdateEmployeeMap(issue: IssueIF, issueSet: Set<IssueIF>, mapToReturn: Map<EmployeeIF, {
  planning: number;
  development: number;
  testing: number;
}>) {

  let numberPlannedTickets: number;
  let numberInDevTickets: number;
  let numberInTestingTickets: number;

  let tuple: {
    planning: number;
    development: number;
    testing: number;
  } | undefined;

  // checking if the issue is already done, with a set, and if somebody is assigned
  let insertEmployee: EmployeeIF = issue.assignedTo? issue.assignedTo : UnassignedEmployee;
  tuple = mapToReturn.get(insertEmployee);

  if (!issueSet.has(issue)) {
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
    if (issue.status != null) {
      // if there is no date for closure of the ticket, then it is a still open ticket
      if (planningStatusList.includes(issue.status)) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets + 1,
          development: numberInDevTickets,
          testing: numberInTestingTickets,
        });
      } else if (devStatusList.includes(issue.status)) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets,
          development: numberInDevTickets + 1,
          testing: numberInTestingTickets,
        });
      } else if (
        testingStatusList.includes(issue.status) ||
        nonDisplayedStatusList.includes(issue.status)
      ) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets,
          development: numberInDevTickets,
          testing: numberInTestingTickets + 1,
        });
      }
    }
  }

  issueSet.add(issue);

  return { issueSet, mapToReturn};
}