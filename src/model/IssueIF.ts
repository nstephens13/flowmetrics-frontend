import type { EmployeeIF } from './EmployeeIF';

export enum Status {
  Open = 'Open',
  Closed = 'Closed',
  InProgress = 'In Progress'
}

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string| null} description the description of the issue
 * @prop {EmployeeIF| null} assignedTo the employee that is assigned to the issue
 * @prop {EmployeeIF} createdBy the employee that created the issue
 * @prop {Date} createdAt the Date when the issue was created
 * @prop {Date| null} closedAt the Date when the issue was closed
 * @prop {Date| null} dueTo Due date for the Issue
 * @prop {Status} status the Status of ticket-progress
 */

// Enum to set status of Issue
export interface IssueIF {
  id: number;
  name: string;
  description: string | null;
  assignedTo: EmployeeIF | null;
  createdBy: EmployeeIF;
  createdAt: Date;
  closedAt: Date | null;
  dueTo: Date | null;
  status: Status | null;
  userStatus: string | null;
}
