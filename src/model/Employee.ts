import type {Issue} from "@/model/Issue";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    assignedIssue: Issue[];
}