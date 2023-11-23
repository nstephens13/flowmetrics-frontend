import { nonDisplayedStatusList } from '@/assets/__mockdata__/mockDataComposer';
import type { IssueIF } from './Issue/IssueIF';
import type { SlaSubscriber } from '@/model/Sla/SlaSubscriber';

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
  id: number;
  name: string;
  description: string;
  issues: IssueIF[];
  slaSubscriber: SlaSubscriber | null;
}

function getIssueStatusList(issues: IssueIF[]): string[] {
  const statusList: string[] = Array.from(
    new Set(
      issues
        .map((issue) => issue.status)
        .filter((status) => status && !nonDisplayedStatusList.includes(status))
        .filter((status): status is string => status !== null)
    )
  );
  return statusList;
}

export { getIssueStatusList };
