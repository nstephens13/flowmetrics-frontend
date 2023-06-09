import {
  assert, expect, test, describe,
} from 'vitest';
import { getMockData, loadDataFromFile } from '../__mockdata__/mockDataComposer';
import calculateWorkload from '../workloadCalculator';
import type { Employee } from '../../model/Employee';
import type { Project } from '../../model/Project';
import type { IssueIF } from '../../model/IssueIF';

// Just a Helper Function to create my expected Values to compare with real values
function assignIssue(
  project: Project,
  employees: Employee[],
  issueNumber: number,
  employeeNumber: number,
) {
  employees[employeeNumber].assignedIssues.push(project.issues[issueNumber]);
}

// checking first the mock data, my tools, describe the testcase,
// you are working in a closed block, see the '{'
describe('When mock data helper is asked for mock data, there should be correctly constructed mock data object returned ', () => {
  // given and when togehter, scroll to next test to see a better example
  // given+when
  const project: Project = getMockData(1);
  const loadedIssues: IssueIF[] = project.issues;

  // investigate the result
  // then
  test('loadedIssues should be an array', () => {
    // expect and assert are build in functions from the framework
    assert(Array.isArray(project.issues));
  });

  test('Each item in loadedIssues should be a valid Issue object', () => {
    let check = false;
    let oneFail = false;

    loadedIssues.forEach((issue: IssueIF) => {
      if (
        typeof issue.id === 'number'
        && typeof issue.name === 'string'
        && typeof issue.description === 'string'
      ) {
        check = true;
      } else {
        oneFail = true;
      }
    });
    // used this construct for checking all Items
    assert(check && !oneFail);
  });
});

// Now checking my own functions
describe('Workload Calculator should calculate Workload correctly for Mock Data Set 2 ', () => {
  // preparing my datastructure that i need as parameter in the tested function and

  // given
  const project = getMockData(2);
  const employees: Employee[] = loadDataFromFile<Employee>(
    'src/services/__mockdata__/Employees.json',
  );

  // assigning the issues to my own employee array as in dataset 2 just for deep equal comparison
  assignIssue(project, employees, 0, 0);
  assignIssue(project, employees, 1, 1);
  assignIssue(project, employees, 2, 1);
  assignIssue(project, employees, 3, 2);
  assignIssue(project, employees, 4, 2);
  assignIssue(project, employees, 5, 2);
  assignIssue(project, employees, 6, 3);

  // calling the function that is getting tested

  // when
  const workload = calculateWorkload(project);

  // inspecting the result

  // then

  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should only contain four key value pairs', () => {
    expect(workload.size).eq(4);
  });

  // checking the calculations, the expected value come from the prepared employees array,
  // the actual value is from the result
  test('workload should contain correct key value pairs', () => {
    workload.forEach((tuple: { openIssues: number; closedIssues: number }, employee: Employee) => {
      const openIssuesList = [1, 2, 3, 1]; // expected values for open issues from json file
      employees.forEach((emp) => {
        if (employee.id === emp.id) {
          assert.deepEqual<Employee>(employee, emp);
          expect(tuple.openIssues).eq(openIssuesList[employee.id - 1]);
        }
      });
    });
  });
});

// Write at least tests that fixes the expected behaviour,
// that you can see when changes in code broke something

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 1 ', () => {
  // given
  const project = getMockData(1);
  const employees: Employee[] = loadDataFromFile<Employee>(
    'src/services/__mockdata__/Employees.json',
  );

  // when
  const workload = calculateWorkload(project);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should contain one key value pair', () => {
    expect(workload.size).eq(1);
  });

  // when
  const employee = workload.keys().next().value;
  assignIssue(project, employees, 1, 1);

  // then
  test('workload should contain correct values', () => {
    assert.deepEqual<Employee>(employee, employees[1]);
    expect(workload.get(employee)?.openIssues).eq(1);
  });
});

// and also check for the most common possible ways that things can fail,
// missing fields in data objects
describe('Workload Calculator should calculate Workload correctly for Mock Data Set 53 ', () => {
  // given
  const project = getMockData(53);

  // when
  const workload = calculateWorkload(project);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should be empty', () => {
    expect(workload.size).eq(0);
  });
});

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 54 ', () => {
  // given
  const project = getMockData(54);

  // when
  const workload = calculateWorkload(project);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should be empty', () => {
    expect(workload.size).eq(0);
  });
});
