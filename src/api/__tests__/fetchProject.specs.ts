import { describe, expect, test } from 'vitest';
import fetchProject from '../fetchProject';

describe('fetchProject', () => {
  test('should return a project', async () => {
    const project = await fetchProject(2);
    expect(project).toHaveProperty('id');
    expect(project.id).toBe(10002);
    expect(project).toHaveProperty('name');
    expect(project).toHaveProperty('description');
    expect(project).toHaveProperty('issues');
  });
  test('should return a project with id 1 if id is 0', async () => {
    const project = await fetchProject(0);
    expect(project).toHaveProperty('id');
    expect(project.id).toBe(10001);
  });
  test('should return a project with id 1 if id is greater than 20', async () => {
    const project = await fetchProject(21);
    expect(project).toHaveProperty('id');
    expect(project.id).toBe(10001);
  });
});
