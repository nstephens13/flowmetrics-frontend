import getMockData from '@/assets/__mockdata__/mockDataComposer';
import useProjectsStore from '@/store/projectStore';
import { ProjectsApi } from '@/generated-api';

export default function initProjectStore() {
  const projectStore = useProjectsStore();

  const apiConfig = new Conf

  const projectApi = new ProjectsApi(c)

  projectStore.addProject(getMockData(1));
  projectStore.addProject(getMockData(3));
  projectStore.addProject(getMockData(4));
  projectStore.addProject(getMockData(6));
}
