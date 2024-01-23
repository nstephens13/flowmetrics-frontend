import useSlaRulesStore from '@/store/slaRulesStore';
import useProjectStore from '@/store/projectStore';
import generateRules from '@/store/mockdata/RulesGenerator';
import type { CategoryIF } from '@/model/Sla/CategoryIF';

export default function initSlaRulesStore() {
  const slaRulesStore = useSlaRulesStore();
  const projectStore = useProjectStore();
  const categories: CategoryIF[] = [
    {
      id: 1,
      name: 'Category 1',
      project: projectStore.projects[0],
      rules: generateRules(),
    },
    {
      id: 2,
      name: 'Category 2',
      project: projectStore.projects[1],
      rules: generateRules(),
    },
    {
      id: 3,
      name: 'Category 3',
      project: projectStore.projects[2],
      rules: generateRules(),
    },
    {
      id: 4,
      name: 'Category 4',
      project: projectStore.projects[3],
      rules: generateRules(),
    },
    {
      id: 5,
      name: 'Category 5',
      project: projectStore.projects[4],
      rules: generateRules(),
    },
    {
      id: 6,
      name: 'Category 6',
      project: projectStore.projects[5],
      rules: generateRules(),
    },
    {
      id: 7,
      name: 'Category 7',
      project: projectStore.projects[6],
      rules: generateRules(),
    },
  ];
  categories.forEach((category) => {
    slaRulesStore.addCategory(category);
  });
}
