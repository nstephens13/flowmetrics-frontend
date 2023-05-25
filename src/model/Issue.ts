import type {Employee} from "./Employee";

export interface Issue {
    id: number;
    name: string;
    description: string;
    assignedTo: Employee;
}
