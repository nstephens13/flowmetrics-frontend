import type { EmployeeIF } from './EmployeeIF';
import type { SLARule } from '@/model/SLARule';
import type { ChangeEventIF } from '@/model/ChangeEventIF';

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
 * @prop {Status} status the Status of issue-progress
 * @prop {SLARule} assignedSLARule the assigned SLA rule of the issue
 */

// Enum to set status of Issue
export interface IssueIF {
  id: number;
  name: string;
  description: string | null;
  assignedTo: EmployeeIF | null;
  createdBy: EmployeeIF | null;
  createdAt: Date | null;
  closedAt: Date | null;
  dueTo: Date | null;
  status: string | null;
  statusChanges: number | null;
  lastStatusChange: Date | null;
  assignedSLARule: SLARule[] | null;
  changelog: ChangeEventIF[] | null;
}

// function to check if issue has an assigned SLA rule
export function hasSLARule(issue: IssueIF): boolean {
  return issue.assignedSLARule !== null;
}

// print assigned SLA rule names of issue
export function printSLARuleNames(issue: IssueIF): string {
  if (issue.assignedSLARule === null) {
    return '';
  }
  return issue.assignedSLARule.map((rule) => rule.name).join(', ');
}
