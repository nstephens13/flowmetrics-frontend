import type {Project} from "@/model/Project";
import type {Employee} from "@/model/Employee";
import type {Issue} from "@/model/Issue";
//just temporary import
import {getMockData} from "@/services/__mockdata__/mock-data-helper";

export function calculateWorkload(project: Project): Map<Employee, number> {
    const employeeMap: Map<Employee, number> = new Map([])
    const issueSet: Set<Issue> = new Set<Issue>();
    let projectToCalculate: Project;

    //ToDo: decouple the mock data when everything is setup
    if (project === undefined || project === null) {
        projectToCalculate = getMockData();
    } else {
        projectToCalculate = project
    }

    function extractEmployeeAndUpdateEmployeeMap(issue: Issue) {
        if (!issueSet.has(issue)) {


            const number: number | undefined = employeeMap.get(issue.assignedTo);

            if (number === undefined) {
                employeeMap.set(issue.assignedTo, 1)
            } else {
                employeeMap.set(issue.assignedTo, number + 1)
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
