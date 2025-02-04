import { assert, expect, test, describe } from 'vitest';
import getMockData from '@/assets/__mockdata__/mockDataComposer';
import { calculateWorkload } from '@/services/workloadCalculator';
import type { EmployeeIF } from '../../model/EmployeeIF';
import type { ProjectIF } from '../../model/ProjectIF';
import type { IssueIF } from '../../model/Issue/IssueIF';

import employeeJson from '../../assets/__mockdata__/json/Employees.json';

// checking first the mock data, my tools, describe the testcase,
// you are working in a closed block, see the '{'
describe('When mock data helper is asked for mock data, there should be correctly constructed mock data object returned ', () => {
  // given and when together, scroll to next test to see a better example
  // given+when
  const project: ProjectIF = getMockData(1);
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
        typeof issue.id === 'number' &&
        typeof issue.name === 'string' &&
        typeof issue.description === 'string'
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
  const employees: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];

  // when
  const workload = calculateWorkload([project]);

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
    workload.forEach((tuple: { planning: number; testing: number }, employee: EmployeeIF) => {
      const openIssuesList = [1, 2, 3, 1]; // expected values for open issues from json file
      employees.forEach((emp) => {
        if (employee.id === emp.id) {
          assert.deepEqual<EmployeeIF>(employee, emp);
          expect(tuple.planning).eq(openIssuesList[employee.id - 1]);
        }
      });
    });
  });
});

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 55', () => {
  // preparing my data structure that I need as a parameter in the tested function

  // given
  const project = getMockData(55);
  const employees: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];

  // calling the function that is being tested

  // when
  const workload = calculateWorkload([project]);

  // inspecting the result

  // then

  test('workload should be a Map', () => {
    expect(workload).toBeInstanceOf(Map);
  });

  test('map should only contain four key-value pairs', () => {
    expect(workload.size).toBe(4);
  });

  // checking the calculations, the expected value comes from the prepared employees array,
  // the actual value is from the result
  test('workload should contain correct key-value pairs', () => {
    workload.forEach(
      (tuple: { planning: number; development: number; testing: number }, employee: EmployeeIF) => {
        const openIssuesList = [0, 1, 0, 0]; // expected values for open issues
        const inProgressIssuesList = [1, 0, 1, 0]; // expected values for in-progress issues
        const closedIssuesList = [0, 1, 2, 1]; // expected values for closed issues

        employees.forEach((emp) => {
          if (employee.id === emp.id) {
            expect(employee).toEqual(emp);
            expect(openIssuesList[employee.id - 1]).toBe(tuple.planning);
            expect(tuple.development).toBe(inProgressIssuesList[employee.id - 1]);
            expect(tuple.testing).toBe(closedIssuesList[employee.id - 1]);
          }
        });
      }
    );
  });
});
// Write at least tests that fixes the expected behaviour,
// that you can see when changes in code broke something

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 1 ', () => {
  // given
  const project = getMockData(1);
  const employees: EmployeeIF[] = employeeJson as EmployeeIF[];

  // when
  const workload = calculateWorkload([project]);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should contain one key value pair', () => {
    expect(workload.size).eq(1);
  });

  // when
  const employee = workload.keys().next().value;

  // then
  test('workload should contain correct values', () => {
    assert.deepEqual<EmployeeIF>(employee, employees[1]);
    expect(workload.get(employee)?.planning).eq(1);
  });
});

// and also check for the most common possible ways that things can fail,
// missing fields in data objects
describe('Workload Calculator should calculate Workload correctly for Mock Data Set 53 ', () => {
  // given
  const project = getMockData(53);

  // when
  const workload = calculateWorkload([project]);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should be empty', () => {
    expect(workload.size).eq(0);
  });
});

describe('Workload Calculator should calculate Workload correctly for empty statement', () => {
  // given
  const workload = calculateWorkload([]);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should have same size', () => {
    expect(0).eq(workload.size);
  });
});

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 54 ', () => {
  // given
  const project = getMockData(54);

  // when
  const workload = calculateWorkload([project]);

  // then
  test('workload should be a Map', () => {
    expect(workload).instanceof(Map);
  });

  test('map should be empty', () => {
    expect(0).eq(workload.size);
  });
});
