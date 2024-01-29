import useProjectsStore from '@/store/projectStore';
import fetchProject from '@/api/fetchProject';
import type { ProjectIF } from '@/model/ProjectIF';

export default async function initProjectStore() {
  const projectStore = useProjectsStore();
  projectStore.addProject((await fetchProject(1)) as ProjectIF);
  projectStore.addProject((await fetchProject(2)) as ProjectIF);
  projectStore.addProject((await fetchProject(3)) as ProjectIF);
  projectStore.addProject((await fetchProject(4)) as ProjectIF);
  projectStore.addProject((await fetchProject(5)) as ProjectIF);
  projectStore.addProject((await fetchProject(6)) as ProjectIF);
  projectStore.addProject((await fetchProject(7)) as ProjectIF);
  projectStore.addProject((await fetchProject(8)) as ProjectIF);
  projectStore.addProject((await fetchProject(9)) as ProjectIF);
  projectStore.addProject((await fetchProject(10)) as ProjectIF);
  projectStore.addProject((await fetchProject(11)) as ProjectIF);
  projectStore.addProject((await fetchProject(12)) as ProjectIF);
  projectStore.addProject((await fetchProject(13)) as ProjectIF);
  projectStore.addProject((await fetchProject(14)) as ProjectIF);
  projectStore.addProject((await fetchProject(15)) as ProjectIF);
  projectStore.addProject((await fetchProject(16)) as ProjectIF);
  projectStore.addProject((await fetchProject(17)) as ProjectIF);
  projectStore.addProject((await fetchProject(18)) as ProjectIF);
  projectStore.addProject((await fetchProject(19)) as ProjectIF);
  projectStore.addProject((await fetchProject(20)) as ProjectIF);
}
