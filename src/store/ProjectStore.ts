import { defineStore } from 'pinia';
import type { ProjectIF } from '../model/ProjectIF';
import getMockData from '@/assets/__mockdata__/mockDataComposer';

const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [getMockData(1), getMockData(3), getMockData(4), getMockData(6)] as ProjectIF[],
  }),

  getters: {
    getProjects(): ProjectIF[] {
      return this.projects;
    },
  },

  actions: {
    addProject(project: ProjectIF) {
      this.projects.push(project);
    },

    deleteProject(projectId: number) {
      const index = this.projects.findIndex((project) => project.id === projectId);
      if (index !== -1) {
        this.projects.splice(index, 1);
      }
    },
  },
});

export default useProjectsStore;
