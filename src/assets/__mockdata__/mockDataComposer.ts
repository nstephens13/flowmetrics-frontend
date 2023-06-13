import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import type { IssueDataIF } from '@/model/IssueDataIF';
import { Status } from '../../model/IssueIF';

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
): [IssueIF[], EmployeeIF[]] {
  const issuesToReturn = issues;
  const employeesToReturn = employees;
  issuesToReturn[issueNumber].assignedTo = employees[employeeNumber];
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

function loadArraysFromFile(): [EmployeeIF[], IssueIF[], MilestoneIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const milestones: MilestoneIF[] = structuredClone(milestoneJson) as MilestoneIF[];
  return [employeesArray, issuesArray, milestones];
}

// give out a fake project
function getMockData(dataset = 3): ProjectIF {
  let [employeesArray, issuesArray, milestones]: [EmployeeIF[], IssueIF[], MilestoneIF[]] = [
    [],
    [],
    [],
  ];
  let [issues, employees]: [IssueIF[], EmployeeIF[]] = [[], []];

  switch (dataset) {
    case 1: {
      [employeesArray, issuesArray, milestones] = loadArraysFromFile();
      [issuesArray, employees] = assignIssueToEmployee(1, 1, issuesArray, employeesArray);

      return {
        id: 1,
        name: 'Mocking Bird',
        description: 'first mock dataset',
        milestones: milestones,
        issues: issuesArray,
      };
    }

    case 2: {
      [employeesArray, issuesArray, milestones] = loadArraysFromFile();
      [issuesArray, employees] = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      [issuesArray, employees] = assignIssueToEmployee(1, 1, issuesArray, employees);
      [issuesArray, employees] = assignIssueToEmployee(2, 1, issuesArray, employees);
      [issuesArray, employees] = assignIssueToEmployee(3, 2, issuesArray, employees);
      [issuesArray, employees] = assignIssueToEmployee(4, 2, issuesArray, employees);
      [issuesArray, employees] = assignIssueToEmployee(5, 2, issuesArray, employees);
      [issuesArray, employees] = assignIssueToEmployee(6, 3, issuesArray, employees);

      milestones = assignIssueToMilestone(0, 0, milestones, issuesArray);
      milestones = assignIssueToMilestone(1, 0, milestones, issuesArray);
      milestones = assignIssueToMilestone(2, 1, milestones, issuesArray);
      milestones = assignIssueToMilestone(3, 1, milestones, issuesArray);

      return {
        id: 2,
        name: 'Mocking Bird',
        description: 'second mock dataset',
        milestones: milestones,
        issues: issuesArray,
      };
    }

    case 3: {
      [employeesArray, issuesArray, milestones] = loadArraysFromFile();
      const newIssues: IssueIF[] = [];

      for (let i = 0; i < 280; i++) {
        let status = Status.Open;
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          status = Status.InProgress;
        } else if (randomStatus === 1) {
          const randomDate = new Date();
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          closedAt = randomDate;
        }

        newIssues.push({
          id: i,
          name: `Issue Name ${i}`,
          description: `Description of Issue ${i}`,
          closedAt,
          status,
          assignedTo: null,
          createdAt: new Date(),
          createdBy: employeesArray[getRandomInt(employeesArray.length)],
          dueTo: null,
        });
      }

      const numberOfEmployees = employeesArray.length;
      newIssues.forEach((issue: IssueIF) => {
        const randomEmployee = getRandomInt(numberOfEmployees);
        [issues, employees] = assignIssueToEmployee(
          issue.id,
          randomEmployee,
          newIssues,
          employeesArray,
        );
      });

      return {
        id: 3,
        name: 'Mocking Bird',
        description: 'third mock dataset',
        milestones,
        issues,
      };
    }

    // only test cases
    case 53: {
      return {
        id: 53,
        name: 'Mocking Bird',
        description: 'project without issues and milestones',
        issues: [],
        milestones: [],
      };
    }
    case 54: {
      milestones = structuredClone(milestoneJson) as MilestoneIF[];
      return {
        id: 54,
        name: 'Mocking Bird',
        description: 'project only with milestones',
        milestones,
        issues: [],
      };
    }
    case 55: {
      [employeesArray, issuesArray, milestones] = loadArraysFromFile();
      [issuesArray, employeesArray] = assignIssueToEmployee(0, 0, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(1, 1, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(2, 1, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(3, 2, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(4, 2, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(5, 2, issuesArray, employeesArray);
      [issuesArray, employeesArray] = assignIssueToEmployee(6, 3, issuesArray, employeesArray);

      issuesArray[0].status = Status.InProgress;
      issuesArray[2].status = Status.Closed;
      issuesArray[2].closedAt = new Date(); // Set the specific closedAt date
      issuesArray[3].status = Status.Closed;
      issuesArray[3].closedAt = new Date(); // Set the specific closedAt date
      issuesArray[4].status = Status.Closed;
      issuesArray[4].closedAt = new Date(); // Set the specific closedAt date
      issuesArray[5].status = Status.InProgress;
      issuesArray[6].status = Status.Closed;
      issuesArray[6].closedAt = new Date(); // Set the specific closedAt date
      return {
        id: 55,
        name: 'Mocking Bird',
        description: 'project with some Issues with Status Enums',
        milestones,
        issues: issuesArray,
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
