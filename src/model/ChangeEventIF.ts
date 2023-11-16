import type { EmployeeIF } from '@/model/EmployeeIF';

export enum ChangeEventEnum {
  created,
  closed,
  assigned,
  unassigned,
}

/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 * @prop {string} emailAddress email address of the employee
 * @prop {string} avatarUrl a link to the avatar url on jira
 * @prop {string} status the current status of the employee if is he still working or quit
 */
export interface ChangeEventIF {
  id: string;
  changeDescription: ChangeEventEnum;
  timestamp: Date;
  assigned: EmployeeIF | null;
}
