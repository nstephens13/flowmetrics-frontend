import { faker } from '@faker-js/faker';
import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import { Status } from '@/model/IssueIF';
import employeeJson from './Employees.json';
import issueJson2 from './Issues_2.json';
import issueJson from './Issues.json';
import milestoneJson from './Milestones.json';
import type { Issue } from '@/model/Issue';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function loadIssueDataFromFile(issues: Array<any>): Issue[] {
  const issueData: Issue[] = [];
  structuredClone(issues).forEach((issue) => {
    issueData.push({
      id: issue.id as number,
      name: issue.name as string,
      description: issue.description as string,
      assignedTo: issue.assignedTo as EmployeeIF,
      createdBy: issue.createdBy as EmployeeIF,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: new Date(issue.createdAt),
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status as Status,
    });
  });
  return issueData;
}

function assignIssueToEmployee(
  issueNumber: number,
  employeeNumber: number,
  issues: IssueIF[],
  employees: EmployeeIF[],
): [IssueIF[], EmployeeIF[]] {
  const issuesToReturn = issues;
  const employeesToReturn = employees;

  // assign issue to employee if the issue exists and the employee exists
  if (issueNumber < issues.length && employeeNumber < employees.length) {
    issuesToReturn[issueNumber].assignedTo = employees[employeeNumber];
  }

  employeesToReturn[employeeNumber].assignedIssues.push(issues[issueNumber]);
  return [issuesToReturn, employeesToReturn];
}

function assignIssueToMilestone(
  issueNumber: number,
  milestoneNumber: number,
  milestones: MilestoneIF[],
  issues: IssueIF[],
) {
  const mileStonesToReturn = milestones;
  mileStonesToReturn[milestoneNumber].issues.push(issues[issueNumber]);

  return mileStonesToReturn;
}

function loadArraysFromFile(issueFile: any): [EmployeeIF[], IssueIF[], MilestoneIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile);
  const milestones: MilestoneIF[] = structuredClone(milestoneJson) as MilestoneIF[];
  return [employeesArray, issuesArray, milestones];
}

/**
 * This function composes different mock data sets, the default value
 * if no parameter is used ist data set 3.
 *
 * @param dataset the number of the dataset that should be returned
 */
function getMockData(dataset: number): ProjectIF {
  let [employeesArrayFromFile, issuesArrayFromFile, milestonesArrayFromFile]: [
    EmployeeIF[],
    IssueIF[],
    MilestoneIF[]
  ] = loadArraysFromFile(issueJson);
  let [employeesForProject, issuesForProject, milestonesForProject]: [
    EmployeeIF[],
    IssueIF[],
    MilestoneIF[]
  ] = [[], [], []];

  switch (dataset) {
    case 1: {
      milestonesForProject = milestonesArrayFromFile;
      [issuesForProject] = assignIssueToEmployee(1, 1, issuesArrayFromFile, employeesArrayFromFile);

      return {
        id: 1,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesForProject,
        issues: issuesForProject,
      };
    }

    case 2: {
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject,
      );

      milestonesForProject = assignIssueToMilestone(
        0,
        0,
        milestonesArrayFromFile,
        issuesForProject,
      );

      milestonesForProject = assignIssueToMilestone(1, 0, milestonesForProject, issuesForProject);

      milestonesForProject = assignIssueToMilestone(2, 1, milestonesForProject, issuesForProject);

      milestonesForProject = assignIssueToMilestone(3, 1, milestonesForProject, issuesForProject);

      return {
        id: 2,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesForProject,
        issues: issuesForProject,
      };
    }

    case 3: {
      for (let i = 0; i < 280; i++) {
        let status = Status.Open;
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          status = Status.InProgress;
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        issuesForProject.push({
          id: i + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
        });
      }

      const numberOfEmployees = employeesArrayFromFile.length;
      employeesForProject = employeesArrayFromFile;

      issuesForProject.forEach((issue: IssueIF) => {
        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          issue.id,
          randomEmployee,
          issuesForProject,
          employeesForProject,
        );
      });

      return {
        id: 3,
        name: 'Mocking Bird Project',
        description: 'third mock dataset with a big number of random issues',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
      };
    }

    case 4: {
      [
        employeesArrayFromFile,
        issuesArrayFromFile,
        milestonesArrayFromFile,
      ] = loadArraysFromFile(issueJson2);

      for (let i = 0; i < 280; i++) {
        let status = Status.Open;
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          status = Status.InProgress;
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        issuesForProject.push({
          id: i + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
        });
      }

      issuesForProject.forEach((issue: IssueIF) => {
        const randomEmployee = getRandomInt(employeesArrayFromFile.length);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          issue.id,
          randomEmployee,
          issuesForProject,
          employeesArrayFromFile,
        );
      });

      return {
        id: 3,
        name: 'Mocking Bird Project',
        description: 'third mock dataset with a big number of random issues',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
      };
    }

    case 5: {
      [
        employeesArrayFromFile,
        issuesArrayFromFile,
        milestonesArrayFromFile,
      ] = loadArraysFromFile(issueJson2);

      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject,
      );

      milestonesForProject = assignIssueToMilestone(
        0,
        0,
        milestonesArrayFromFile,
        issuesForProject,
      );

      milestonesForProject = assignIssueToMilestone(1, 0, milestonesForProject, issuesForProject);
      milestonesForProject = assignIssueToMilestone(2, 1, milestonesForProject, issuesForProject);
      milestonesForProject = assignIssueToMilestone(3, 1, milestonesForProject, issuesForProject);

      return {
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        milestones: milestonesForProject,
        issues: issuesForProject,
      };
    }

    // only test cases
    case 53: {
      return {
        id: 53,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: [],
        milestones: [],
      };
    }
    case 54: {
      return {
        id: 54,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesArrayFromFile,
        issues: [],
      };
    }

    case 55: {
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject,
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject,
      );

      const date = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
      issuesForProject[0].status = Status.InProgress;
      issuesForProject[2].status = Status.Closed;
      issuesForProject[2].closedAt = date; // Set the specific closedAt date
      issuesForProject[3].status = Status.Closed;
      issuesForProject[3].closedAt = date; // Set the specific closedAt date
      issuesForProject[4].status = Status.Closed;
      issuesForProject[4].closedAt = date; // Set the specific closedAt date
      issuesForProject[5].status = Status.InProgress;
      issuesForProject[6].status = Status.Closed;
      issuesForProject[6].closedAt = date; // Set the specific closedAt date
      return {
        id: 55,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
      };
    }

    default: {
      return {
        id: 0,
        name: 'default',
        description: 'a empty project',
        milestones: [],
        issues: [],
      };
    }
  }
}

export default getMockData;
