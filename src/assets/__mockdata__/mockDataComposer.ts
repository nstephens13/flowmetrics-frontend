import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import { Status } from '@/model/IssueIF';
import employeeJson from './Employees.json';
import issueJson from './Issues.json';
import milestoneJson from './Milestones.json';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
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

function loadArraysFromFile() {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const milestones: MilestoneIF[] = structuredClone(milestoneJson) as MilestoneIF[];
  return { employeesArray, issuesArray, milestones };
}

// give out a fake project
function getMockData(dataset = 3): ProjectIF {
  switch (dataset) {
    case 1: {
      const { employeesArray, issuesArray, milestones } = loadArraysFromFile();

      const tuple: {
        issuesToReturn: IssueIF[]
        employeesToReturn: EmployeeIF[]
      } = assignIssueToEmployee(1, 1, issuesArray, employeesArray);

      const issues = tuple.issuesToReturn;
      return {
        id: 1,
        name: 'Mocking Bird 1',
        description: 'first mock dataset',
        milestones,
        issues,
      };
    }
    case 2: {
      const { employeesArray, issuesArray, milestones: milestonesArray } = loadArraysFromFile();

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

    case 3: {
      const { employeesArray, milestones } = loadArraysFromFile();
      let issues: IssueIF[] = [];
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i,
          name: `Issue Name ${i}`,
          description: `Description of Issue ${i}`,
          closedAt: null,
          status: null,
          assignedTo: null,
          createdAt: new Date(),
          createdBy: {} as EmployeeIF,
          dueTo: null,
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
          const randomDate = new Date();
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
      const { employeesArray, issuesArray, milestones } = loadArraysFromFile();

      let tuple = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      tuple = assignIssueToEmployee(1, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(2, 1, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(3, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(4, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(5, 2, tuple.issuesToReturn, tuple.employeesToReturn);
      tuple = assignIssueToEmployee(6, 3, tuple.issuesToReturn, tuple.employeesToReturn);
      const issues = tuple.issuesToReturn;

      issues[0].status = Status.InProgress;
      issues[2].status = Status.Closed;
      issues[2].closedAt = new Date(); // Set the specific closedAt date
      issues[3].status = Status.Closed;
      issues[3].closedAt = new Date(); // Set the specific closedAt date
      issues[4].status = Status.Closed;
      issues[4].closedAt = new Date(); // Set the specific closedAt date
      issues[5].status = Status.InProgress;
      issues[6].status = Status.Closed;
      issues[6].closedAt = new Date(); // Set the specific closedAt date
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
