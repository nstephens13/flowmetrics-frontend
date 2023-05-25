import type {Issue} from "@/model/Issue";
import type {Milestone} from "@/model/Milestone";

export interface Project {
    id: number;
    name: string;
    description: string;
    milestones: Milestone[];
    issues: Issue[];
}