import fs from "fs";
import type {Project} from "@/model/Project";
import type {Employee} from "@/model/Employee";
import type {Issue} from "@/model/Issue";
import type {Milestone} from "@/model/Milestone";

function loadDataFromFile<T>(filePath: string): T[] {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileData) as T[];
        console.log('Data loaded from file.');
        return data;
    } catch (error) {
        console.error('Error loading data from file:', error);
        return [];
    }
}

//give out a fake project
export function getMockData(dataset: number = 1): Project {
    const employees: Employee[] = loadDataFromFile<Employee>('src/services/__mockdata__/Employees.json');
    const issues: Issue[] = loadDataFromFile<Issue>('src/services/__mockdata__/Issues.json');
    const milestones: Milestone[] = loadDataFromFile<Milestone>('src/services/__mockdata__/Milestones.json');

    switch (dataset) {

        case 1: {
            issues[1].assignedTo = employees[1];
            const issuesFromEmployee: Issue[] = employees[1].assignedIssues;
            issuesFromEmployee.push(issues[1]);

            return {
                id: 5, name: "Mocking Bird", description: "a test project for the mock data creator", milestones, issues
            }
        }
        default: {
            return {
                id: 0, name: "default", description: "a empty project", milestones: [], issues: []
            }
        }
    }
    // Assign issues to respective employees

}
