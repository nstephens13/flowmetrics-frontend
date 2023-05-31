import type {Project} from "@/model/Project";
import type {Employee} from "@/model/Employee";
import type {Issue} from "@/model/Issue";

//just temporary import
import {getMockData} from "@/services/__mockdata__/mock-data-helper";

export function calculateWorkload(project: Project): Map<Employee, { openIssues: number, closedIssues: number }> {
    const employeeMap: Map<Employee, { openIssues: number, closedIssues: number }> = new Map([])
    const issueSet: Set<Issue> = new Set<Issue>();
    let projectToCalculate: Project;

    //ToDo: decouple the mock data when everything is setup
    if (project === undefined || project === null) {
        projectToCalculate = getMockData();
    } else {
        projectToCalculate = project
    }

    function extractEmployeeAndUpdateEmployeeMap(issue: Issue) {
        if (!issueSet.has(issue) && issue.assignedTo !== null && issue.assignedTo !== undefined) {
            let numberOpenTickets: number;
            let numberClosedTickets: number;

            const tupel: { openIssues: number, closedIssues: number } | undefined = employeeMap.get(issue.assignedTo);

            if (tupel !== undefined) {
                numberOpenTickets = tupel.openIssues
                numberClosedTickets = tupel.closedIssues
            } else {
                numberOpenTickets = 0;
                numberClosedTickets = 0;
            }

            if (issue.closedAt === undefined || issue.closedAt === null) {
                employeeMap.set(issue.assignedTo, {
                    openIssues: numberOpenTickets + 1,
                    closedIssues: numberClosedTickets
                });
            } else {
                employeeMap.set(issue.assignedTo, {
                    openIssues: numberOpenTickets,
                    closedIssues: numberClosedTickets + 1
                })
            }
            issueSet.add(issue);
        }
    }

    projectToCalculate.issues.forEach((issue) => {
            extractEmployeeAndUpdateEmployeeMap(issue);
        }
    )
    projectToCalculate.milestones.forEach((milestone) => {
            milestone.issues.forEach((issue) => {
                extractEmployeeAndUpdateEmployeeMap(issue);
            })
        }
    )
    return employeeMap;
}
