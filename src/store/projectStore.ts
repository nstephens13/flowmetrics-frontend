import { defineStore } from 'pinia';
import type { ProjectIF } from '@/model/ProjectIF';

const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as ProjectIF[],
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

    deleteProject(projectId: string) {
      const index = this.projects.findIndex((project) => project.id === projectId);
      if (index !== -1) {
        this.projects.splice(index, 1);
      }
    },
  },
});

export default useProjectsStore;
