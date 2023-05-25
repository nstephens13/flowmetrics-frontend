import type {Issue} from "@/model/Issue";

export interface Milestone {
    id: number;
    name: string;
    description: string;
    issues: Issue[];
}