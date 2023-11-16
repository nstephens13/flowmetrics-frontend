import type { EmployeeIF } from '@/model/EmployeeIF';

export enum ChangeEventEnum {
  created,
  closed,
  assigned,
  unassigned,
}

/**
 *
 * @prop {number} id change event id
 * @prop {ChangeEventEnum} changeDescription the category of the event
 * @prop {Date} timestamp
 * @prop {EmployeeIF} assigned the Employee if its a assigned-Event
 */
export interface ChangeEventIF {
  id: string;
  changeDescription: ChangeEventEnum;
  timestamp: Date;
  assigned: EmployeeIF | null;
}
