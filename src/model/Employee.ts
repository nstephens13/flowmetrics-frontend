import type {Issue} from "./Issue";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    assignedIssue: Issue[];
}
