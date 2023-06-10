import fs from 'fs';
import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/IssueIF';
import type { MilestoneIF } from '@/model/MilestoneIF';
import { Status } from '../../model/IssueIF';

export function loadDataFromFile<T>(filePath: string): T[] {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData) as T[];
  } catch (error) {
    return [];
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// give out a fake project
export function getMockData(dataset = 3): ProjectIF {
  const employees: EmployeeIF[] = loadDataFromFile<EmployeeIF>(
    'src/services/__mockdata__/Employees.json',
  );
  const issues: IssueIF[] = loadDataFromFile<IssueIF>('src/services/__mockdata__/Issues.json');
  const milestones: MilestoneIF[] = loadDataFromFile<MilestoneIF>(
    'src/services/__mockdata__/Milestones.json',
  );

  function assignIssueToEmployee(issueNumber: number, employeeNumber: number) {
    issues[issueNumber].assignedTo = employees[employeeNumber];
    employees[employeeNumber].assignedIssues.push(issues[issueNumber]);
  }
  function assignIssueToMilestone(issueNumber: number, milestoneNumber: number) {
    milestones[milestoneNumber].issues.push(issues[issueNumber]);
  }

  switch (dataset) {
    case 1: {
      assignIssueToEmployee(1, 1);
      return {
        id: 1,
        name: 'Mocking Bird',
        description: 'first mock dataset',
        milestones,
        issues,
      };
    }
    case 2: {
      assignIssueToEmployee(0, 0);
      assignIssueToEmployee(1, 1);
      assignIssueToEmployee(2, 1);
      assignIssueToEmployee(3, 2);
      assignIssueToEmployee(4, 2);
      assignIssueToEmployee(5, 2);
      assignIssueToEmployee(6, 3);

      assignIssueToMilestone(0, 0);
      assignIssueToMilestone(1, 0);
      assignIssueToMilestone(2, 1);
      assignIssueToMilestone(3, 1);

      return {
        id: 2,
        name: 'Mocking Bird',
        description: 'second mock dataset',
        milestones,
        issues,
      };
    }

    case 3: {
      const numberOfIssues = issues.length;
      const numberOfEmployees = employees.length;

      for (let i = 0; i < numberOfIssues; i++) {
        const randomStatus = getRandomInt(3); // 0: Open, 1: Closed, 2: InProgress

        if (randomStatus === 2) {
          issues[i].status = Status.InProgress;
        } else if (randomStatus === 1) {
          const randomDate = new Date();
          randomDate.setDate(randomDate.getDate() - getRandomInt(30)); // Assigning a random closedAt date within the last 30 days
          issues[i].closedAt = randomDate;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        assignIssueToEmployee(i, randomEmployee);
      }

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
      return {
        id: 54,
        name: 'Mocking Bird',
        description: 'project only with milestones',
        milestones,
        issues: [],
      };
    }
    case 55: {
      assignIssueToEmployee(0, 0);
      assignIssueToEmployee(1, 1);
      assignIssueToEmployee(2, 1);
      assignIssueToEmployee(3, 2);
      assignIssueToEmployee(4, 2);
      assignIssueToEmployee(5, 2);
      assignIssueToEmployee(6, 3);

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
        name: 'Mocking Bird',
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
