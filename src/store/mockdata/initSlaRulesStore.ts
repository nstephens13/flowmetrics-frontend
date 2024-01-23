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
    {
      id: 8,
      name: 'Category 8',
      project: projectStore.projects[7],
      rules: generateRules(),
    },
    {
      id: 9,
      name: 'Category 9',
      project: projectStore.projects[8],
      rules: generateRules(),
    },
    {
      id: 12,
      name: 'Category 12',
      project: projectStore.projects[9],
      rules: generateRules(),
    },
    {
      id: 11,
      name: 'Category 11',
      project: projectStore.projects[12],
      rules: generateRules(),
    },
    {
      id: 12,
      name: 'Category 12',
      project: projectStore.projects[11],
      rules: generateRules(),
    },
    {
      id: 13,
      name: 'Category 13',
      project: projectStore.projects[12],
      rules: generateRules(),
    },
    {
      id: 14,
      name: 'Category 14',
      project: projectStore.projects[13],
      rules: generateRules(),
    },
    {
      id: 15,
      name: 'Category 15',
      project: projectStore.projects[14],
      rules: generateRules(),
    },
    {
      id: 16,
      name: 'Category 16',
      project: projectStore.projects[15],
      rules: generateRules(),
    },
    {
      id: 17,
      name: 'Category 17',
      project: projectStore.projects[16],
      rules: generateRules(),
    },
    {
      id: 18,
      name: 'Category 18',
      project: projectStore.projects[17],
      rules: generateRules(),
    },
    {
      id: 19,
      name: 'Category 19',
      project: projectStore.projects[18],
      rules: generateRules(),
    },
    {
      id: 20,
      name: 'Category 20',
      project: projectStore.projects[19],
      rules: generateRules(),
    },
  ];
  categories.forEach((category) => {
    slaRulesStore.addCategory(category);
  });
}
