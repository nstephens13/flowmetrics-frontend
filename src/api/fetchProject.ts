import type { ProjectIF } from '@/model/ProjectIF';
import { getProject } from '@/assets/__mockdata__/mockdata';
import type { IssueIF } from '@/model/Issue/IssueIF';

/**
 * Function to fetch a project from the backend server
 * @param projectId the id of the project to be fetched
 * @returns {Promise<ProjectIF>} will return the project as a ProjectIF or a rejected promise
 * @throws {Error} gets Project from mock data if response is unsuccessful
 * @author Nived Stephen
 */
export default async function fetchProject(projectId: number): Promise<ProjectIF> {
  let projectIdToBeFetched = projectId;
  if (projectIdToBeFetched === 0 || projectIdToBeFetched > 20) {
    projectIdToBeFetched = 1;
  }
  const endpoint = `/api/project/${projectIdToBeFetched}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      issues: data.issues as IssueIF[],
    } as ProjectIF;
  } catch (err) {
    return getProject(projectIdToBeFetched);
  }
}
