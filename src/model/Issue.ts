import type { Employee } from './Employee';

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string} description the description of the issue
 * @prop {Employee} assignedTo the employee that is assigned to the issue
 * @prop {Date} createdAt the Date when the issue was created
 * @prop {Date} closedAt the Date when the issue was closed
 */
export interface Issue {
  id: number
  name: string
  description: string
  assignedTo: Employee
  createdAt: Date
  closedAt: Date
}
