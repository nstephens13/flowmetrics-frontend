import { faker } from '@faker-js/faker';
import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import employeeJson from '@/assets/__mockdata__/json/Employees.json';
import issueJson2 from '@/assets/__mockdata__/json/Issues_2.json';
import issueJson from '@/assets/__mockdata__/json/Issues.json';
import { Issue } from '@/services/Issue';
import { Category, statusLists } from './IssueProps/statusLists';

// Define lists of different category with statuses
export const planningStatusList: string[] = statusLists[Category.planning];
export const devStatusList: string[] = statusLists[Category.development];
export const testingStatusList: string[] = statusLists[Category.testing];
export const nonDisplayedStatusList: string[] = statusLists[Category.nonDisplayed];

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
      priority: null,
      issueType: null,
      assignedTo: issue.assignedTo as EmployeeIF,
      createdBy: issue.createdBy as EmployeeIF,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: issue.createdAt ? new Date(issue.createdAt) : null,
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status as string,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: [],
      statusChanges: issue.statusChanges ? issue.statusChanges : [],
      state: issue.state as string,
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
              key: string;
            };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
            state: string;
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
              key: string;
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
              key: string;
            };
            createdAt: string;
            closedAt: string;
            dueTo: string;
            status: string;
            state: string;
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
              key: string;
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
            state: string;
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
              key: string;
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
            state: string;
          }
      )[]
    | { id: number; name: string; description: string; assignedTo: null }[]
): [EmployeeIF[], IssueIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile) as IssueIF[];
  return [employeesArray, issuesArray];
}

/**
 * This function creates different mock data sets depending on the number passed
 * If no number is passed, data set 3 is returned
 * @param dataset the number of the dataset that should be returned
 * @returns The mock data based on the specified dataset.
 */
function getMockData(dataset: number): ProjectIF {
  let [employeesArrayFromFile, issuesArrayFromFile]: [EmployeeIF[], IssueIF[]] =
    loadArraysFromFile(issueJson);
  let [employeesForProject, issuesForProject]: [EmployeeIF[], IssueIF[]] = [[], []];

  switch (dataset) {
    case 1: {
      [issuesForProject] = assignIssueToEmployee(1, 1, issuesArrayFromFile, employeesArrayFromFile);
      const [planningStatus] = planningStatusList;
      issuesForProject[1].status = planningStatus;
      issuesForProject[1].state = Category.planning;

      return {
        id: 1,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
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

      [
        issuesForProject[0].state,
        issuesForProject[1].state,
        issuesForProject[2].state,
        issuesForProject[3].state,
        issuesForProject[4].state,
        issuesForProject[5].state,
        issuesForProject[6].state,
      ] = [
        Category.planning,
        Category.planning,
        Category.planning,
        Category.planning,
        Category.planning,
        Category.planning,
        Category.planning,
      ];

      return {
        id: 2,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: issuesForProject,
      };
    }

    case 3: {
      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'Open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: closed, 2: In progress

        if (randomStatus === 2) {
          status = 'In progress';
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          priority: null,
          issueType: null,
          closedAt,
          status,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: [],
          statusChanges: [],
          state: '',
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
        issues: issuesForProject,
      };
    }

    case 4: {
      [employeesArrayFromFile, issuesArrayFromFile] = loadArraysFromFile(issueJson2);

      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'Open';
        let closedAt = null;
        let state = Category.planning;

        const randomStatus = getRandomInt(3); // 0: Open, 1: closed, 2: In progress

        if (randomStatus === 2) {
          status = 'In progress';
          state = Category.development;
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          priority: null,
          issueType: null,
          assigneeChanges: [],
          assigneeRestingTime: null,
          statusChanges: [],
          statusRestingTime: null,
          state,
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
        issues: issuesForProject,
      };
    }

    case 5: {
      [employeesArrayFromFile, issuesArrayFromFile] = loadArraysFromFile(issueJson2);

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

      return {
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        issues: issuesForProject,
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
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
          priority: null,
          issueType: null,
          statusChanges: [],
          state: '',
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: [],
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: Open, 1: closed, 2: In progress

        if (randomStatus === 2) {
          issues[iterator].status = 'In progress';
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
        issues: issuesForProject,
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
          priority: null,
          issueType: null,
          closedAt: null,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: [],
          statusChanges: [],
          state: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: Open, 1: closed, 2: In progress

        if (randomStatus === 2) {
          issues[iterator].status = 'In progress';
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
        id: 7,
        name: 'Mocking Bird 7',
        description: 'seventh mock dataset',
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
      };
    }
    case 54: {
      return {
        id: 54,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
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
      issuesForProject[0].status = 'e2e';
      issuesForProject[0].state = Category.testing;
      issuesForProject[0].createdAt = new Date();
      issuesForProject[2].status = 'Closed';
      issuesForProject[2].status = 'In progress';
      issuesForProject[0].state = Category.development;
      issuesForProject[2].closedAt = date; // Set the specific closedAt date
      issuesForProject[3].status = 'Closed';
      issuesForProject[3].status = 'Review';
      issuesForProject[0].state = Category.development;
      issuesForProject[3].closedAt = date; // Set the specific closedAt date
      issuesForProject[4].status = 'Closed';
      issuesForProject[4].status = 'Review';
      issuesForProject[0].state = Category.development;
      issuesForProject[4].closedAt = date; // Set the specific closedAt date
      issuesForProject[5].status = 'In progress';
      issuesForProject[5].status = 'e2e';
      issuesForProject[0].state = Category.testing;
      issuesForProject[5].createdAt = new Date();
      issuesForProject[6].status = 'Closed';
      issuesForProject[6].status = 'Design';
      issuesForProject[0].state = Category.planning;
      issuesForProject[6].createdAt = date;
      issuesForProject[6].closedAt = date; // Set the specific closedAt date

      [issuesForProject[0].status, issuesForProject[0].status] = ['In progress', devStatusList[0]];
      [issuesForProject[0].state, issuesForProject[0].state] = Category.development;
      [issuesForProject[1].status] = [planningStatusList[0]];
      [issuesForProject[1].state, issuesForProject[1].state] = Category.planning;
      [issuesForProject[2].status, issuesForProject[2].status, issuesForProject[2].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[2].state, issuesForProject[2].state] = Category.testing;
      [issuesForProject[3].status, issuesForProject[3].status, issuesForProject[3].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[3].state, issuesForProject[3].state] = Category.testing;
      [issuesForProject[4].status, issuesForProject[4].status, issuesForProject[4].closedAt] = [
        'Closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[5].status, issuesForProject[5].status] = ['In progress', devStatusList[0]];
      [issuesForProject[4].state, issuesForProject[4].state] = Category.testing;
      [issuesForProject[5].state, issuesForProject[5].state] = Category.development;
      [issuesForProject[6].status, issuesForProject[6].closedAt] = [testingStatusList[0], date];
      [issuesForProject[6].state, issuesForProject[6].state] = Category.testing;

      return {
        id: 55,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: issuesForProject,
      };
    }

    default: {
      return {
        id: 0,
        name: 'Default',
        description: 'An empty project',
        issues: [],
      };
    }
  }
}

export default getMockData;
