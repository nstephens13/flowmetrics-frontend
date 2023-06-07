import type { Issue } from './Issue';

/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 * @prop {Issue[]} assignedIssues a array of Issues - objects that are assigned to this employee
 */
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  assignedIssues: Issue[];
}
