import type { Issue } from './Issue';
import type { Milestone } from './Milestone';

/**
 *
 * @prop {number} id project id
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {Milestone[]} milestones a array of Milestone - objects assigned to the project
 * @prop {Issue[]} issues a array of Issues - objects that are assigned to the project
 * but not to a milestone
 */
export interface Project {
  id: number
  name: string
  description: string
  milestones: Milestone[]
  issues: Issue[]
}
