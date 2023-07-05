import { faker } from '@faker-js/faker';
import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import employeeJson from './Employees.json';
import issueJson2 from './Issues_2.json';
import issueJson from './Issues.json';
import milestoneJson from './Milestones.json';
import type { Issue } from '@/model/Issue';

export const planningStatusList: string[] = ['planned', 'design', 'Open'];
export const devStatusList: string[] = ['in work', 'review', 'In progress'];
export const testingStatusList: string[] = ['UnitTest', 'E2E'];

export const nonDisplayedStatusList: string[] = ['Closed'];
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function loadIssueDataFromFile(issues: any): Issue[] {
  const issueData: Issue[] = [];
  structuredClone(issues).forEach((issue: IssueIF) => {
    issueData.push({
      id: issue.id as number,
      name: issue.name as string,
      description: issue.description as string,
      assignedTo: issue.assignedTo as EmployeeIF,
      createdBy: issue.createdBy as EmployeeIF,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: issue.createdAt ? new Date(issue.createdAt) : null,
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status as string,
    });
  });
  return issueData;
}

function assignIssueToEmployee(
  issueNumber: number,
  employeeNumber: number,
  issues: IssueIF[],
  employees: EmployeeIF[]
): [IssueIF[], EmployeeIF[]] {
  const issuesToReturn = issues;
  const employeesToReturn = employees;

  // assign issue to employee if the issue exists and the employee exists
  if (issueNumber < issues.length && employeeNumber < employees.length) {
    issuesToReturn[issueNumber].assignedTo = employees[employeeNumber];
  }

  return [issuesToReturn, employeesToReturn];
}

function assignIssueToMilestone(
  issueNumber: number,
  milestoneNumber: number,
  milestones: MilestoneIF[],
  issues: IssueIF[]
) {
  const mileStonesToReturn = milestones;
  mileStonesToReturn[milestoneNumber].issues.push(issues[issueNumber]);

  return mileStonesToReturn;
}

function loadArraysFromFile(
  issueFile:
    | (
        | {
            id: number;
            name: string;
            description: string;
            assignedTo: null;
            createdBy: { id: number; firstName: string; lastName: string; assignedIssues: never[] };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
          }
        | {
            id: number;
            name: string;
            description: null;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              assignedIssues: never[];
            };
            createdBy: { id: number; firstName: string; lastName: string; assignedIssues: never[] };
            createdAt: string;
            closedAt: string;
            dueTo: string;
            status: string;
          }
        | {
            id: number;
            name: string;
            description: string;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              assignedIssues: never[];
            };
            createdBy: { id: number; firstName: string; lastName: string; assignedIssues: never[] };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
          }
        | {
            id: number;
            name: string;
            description: null;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              assignedIssues: never[];
            };
            createdBy: { id: number; firstName: string; lastName: string; assignedIssues: never[] };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
          }
      )[]
    | { id: number; name: string; description: string; assignedTo: null }[]
): [EmployeeIF[], IssueIF[], MilestoneIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile) as IssueIF[];
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
      const [planningStatus] = planningStatusList;
      issuesForProject[1].status = planningStatus;

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
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      milestonesForProject = assignIssueToMilestone(
        0,
        0,
        milestonesArrayFromFile,
        issuesForProject
      );

      milestonesForProject = assignIssueToMilestone(1, 0, milestonesForProject, issuesForProject);

      milestonesForProject = assignIssueToMilestone(2, 1, milestonesForProject, issuesForProject);

      milestonesForProject = assignIssueToMilestone(3, 1, milestonesForProject, issuesForProject);

      [
        issuesForProject[0].status,
        issuesForProject[1].status,
        issuesForProject[2].status,
        issuesForProject[3].status,
        issuesForProject[4].status,
        issuesForProject[5].status,
        issuesForProject[6].status,
      ] = [
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
      ];

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
        let status = 'Open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: In progress

        if (randomStatus === 2) {
          status = 'In progress';
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
          employeesForProject
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
      [employeesArrayFromFile, issuesArrayFromFile, milestonesArrayFromFile] =
        loadArraysFromFile(issueJson2);

      for (let i = 0; i < 280; i++) {
        let status = 'Open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: In progress

        if (randomStatus === 2) {
          status = 'In progress';
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
          employeesArrayFromFile
        );
      });

      return {
        id: 4,
        name: faker.science.chemicalElement().name,
        description: 'third mock dataset with a big number of random issues',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
      };
    }

    case 5: {
      [employeesArrayFromFile, issuesArrayFromFile, milestonesArrayFromFile] =
        loadArraysFromFile(issueJson2);

      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      milestonesForProject = assignIssueToMilestone(
        0,
        0,
        milestonesArrayFromFile,
        issuesForProject
      );

      milestonesForProject = assignIssueToMilestone(1, 0, milestonesForProject, issuesForProject);
      milestonesForProject = assignIssueToMilestone(2, 1, milestonesForProject, issuesForProject);
      milestonesForProject = assignIssueToMilestone(3, 1, milestonesForProject, issuesForProject);

      return {
        id: 5,
        name: faker.science.chemicalElement().name,
        description: 'second mock dataset',
        milestones: milestonesForProject,
        issues: issuesForProject,
      };
    }

    case 6: {
      const issues: IssueIF[] = [];
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt: null,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let i = 0; i < numberOfIssues; i++) {
        const randomStatus = getRandomInt(4); // 0: Open, 1: Closed, 2: In progress

        if (randomStatus === 2) {
          issues[i].status = 'In progress';
          const [devStatus] = devStatusList;
          issues[i].status = devStatus;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[i].closedAt = randomDate;
          const [testStatus] = testingStatusList;
          issues[i].status = testStatus;
        } else if (randomStatus === 3) {
          issues[i].closedAt = faker.date.recent();
          const [nonDisplayedStatus] = nonDisplayedStatusList;
          issues[i].status = nonDisplayedStatus;
        } else {
          const [planningStatus] = planningStatusList;
          issues[i].status = planningStatus;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          i,
          randomEmployee,
          issues,
          employeesArrayFromFile
        );
      }

      return {
        id: 6,
        name: faker.science.chemicalElement().name,
        description: 'sixth mock dataset',
        milestones: milestonesArrayFromFile,
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
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      const date = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
      issuesForProject[0].status = 'In progress';
      issuesForProject[2].status = 'Closed';
      issuesForProject[2].closedAt = date; // Set the specific closedAt date
      issuesForProject[3].status = 'Closed';
      issuesForProject[3].closedAt = date; // Set the specific closedAt date
      issuesForProject[4].status = 'Closed';
      issuesForProject[4].closedAt = date; // Set the specific closedAt date
      issuesForProject[5].status = 'In progress';
      issuesForProject[6].status = 'Closed';
      issuesForProject[6].closedAt = date; // Set the specific closedAt date

      [issuesForProject[0].status, issuesForProject[0].status] = ['In progress', devStatusList[0]];
      [issuesForProject[1].status] = [planningStatusList[0]];
      [issuesForProject[2].status, issuesForProject[2].status, issuesForProject[2].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[3].status, issuesForProject[3].status, issuesForProject[3].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[4].status, issuesForProject[4].status, issuesForProject[4].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[5].status, issuesForProject[5].status] = ['In progress', devStatusList[0]];
      [issuesForProject[6].status, issuesForProject[6].closedAt] = [testingStatusList[0], date];

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
