import type {Issue} from "./Issue";
import type {Milestone} from "./Milestone";

export interface Project {
    id: number;
    name: string;
    description: string;
    milestones: Milestone[];
    issues: Issue[];
}
