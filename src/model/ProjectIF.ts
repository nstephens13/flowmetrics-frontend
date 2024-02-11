import { nonDisplayedStatusList, nonDisplayedStateList } from '@/services/Issue';
import type { IssueIF } from './Issue/IssueIF';

/**
 *
 * @prop {number} id project id
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {Issue[]} issues a array of Issues - objects that are assigned to the project
 * @prop {SlaCustomerProject} slaSubscriber the slaSubscriber of the project
 * but not to a milestone
 */
export interface ProjectIF {
  id: number;
  name: string;
  description: string;
  issues: IssueIF[];
}

export function getIssueStatusList(issues: IssueIF[]): string[] {
  const statusList: string[] = Array.from(
    new Set(
      issues
        .map((issue) => issue.status)
        .filter((status) => status && !nonDisplayedStatusList.includes(status))
        .filter((status): status is string => status !== null)
    )
  );
  return statusList || ([] as string[]);
}

export function getIssueStateList(issues: IssueIF[]): string[] {
  const stateList: string[] = Array.from(
    new Set(
      issues
        .map((issue) => issue.state)
        .filter((state) => state && !nonDisplayedStateList.includes(state))
        .filter((state): state is string => state !== null)
    )
  );
  return stateList;
}
