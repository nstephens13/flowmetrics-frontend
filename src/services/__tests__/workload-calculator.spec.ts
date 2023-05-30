import {assert, expect, test, describe, it} from 'vitest'
import {getMockData, loadDataFromFile} from "../__mockdata__/mock-data-helper";
import {calculateWorkload} from "../workload-calculator";
import type {Employee} from "../../model/Employee";
import type {Project} from "../../model/Project";

function assignIssue(project: Project, employees: Employee[], issueNumber: number, employeeNumber: number) {
    project.issues[issueNumber].assignedTo = employees[employeeNumber];
    employees[employeeNumber].assignedIssues.push(project.issues[issueNumber]);
}

describe('When mock data helper is asked for mock data, there should be correctly constructed mock data object returned ', () => {
    //given+when
    const project = getMockData(1);
    const loadedIssues = project.issues;

    //then
    test('loadedIssues should be an array', () => {
        expect(Array.isArray(project.issues)).true;
    });

    test('Each item in loadedIssues should be a valid Issue object', () => {
        let check: boolean = false;
        let oneFail: boolean = false;
        loadedIssues.every((issue) => {
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
        expect(check&&!oneFail).true
    });
});

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 2 ', () => {
    //given
    const project = getMockData(2);
    const employees: Employee[] = loadDataFromFile<Employee>('src/services/__mockdata__/Employees.json');
    assignIssue(project, employees,0, 0);
    assignIssue(project, employees,1,1);
    assignIssue(project, employees,2,1);
    assignIssue(project, employees,3,2);
    assignIssue(project, employees,4,2);
    assignIssue(project, employees,5,2);
    assignIssue(project, employees,6,3);

    // when
    const workload: Map<Employee, number> = calculateWorkload(project);


    //then
    test('workload should be a Map', () => {
        expect(workload).instanceof(Map);
    });

    test('map should only contain four key value pairs', () => {
        expect(workload.size).eq(4);
    })


    test('workload should contain correct key value pairs', () => {
        for (const [employee, value] of workload.entries()) {
            if (employee.id === employees[0].id) {
                assert.deepEqual<Employee>(employee, employees[0])
                expect(workload.get(employee)).eq(1)
            } else if(employee.id === employees[1].id) {
                assert.deepEqual<Employee>(employee, employees[1])
                expect(workload.get(employee)).eq(2)
            } else if ((employee.id === employees[2].id)) {
                assert.deepEqual<Employee>(employee, employees[2])
                expect(workload.get(employee)).eq(3)
            } else if (employee.id === employees[3].id) {
                assert.deepEqual<Employee>(employee, employees[3])
                expect(workload.get(employee)).eq(1)
            }
        }
    });
})



describe('Workload Calculator should calculate Workload correctly for Mock Data Set 1 ', () => {
    //given
    const project = getMockData(1);
    const employees: Employee[] = loadDataFromFile<Employee>('src/services/__mockdata__/Employees.json');

    // when
    const workload = calculateWorkload(project);


    // then
    test('workload should be a Map', () => {
        expect(workload).instanceof(Map);
    });

    test('map should contain one key value pair', () => {
        expect(workload.size).eq(1);
    })

    //when
    const employee = workload.keys().next().value;
    assignIssue(project, employees, 1, 1);

    //then
    test('workload should contain correct values', () => {
        assert.deepEqual<Employee>(employee, employees[1])
        expect(workload.get(employee)).eq(1)
    });
})
