import type {Issue} from "./Issue";

export interface Milestone {
    id: number;
    name: string;
    description: string;
    issues: Issue[];
}
