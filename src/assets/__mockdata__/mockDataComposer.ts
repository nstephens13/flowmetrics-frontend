import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import { Status } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import employeeJson from './Employees.json';
import issueJson2 from './Issues_2.json';
import issueJson from './Issues.json';
import milestoneJson from './Milestones.json';
import type { Issue } from '@/model/Issue';


export const planningStatusList: string[] = ['planned', 'design'];
export const devStatusList: string[] = ['in Work', 'review'];
export const testingStatusList: string[] = ['UnitTest', 'E2E'];
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
      userStatus: issue.userStatus as string,
    });
  });
  return issueData;
}

function assignIssueToEmployee(
  issueNumber: number,
  employeeNumber: number,
  issues: IssueIF[],
  employees: EmployeeIF[],
): {
    issuesToReturn: IssueIF[]
    employeesToReturn: EmployeeIF[]
  } {
  const issuesToReturn = issues;
  const employeesToReturn = employees;
  issuesToReturn[issueNumber].assignedTo = employees[employeeNumber];
  employeesToReturn[employeeNumber].assignedIssues.push(issues[issueNumber]);

  return { issuesToReturn, employeesToReturn };
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

function loadArraysFromFile(issueFile: any) {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile) as IssueIF[];
  const milestones: MilestoneIF[] = structuredClone(milestoneJson) as MilestoneIF[];
  return { employeesArray, issuesArray, milestones };
}

// give out a fake project
function getMockData(dataset: number): ProjectIF {
  switch (dataset) {
    case 1: {
      const { employeesArray, issuesArray, milestones } = loadArraysFromFile(issueJson);

      const tuple: {
        issuesToReturn: IssueIF[]
        employeesToReturn: EmployeeIF[]
      } = assignIssueToEmployee(1, 1, issuesArray, employeesArray);

      const issues = tuple.issuesToReturn;
      issues[1].userStatus = planningStatusList[0];
      return {
        id: 1,
        name: 'Mocking Bird 1',
        description: 'first mock dataset',
        milestones,
        issues,
      };
    }
    case 2: {
      const {
        employeesArray,
        issuesArray,
        milestones: milestonesArray,
      } = loadArraysFromFile(issueJson);

      let tuple = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      tuple = assignIssueToEmployee(1, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(2, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(3, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(4, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(5, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(6, 3, tuple.issuesToReturn, tuple.employeesToReturn);
      const issues = tuple.issuesToReturn;

      let milestones = assignIssueToMilestone(0, 0, milestonesArray, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(1, 0, milestones, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(2, 1, milestones, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(3, 1, milestones, tuple.issuesToReturn);

      issues[0].userStatus = planningStatusList[0];
      issues[1].userStatus = planningStatusList[0];
      issues[2].userStatus = planningStatusList[0];
      issues[3].userStatus = planningStatusList[0];
      issues[4].userStatus = planningStatusList[0];
      issues[5].userStatus = planningStatusList[0];
      issues[6].userStatus = planningStatusList[0];

      return {
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        milestones,
        issues,
      };
    }

    case 3: {
      const { employeesArray, milestones } = loadArraysFromFile(issueJson);
      let issues: IssueIF[] = [];
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i,
          name: `Issue Name ${i}`,
          description: `Description of Issue ${i}`,
          closedAt: null,
          status: null,
          assignedTo: null,
          createdAt: new Date(2018, 0o5, 0o5, 17, 23, 42, 11),
          createdBy: {} as EmployeeIF,
          dueTo: null,
          userStatus: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArray.length;

      for (let i = 0; i < numberOfIssues; i++) {
        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          issues[i].status = Status.InProgress;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[i].closedAt = randomDate;
        } else {
          issues[i].status = Status.Open;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        const tuple = assignIssueToEmployee(i, randomEmployee, issues, employeesArray);
        issues = tuple.issuesToReturn;
      }

      return {
        id: 3,
        name: 'Mocking Bird 3',
        description: 'third mock dataset',
        milestones,
        issues,
      };
    }

    case 4: {
      const { employeesArray, milestones } = loadArraysFromFile(issueJson2);
      let issues: IssueIF[] = [];
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i,
          name: `Issue Name ${i}`,
          description: `Description of Issue ${i}`,
          closedAt: null,
          status: null,
          assignedTo: null,
          createdAt: new Date(2018, 0o5, 0o5, 17, 23, 42, 11),
          createdBy: {} as EmployeeIF,
          dueTo: null,
          userStatus: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArray.length;

      for (let i = 0; i < numberOfIssues; i++) {
        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          issues[i].status = Status.InProgress;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[i].closedAt = randomDate;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        const tuple = assignIssueToEmployee(i, randomEmployee, issues, employeesArray);
        issues = tuple.issuesToReturn;
      }

      return {
        id: 3,
        name: 'Mocking Bird 3',
        description: 'third mock dataset',
        milestones,
        issues,
      };
    }

    case 5: {
      const {
        employeesArray,
        issuesArray,
        milestones: milestonesArray,
      } = loadArraysFromFile(issueJson2);

      let tuple = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      tuple = assignIssueToEmployee(1, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(2, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(3, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(4, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(5, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(6, 3, tuple.issuesToReturn, tuple.employeesToReturn);
      const issues = tuple.issuesToReturn;

      let milestones = assignIssueToMilestone(0, 0, milestonesArray, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(1, 0, milestones, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(2, 1, milestones, tuple.issuesToReturn);
      milestones = assignIssueToMilestone(3, 1, milestones, tuple.issuesToReturn);

      return {
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        milestones,
        issues,
      };
    }

    case 6: {
      const { employeesArray, milestones } = loadArraysFromFile(issueJson);
      let issues: IssueIF[] = [];
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i,
          name: `Issue Name ${i}`,
          description: `Description of Issue ${i}`,
          closedAt: null,
          status: null,
          assignedTo: null,
          createdAt: new Date(2018, 0o5, 0o5, 17, 23, 42, 11),
          createdBy: {} as EmployeeIF,
          dueTo: null,
          userStatus: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArray.length;

      for (let i = 0; i < numberOfIssues; i++) {
        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          issues[i].status = Status.InProgress;
          issues[i].userStatus = devStatusList[0];
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[i].closedAt = randomDate;
          issues[i].userStatus = testingStatusList[0];
        } else {
          issues[i].userStatus = planningStatusList[0];
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        const tuple = assignIssueToEmployee(i, randomEmployee, issues, employeesArray);
        issues = tuple.issuesToReturn;
      }

      return {
        id: 6,
        name: 'Mocking Bird 6',
        description: 'sixth mock dataset',
        milestones,
        issues,
      };
    }

    // only test cases
    case 53: {
      return {
        id: 53,
        name: 'Mocking Bird 4',
        description: 'project without issues and milestones',
        issues: [],
        milestones: [],
      };
    }
    case 54: {
      const milestones: MilestoneIF[] = structuredClone(milestoneJson) as MilestoneIF[];
      return {
        id: 54,
        name: 'Mocking Bird 5',
        description: 'project only with milestones',
        milestones,
        issues: [],
      };
    }

    case 55: {
      const { employeesArray, issuesArray, milestones } = loadArraysFromFile(issueJson);

      let tuple = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      tuple = assignIssueToEmployee(1, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(2, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(3, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(4, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(5, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(6, 3, tuple.issuesToReturn, tuple.employeesToReturn);
      const issues = tuple.issuesToReturn;
      const date = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);

      issues[0].status = Status.InProgress;
      issues[0].userStatus = devStatusList[0];
      issues[1].userStatus = planningStatusList[0];
      issues[2].status = Status.Closed;
      issues[2].userStatus = testingStatusList[0];
      issues[2].closedAt = date; // Set the specific closedAt date
      issues[3].status = Status.Closed;
      issues[3].userStatus = testingStatusList[0];
      issues[3].closedAt = date; // Set the specific closedAt date
      issues[4].status = Status.Closed;
      issues[4].userStatus = testingStatusList[0];
      issues[4].closedAt = date; // Set the specific closedAt date
      issues[5].status = Status.InProgress;
      issues[5].userStatus = devStatusList[0];
      issues[6].userStatus = testingStatusList[0];
      issues[6].closedAt = date; // Set the specific closedAt date
      return {
        id: 55,
        name: 'Mocking Bird 6',
        description: 'project with some Issues with Status Enums',
        milestones,
        issues,
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
