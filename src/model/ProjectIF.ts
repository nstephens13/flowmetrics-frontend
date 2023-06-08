import type { IssueIF } from './IssueIF';
import type { MilestoneIF } from './MilestoneIF';

/**
 *
 * @prop {number} id project id
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {MilestoneIF[]} milestones a array of Milestone - objects assigned to the project
 * @prop {IssueIF[]} issues a array of Issues - objects that are assigned to the project
 * but not to a milestone
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  milestones: MilestoneIF[];
  issues: IssueIF[];
}
