import useSlaRulesStore from '@/store/slaRulesStore';
import useProjectStore from '@/store/projectStore';
import type { RuleIF } from '@/model/Sla/RuleIF';
import IssueTypes from '@/assets/__mockdata__/IssueProps/issueTypes';
import Priority from '@/assets/__mockdata__/IssueProps/priority';

const rules: RuleIF[] = [
  {
    id: 1,
    name: 'SLA Rule for bug issues',
    reactionTime: { days: 7 },
    expirationDate: null,
    occurredIn: 'Test',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.bug],
  },
  {
    id: 2,
    name: 'SLA Rule for incident issues',
    reactionTime: { days: 3 },
    expirationDate: new Date('2023-07-17'),
    occurredIn: 'Pre-production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.incident],
  },
  {
    id: 3,
    name: 'SLA Rule for coverage issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.coverage],
  },
  {
    id: 4,
    name: 'SLA Rule for enhancement issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.enhancement],
  },
  {
    id: 5,
    name: 'SLA Rule for task issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.task],
  },
  {
    id: 6,
    name: 'SLA Rule for feature issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.feature],
  },
  {
    id: 7,
    name: 'SLA Rule for support issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.support],
  },
  {
    id: 8,
    name: 'SLA Rule for documentation issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.documentation],
  },
  {
    id: 9,
    name: 'SLA Rule for review issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.review],
  },
  {
    id: 10,
    name: 'SLA Rule for refactor issues',
    reactionTime: { days: 7 },
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: Object.keys(Priority),
    issueType: [IssueTypes.refactor],
  },
];
export default function initSlaRulesStore() {
  const slaRulesStore = useSlaRulesStore();
  const projectStore = useProjectStore();
  slaRulesStore.addCategory({
    id: 1,
    name: 'Category 1',
    project: projectStore.projects[0],
    rules,
  });
  slaRulesStore.addCategory({
    id: 2,
    name: 'Category 2',
    project: projectStore.projects[1],
    rules,
  });
  slaRulesStore.addCategory({
    id: 3,
    name: 'Category 3',
    project: projectStore.projects[2],
    rules,
  });
  slaRulesStore.addCategory({
    id: 4,
    name: 'Category 4',
    project: projectStore.projects[3],
    rules,
  });
  slaRulesStore.addCategory({
    id: 5,
    name: 'Category 5',
    project: projectStore.projects[4],
    rules,
  });
  slaRulesStore.addCategory({
    id: 6,
    name: 'Category 6',
    project: projectStore.projects[5],
    rules,
  });
  slaRulesStore.addCategory({
    id: 7,
    name: 'Category 7',
    project: projectStore.projects[6],
    rules,
  });
  slaRulesStore.addCategory({
    id: 8,
    name: 'Category 8',
    project: projectStore.projects[7],
    rules,
  });
  slaRulesStore.addCategory({
    id: 9,
    name: 'Category 9',
    project: projectStore.projects[8],
    rules,
  });
  slaRulesStore.addCategory({
    id: 10,
    name: 'Category 10',
    project: projectStore.projects[9],
    rules,
  });
  slaRulesStore.addCategory({
    id: 11,
    name: 'Category 11',
    project: projectStore.projects[10],
    rules,
  });
  slaRulesStore.addCategory({
    id: 12,
    name: 'Category 12',
    project: projectStore.projects[11],
    rules,
  });
  slaRulesStore.addCategory({
    id: 13,
    name: 'Category 13',
    project: projectStore.projects[12],
    rules,
  });
  slaRulesStore.addCategory({
    id: 14,
    name: 'Category 14',
    project: projectStore.projects[13],
    rules,
  });
  slaRulesStore.addCategory({
    id: 15,
    name: 'Category 15',
    project: projectStore.projects[14],
    rules,
  });
  slaRulesStore.addCategory({
    id: 16,
    name: 'Category 16',
    project: projectStore.projects[15],
    rules,
  });
  slaRulesStore.addCategory({
    id: 17,
    name: 'Category 17',
    project: projectStore.projects[16],
    rules,
  });
  slaRulesStore.addCategory({
    id: 18,
    name: 'Category 18',
    project: projectStore.projects[17],
    rules,
  });
  slaRulesStore.addCategory({
    id: 19,
    name: 'Category 19',
    project: projectStore.projects[18],
    rules,
  });
  slaRulesStore.addCategory({
    id: 20,
    name: 'Category 20',
    project: projectStore.projects[19],
    rules,
  });
}
