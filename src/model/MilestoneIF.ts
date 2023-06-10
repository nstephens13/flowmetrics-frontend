import type { IssueIF } from './IssueIF';

/**
 *
 * @prop {number} id milestone id
 * @prop {string} name the name of the milestone
 * @prop {string} description the description of the milestone
 * @prop {Issue[]} issues a array of Issues - objects that are assigned to this milestone
 */
export interface MilestoneIF {
  id: number
  name: string
  description: string
  issues: IssueIF[]
}
