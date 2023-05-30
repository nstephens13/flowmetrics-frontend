import type {Employee} from "./Employee";

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string} description the description of the issue
 * @prop {Employee} assignedTo the employee that is assigned to the issue
 */
export interface Issue {
    id: number;
    name: string;
    description: string;
    assignedTo: Employee;
}
