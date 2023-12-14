import getMockData from '@/assets/__mockdata__/mockDataComposer';
import { getProject } from '@/assets/__mockdata__/mockdata';
import useProjectsStore from '@/store/projectStore';

export default function initProjectStore() {
  const projectStore = useProjectsStore();
  projectStore.addProject(getMockData(1));
  projectStore.addProject(getMockData(3));
  projectStore.addProject(getMockData(4));
  projectStore.addProject(getMockData(6));
  projectStore.addProject(getProject(1));
  projectStore.addProject(getProject(2));
  projectStore.addProject(getProject(3));
  projectStore.addProject(getProject(4));
  projectStore.addProject(getProject(5));
  projectStore.addProject(getProject(6));
  projectStore.addProject(getProject(7));
  projectStore.addProject(getProject(8));
  projectStore.addProject(getProject(9));
  projectStore.addProject(getProject(10));
  projectStore.addProject(getProject(11));
  projectStore.addProject(getProject(12));
  projectStore.addProject(getProject(13));
  projectStore.addProject(getProject(14));
  projectStore.addProject(getProject(15));
  projectStore.addProject(getProject(16));
  projectStore.addProject(getProject(17));
  projectStore.addProject(getProject(18));
  projectStore.addProject(getProject(19));
  projectStore.addProject(getProject(20));
}
