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
import type { SLARule } from '@/model/SLARule';

// Define lists of different category with statuses
export const planningStatusList: string[] = ['Planned', 'Design', 'Open'];
export const devStatusList: string[] = ['In Work', 'Review', 'In Progress'];
export const testingStatusList: string[] = ['UnitTest', 'E2E'];
export const nonDisplayedStatusList: string[] = ['Closed'];

/**
 * Generates a random integer between 0 and the specified maximum value (exclusive).
 * @param max - The maximum value.
 * @returns The random integer.
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Loads issue data from a file and returns an array of Issue objects.
 * @param issues - The issue data from the file.
 * @returns An array of Issue objects.
 */
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
      statusChanges: null,
      assignedSLARule: issue.assignedSLARule ? issue.assignedSLARule : null,
      lastStatusChange: faker.date.recent(),
    });
  });
  return issueData;
}

/**
 * Assigns an issue to an employee.
 * @param issueNumber - The index of the issue.
 * @param employeeNumber - The index of the employee.
 * @param issues - The array of issues.
 * @param employees - The array of employees.
 * @returns The updated arrays of issues and employees.
 */
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

/**
 * Assigns an issue to a milestone.
 * @param issueNumber - The index of the issue.
 * @param milestoneNumber - The index of the milestone.
 * @param milestones - The array of milestones.
 * @param issues - The array of issues.
 * @returns The updated array of milestones.
 */
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

/**
 * Loads arrays of employees, issues, and milestones from files.
 * @param issueFile - The issue data file.
 * @returns An array containing the loaded arrays of employees, issues, and milestones.
 */
function loadArraysFromFile(
  issueFile:
    | (
        | {
            id: number;
            name: string;
            description: string;
            assignedTo: null;
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
            };
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
              emailAddress: string;
              assignedIssues: never[];
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
            };
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
              emailAddress: string;
              status: string;
              assignedIssues: never[];
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              assignedIssues: never[];
            };
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
              emailAddress: string;
              status: string;
              assignedIssues: never[];
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              assignedIssues: never[];
            };
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
 * This function creates different mock data sets depending on the number passed
 * If no number is passed, data set 3 is returned
 * @param dataset the number of the dataset that should be returned
 * @returns The mock data based on the specified dataset.
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
        slaSubscriber: null,
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
        slaSubscriber: null,
      };
    }

    case 3: {
      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'Open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: In Progress

        if (randomStatus === 2) {
          status = 'In Progress';
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        const statusChanges = getRandomInt(10);

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          statusChanges,
          assignedSLARule: null,
          lastStatusChange: faker.date.recent(),
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
        slaSubscriber: null,
      };
    }

    case 4: {
      [employeesArrayFromFile, issuesArrayFromFile, milestonesArrayFromFile] =
        loadArraysFromFile(issueJson2);

      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'Open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: In Progress

        if (randomStatus === 2) {
          status = 'In Progress';
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        const statusChanges = getRandomInt(10);

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          statusChanges,
          assignedSLARule: null,
          lastStatusChange: faker.date.between({
            from: new Date().valueOf() - 259200000,
            to: new Date().valueOf(),
          }), // 259200000 is 3 days in ms
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
        id: 3,
        name: 'Mocking Bird Project',
        description: 'third mock dataset with a big number of random issues',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
        slaSubscriber: null,
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
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        milestones: milestonesForProject,
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 6: {
      const issues: IssueIF[] = [];
      for (let iterator = 0; iterator < 280; iterator++) {
        issues.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt: null,
          assignedTo: null,
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
          statusChanges: null,
          assignedSLARule: null,
          lastStatusChange: faker.date.recent(),
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: Open, 1: Closed, 2: In Progress

        if (randomStatus === 2) {
          issues[iterator].status = 'In Progress';
          const [devStatus] = devStatusList;
          issues[iterator].status = devStatus;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[iterator].closedAt = randomDate;
          const [testStatus] = testingStatusList;
          issues[iterator].status = testStatus;
        } else if (randomStatus === 3) {
          issues[iterator].closedAt = faker.date.recent();
          const [nonDisplayedStatus] = nonDisplayedStatusList;
          issues[iterator].status = nonDisplayedStatus;
        } else {
          const [planningStatus] = planningStatusList;
          issues[iterator].status = planningStatus;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          iterator,
          randomEmployee,
          issues,
          employeesArrayFromFile
        );
      }

      return {
        id: 6,
        name: faker.science.chemicalElement().name,
        description: 'Sixth mock dataset',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    // SLA Rules MockData
    case 7: {
      const issues: IssueIF[] = [];
      // Random Erstellung von 280 Issues
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
          statusChanges: 0,
          assignedSLARule: [],
          lastStatusChange: faker.date.recent(),
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: Open, 1: Closed, 2: In Progress

        if (randomStatus === 2) {
          issues[iterator].status = 'In Progress';
          const [devStatus] = devStatusList;
          issues[iterator].status = devStatus;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[iterator].closedAt = randomDate;
          const [testStatus] = testingStatusList;
          issues[iterator].status = testStatus;
        } else if (randomStatus === 3) {
          issues[iterator].closedAt = faker.date.recent();
          const [nonDisplayedStatus] = nonDisplayedStatusList;
          issues[iterator].status = nonDisplayedStatus;
        } else {
          const [planningStatus] = planningStatusList;
          issues[iterator].status = planningStatus;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          iterator,
          randomEmployee,
          issues,
          employeesArrayFromFile
        );
      }

      const slaRule1: SLARule = {
        id: 1,
        name: 'SLA Rule 1',
        durationInDays: 3,
        expirationDate: new Date('2023-08-17T00:00:00.000Z'),
        maxAssignedEmployees: 3,
        occurredIn: null,
      };
      const slaRule2: SLARule = {
        id: 2,
        name: 'SLA Rule 2',
        durationInDays: 5,
        expirationDate: new Date('2023-08-20T00:00:00.000Z'),
        maxAssignedEmployees: 3,
        occurredIn: null,
      };
      const slaRule3: SLARule = {
        id: 3,
        name: 'SLA Rule 3',
        durationInDays: 2,
        expirationDate: new Date('2023-08-16T00:00:00.000Z'),
        maxAssignedEmployees: 1,
        occurredIn: null,
      };

      const slaRuleArray: SLARule[] = [slaRule1, slaRule2, slaRule3];

      for (let i = 0; i < numberOfIssues; i++) {
        const randomSLARule = getRandomInt(3); // 0: SLA Rule 1, 1: SLA Rule 2, 2: SLA Rule 3
        issues[i].assignedSLARule?.push(slaRuleArray[randomSLARule]);
      }
      return {
        id: 7,
        name: 'Mocking Bird 7',
        description: 'seventh mock dataset',
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
        slaSubscriber: null,
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
        slaSubscriber: null,
      };
    }
    case 54: {
      return {
        id: 54,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesArrayFromFile,
        issues: [],
        slaSubscriber: null,
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
      issuesForProject[0].status = 'In Progress';
      issuesForProject[2].status = 'Closed';
      issuesForProject[2].closedAt = date; // Set the specific closedAt date
      issuesForProject[3].status = 'Closed';
      issuesForProject[3].closedAt = date; // Set the specific closedAt date
      issuesForProject[4].status = 'Closed';
      issuesForProject[4].closedAt = date; // Set the specific closedAt date
      issuesForProject[5].status = 'In Progress';
      issuesForProject[6].status = 'Closed';
      issuesForProject[6].closedAt = date; // Set the specific closedAt date

      [issuesForProject[0].status, issuesForProject[0].status] = ['In Progress', devStatusList[0]];
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
      [issuesForProject[5].status, issuesForProject[5].status] = ['In Progress', devStatusList[0]];
      [issuesForProject[6].status, issuesForProject[6].closedAt] = [testingStatusList[0], date];

      return {
        id: 55,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        milestones: milestonesArrayFromFile,
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    default: {
      return {
        id: 0,
        name: 'Default',
        description: 'An empty project',
        milestones: [],
        issues: [],
        slaSubscriber: null,
      };
    }
  }
}

export default getMockData;
