import type {Project} from "../../model/Project";
import type {Milestone} from "../../model/Milestone";
import type {Issue} from "../../model/Issue";
import type {Employee} from "../../model/Employee";

// mock data section
// Generate fake employees
const employees: Employee[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        assignedIssue: []
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        assignedIssue: []
    },
    {
        id: 3,
        firstName: "Mike",
        lastName: "Johnson",
        assignedIssue: []
    }
];

// Generate fake issues
const issue1: Issue = {
    id: 1,
    name: "Issue 1",
    description: "Description for Issue 1",
    assignedTo: employees[0]
};

const issue2: Issue = {
    id: 2,
    name: "Issue 2",
    description: "Description for Issue 2",
    assignedTo: employees[1]
};

const issue3: Issue = {
    id: 3,
    name: "Issue 3",
    description: "Description for Issue 3",
    assignedTo: employees[2]
};

// Generate fake milestones
const milestones: Milestone[] = [
    {
        id: 1,
        name: "Milestone 1",
        description: "Has just one issue",
        issues: [issue2]
    },
    {
        id: 2,
        name: "Milestone 2",
        description: "a milestone without issues",
        issues: []
    }
];

//give out a fake project
export function getMockData(): Project {
    const issues: Issue[] = [
        issue1,
        issue3
    ]

    // Assign issues to respective employees
    employees[0].assignedIssue.push(issue1);
    employees[1].assignedIssue.push(issue2);
    employees[2].assignedIssue.push(issue3);


    return  {
        id: 5, name: "MockingBird", description: "first try with mocking some data for the frontend", milestones, issues
    }
}
