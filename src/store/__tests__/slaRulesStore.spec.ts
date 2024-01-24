import { describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useSlaRulesStore from '../slaRulesStore';
import type { RuleIF } from '../../model/Sla/RuleIF';
import type { CategoryIF } from '../../model/Sla/CategoryIF';
import type { ProjectIF } from '../../model/ProjectIF';

const Rule1: RuleIF = {
  id: 1,
  name: 'SLA Rule 1',
  reactionTime: { weeks: 3, days: 2, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 },
  expirationDate: new Date(),
  occurredIn: 'Test',
  priority: ['behindernd'],
  issueType: 'bug',
};

const Rule2: RuleIF = {
  id: 2,
  name: 'SLA Rule 2',
  reactionTime: { weeks: 3, days: 2, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 },
  expirationDate: new Date(),
  occurredIn: 'Test',
  priority: ['behindernd'],
  issueType: 'test',
};

const Project1: ProjectIF = {
  id: 1,
  name: 'New Project',
  description: 'New Project Description',
  issues: [],
};
const Project2: ProjectIF = {
  id: 2,
  name: 'New Project',
  description: 'New Project Description',
  issues: [],
};

const Category1: CategoryIF = {
  id: 1,
  name: 'New Category',
  project: Project1,
  rules: [],
};
const Category2: CategoryIF = {
  id: 2,
  name: 'New Category',
  project: Project2,
  rules: [],
};

describe('SLA Rules Store Tests', () => {
  setActivePinia(createPinia());
  const slaRulesStore = useSlaRulesStore();
  test('has 0 Categories in the Beginning', () => {
    expect(slaRulesStore.categories).toHaveLength(0);
  });
  test('can add a new category', () => {
    slaRulesStore.addCategory(Category1);
    expect(slaRulesStore.categories).toHaveLength(1);
    slaRulesStore.addCategory(Category2);
    expect(slaRulesStore.categories).toHaveLength(2);
  });
  test('can add a Rule', () => {
    slaRulesStore.addRule(Category1, Rule1);
    expect(slaRulesStore.categories[0].rules).toHaveLength(1);
    slaRulesStore.addRule(Category1, Rule2);
    expect(slaRulesStore.categories[0].rules).toHaveLength(2);
  });
  test('can delete a Rule', () => {
    expect(slaRulesStore.categories[0].rules).toHaveLength(2);
    slaRulesStore.deleteRule(Category1, Rule1);
    expect(slaRulesStore.categories[0].rules).toHaveLength(1);
    slaRulesStore.deleteRule(Category1, Rule2);
    expect(slaRulesStore.categories[0].rules).toHaveLength(0);
  });
  test('can delete a Category', () => {
    expect(slaRulesStore.categories).toHaveLength(2);
    slaRulesStore.deleteCategory(Category1);
    expect(slaRulesStore.categories).toHaveLength(1);
    slaRulesStore.deleteCategory(Category2);
    expect(slaRulesStore.categories).toHaveLength(0);
  });
});
