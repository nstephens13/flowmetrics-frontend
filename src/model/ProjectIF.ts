import { nonDisplayedStatusList } from '@/assets/__mockdata__/mockDataComposer';
import type { IssueIF } from './IssueIF';
import type { MilestoneIF } from './MilestoneIF';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { Project } from '@/generated-api';

/**
 *
 * @prop {number} id project id
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {Milestone[]} milestones a array of Milestone - objects assigned to the project
 * @prop {Issue[]} issues a array of Issues - objects that are assigned to the project
 * but not to a milestone
 */
export interface ProjectIF {
  id: string;
  name: string;
  description: string;
  milestones: MilestoneIF[];
  issues: IssueIF[];
  slaSubscriber: SLASubscriber | null;
}

function getIssueStatusList(issues: IssueIF[]): string[] {
  return Array.from(
    new Set(
      issues
        .map((issue) => issue.status)
        .filter((status) => status && !nonDisplayedStatusList.includes(status))
        .filter((status): status is string => status !== null)
    )
  );
}

function transformProjectToProjectIF(project: Project): ProjectIF {
  return {
    // Map properties from Project to ProjectIF
    id: project.id ? project.id : '', // Ensure the data type matches and provide a default value if 'id' is missing
    name: project.name ? project.name : '',
    description: project.description ? project.description : '',
    issues: [],
    milestones: [],
    slaSubscriber: null,
  };
}

export { getIssueStatusList, transformProjectToProjectIF };
