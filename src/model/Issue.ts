import type { Employee } from './Employee';

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string} description the description of the issue
 * @prop {Employee} assignedTo the employee that is assigned to the issue
 * @prop {Employee} createdBy the employee that created the issue
 * @prop {Date} createdAt the Date when the issue was created
 * @prop {Date} closedAt the Date when the issue was closed
 * @prop {status} status status of ticket-progress
 */

enum status{
  Open,
  Closed,
  InWork,
  Resolved,
  // Zombie
}

export interface Issue {

  id: number;
  name: string;
  description: string| null;
  assignedTo: Employee| null;
  createdBy: Employee;
  createdAt: Date;
  closedAt: Date| null;
  status: status;
}
