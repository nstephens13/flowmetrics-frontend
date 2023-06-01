import fs from 'fs'
import type { Project } from '@/model/Project'
import type { Employee } from '@/model/Employee'
import type { Issue } from '@/model/Issue'
import type { Milestone } from '@/model/Milestone'

export function loadDataFromFile<T>(filePath: string): T[] {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileData) as T[]
  } catch (error) {
    return []
  }
}

// give out a fake project
export function getMockData(dataset: number = 2): Project {
  const employees: Employee[] = loadDataFromFile<Employee>(
    'src/services/__mockdata__/Employees.json'
  )
  const issues: Issue[] = loadDataFromFile<Issue>('src/services/__mockdata__/Issues.json')
  const milestones: Milestone[] = loadDataFromFile<Milestone>(
    'src/services/__mockdata__/Milestones.json'
  )

  function assignIssueToEmployee(issueNumber: number, employeeNumber: number) {
    issues[issueNumber].assignedTo = employees[employeeNumber]
    employees[employeeNumber].assignedIssues.push(issues[issueNumber])
  }
  function assignIssueToMilestone(issueNumber: number, milestoneNumber: number) {
    milestones[milestoneNumber].issues.push(issues[issueNumber])
  }

  switch (dataset) {
    case 1: {
      assignIssueToEmployee(1, 1)
      return {
        id: 1,
        name: 'Mocking Bird',
        description: 'first mock dataset',
        milestones,
        issues
      }
    }
    case 2: {
      assignIssueToEmployee(0, 0)
      assignIssueToEmployee(1, 1)
      assignIssueToEmployee(2, 1)
      assignIssueToEmployee(3, 2)
      assignIssueToEmployee(4, 2)
      assignIssueToEmployee(5, 2)
      assignIssueToEmployee(6, 3)

      assignIssueToMilestone(0, 0)
      assignIssueToMilestone(1, 0)
      assignIssueToMilestone(2, 1)
      assignIssueToMilestone(3, 1)

      return {
        id: 2,
        name: 'Mocking Bird',
        description: 'second mock dataset',
        milestones,
        issues
      }
    }

    // only test cases
    case 53: {
      return {
        id: 53,
        name: 'Mocking Bird',
        description: 'project without issues and milestones',
        issues: [],
        milestones: []
      }
    }
    case 54: {
      return {
        id: 54,
        name: 'Mocking Bird',
        description: 'project only with milestones',
        milestones,
        issues: []
      }
    }
    default: {
      return {
        id: 0,
        name: 'default',
        description: 'a empty project',
        milestones: [],
        issues: []
      }
    }
  }
}
