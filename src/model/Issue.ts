import type {Employee} from "@/model/Employee";

export interface Issue {
    id: number;
    name: string;
    description: string;
    assignedTo: Employee;
}