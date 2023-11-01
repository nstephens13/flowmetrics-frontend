import getMockData from '@/assets/__mockdata__/mockDataComposer';
import useProjectsStore from '@/store/projectStore';

export default function initProjectStore() {
  const projectStore = useProjectsStore();
  projectStore.addProject(getMockData(1));
  projectStore.addProject(getMockData(3));
  projectStore.addProject(getMockData(4));
  projectStore.addProject(getMockData(6));
}
