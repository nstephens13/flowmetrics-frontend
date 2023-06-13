import type { IssueIF } from './IssueIF';

/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 * @prop {Issue[]} assignedIssues a array of Issues - objects that are assigned to this employee
 */
export interface EmployeeIF {
  id: number
  firstName: string
  lastName: string
  assignedIssues: IssueIF[]

}
