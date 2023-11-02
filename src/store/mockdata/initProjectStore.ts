import getMockData from '@/assets/__mockdata__/mockDataComposer';
import useProjectsStore from '@/store/projectStore';
import { ProjectsApi } from '@/generated-api';
import ConfigurationService from '@/services/config.service';
import { transformProjectToProjectIF } from '@/model/ProjectIF';

export default function initProjectStore() {
  const projectStore = useProjectsStore();

  const projectApi = new ProjectsApi(ConfigurationService.getConfiguration());

  const projects = projectApi.getAllProjects();

  projects.then((data) =>
    data.forEach((project) => projectStore.addProject(transformProjectToProjectIF(project)))
  );

  projectStore.addProject(getMockData(1));
  projectStore.addProject(getMockData(3));
  projectStore.addProject(getMockData(4));
  projectStore.addProject(getMockData(6));
  projectStore.addProject(getMockData(2));
  projectStore.addProject(getMockData(53));
  projectStore.addProject(getMockData(54));
  projectStore.addProject(getMockData(55));
}
