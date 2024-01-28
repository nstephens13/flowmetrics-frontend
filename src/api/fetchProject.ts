import type { ProjectIF } from '@/model/ProjectIF';
import { getProject } from '@/assets/__mockdata__/mockdata';
import type { IssueIF } from '@/model/Issue/IssueIF';

export default async function fetchProject(projectId: number): Promise<ProjectIF> {
  const endpoint = `/api/project/${projectId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      issues: data.issues.json() as IssueIF[],
    } as ProjectIF;
  } catch (err) {
    // console.log('response unsuccessful, using mock data', err);
    return getProject(projectId);
  }
}
