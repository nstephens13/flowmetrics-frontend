import {assert, expect, test, describe, it} from 'vitest'
import {getMockData} from "../__mockdata__/mock-data-helper";
import {calculateWorkload} from "../workload-calculator";

describe('When mock data helper is asked for mock data, there should be correctly constructed mock data object returned ', () => {
    it('is a correct Project Object', () => {
        const project = getMockData(1);

        const loadedIssues = project.issues;
        test('loadedIssues should be an array', () => {
            return Array.isArray(project.issues);
        });

        test('Each item in loadedIssues should be a valid Issue object', () => {
            return loadedIssues.every((issue) => {
                return (
                    typeof issue.id === 'number' &&
                    typeof issue.name === 'string' &&
                    typeof issue.description === 'string' &&
                    issue.assignedTo !== undefined && // Check if assignedTo field is defined
                    typeof issue.assignedTo === 'object' && // Check if assignedTo field is an object
                    typeof issue.assignedTo.id === 'number' && // Check if assignedTo.id is a number
                    typeof issue.assignedTo.firstName === 'string' && // Check if assignedTo.firstName is a string
                    typeof issue.assignedTo.lastName === 'string' && // Check if assignedTo.lastName is a string
                    Array.isArray(issue.assignedTo.assignedIssues) // Check if assignedTo.assignedIssue is an array
                );
            });
        });
    })
})

describe('Workload Calculator should calculate Workload correctly for Mock Data Set 1 ', () => {
    it('is calculation the correct workload for each team member', () => {
        const project = getMockData(1);
        // Calculate the workload
        const workload = calculateWorkload(project);

        // Check if the workload is a Map
        test('workload should be a Map', () => {
            return workload instanceof Map;
        });

        // Check if the workload Map contains correct values
        test('workload should contain correct values', () => {
            // Define the expected workload result based on the mock data
            const expectedWorkload = new Map([
                [project.issues[1].assignedTo, 1]
            ]);

            // Compare the expected workload with the calculated workload
            return JSON.stringify([...workload.entries()]) === JSON.stringify([...expectedWorkload.entries()]);
        });
    })
})
