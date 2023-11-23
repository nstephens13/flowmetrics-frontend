import { describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useSlaStore from '../slaStore';
import type { SlaRule } from '../../model/SlaRule';
import type { SlaCategory } from '../../model/SlaCategory';
import type { SlaCustomerProject } from '../../model/SlaCustomerProject';

// Test SLA Data
const slaSubscriber1: SlaCustomerProject = {
  id: 1,
  name: 'Subscriber 1',
  description: 'Subscriber 1 description',
};
const slaRule1: SlaRule = {
  id: null,
  name: 'SLA Rule 1',
  reactionTimeInDays: 3,
  expirationDate: null,
  occurredIn: null,
  priority: null,
  issueType: null,
};
const slaCategory1: SlaCategory = {
  id: null,
  name: 'New Category',
  rule: slaRule1,
  customerProject: slaSubscriber1,
};

describe('SLA Store Tests', () => {
  setActivePinia(createPinia());
  const slaStore = useSlaStore();

  test('has 0 Subscribers in the Beginning', () => {
    expect(slaStore.customer).toHaveLength(0);
  });
  test('has 0 Rules in the Beginning', () => {
    expect(slaStore.rules).toHaveLength(0);
  });
  test('has 0 Categories in the Beginning', () => {
    expect(slaStore.slaCategories).toHaveLength(0);
  });
  test('can add a Subscriber', () => {
    slaStore.addSubscriber(slaSubscriber1);
    expect(slaStore.customer).toHaveLength(1);
    expect(slaStore.customer[0].id).toBe(1);
    expect(slaStore.customer[0].name).toBe('Subscriber 1');
    expect(slaStore.customer[0].description).toBe('Subscriber 1 description');
  });
  test('can add a Rule', () => {
    slaStore.addRule(slaRule1);
    expect(slaStore.rules).toHaveLength(1);
    expect(slaStore.rules[0].id).toBe(1);
    expect(slaStore.rules[0].name).toBe('SLA Rule 1');
    expect(slaStore.rules[0].expirationDate).toBe(null);
    expect(slaStore.rules[0].occurredIn).toBe(null);
    expect(slaStore.rules[0].priority).toBeNull();
    expect(slaStore.rules[0].issueType).toBeNull();
  });
  test('can add a Category', () => {
    slaStore.addSlaCategory(slaCategory1);
    expect(slaStore.slaCategories).toHaveLength(1);
    expect(slaStore.slaCategories[0].id).toBe(1);
    expect(slaStore.slaCategories[0].name).toBe('New Category');
    expect(slaStore.slaCategories[0].rule).toStrictEqual(slaRule1);
    expect(slaStore.slaCategories[0].customerProject).toStrictEqual(slaSubscriber1);
  });
  test('can delete a Category', () => {
    slaStore.deleteSlaCategory(slaCategory1);
    expect(slaStore.slaCategories).toHaveLength(0);
  });
  test('can add a Reaction Time', () => {
    slaStore.addRule(slaRule1);
    expect(slaStore.rules[0].reactionTimeInDays).toBe(3);
    slaStore.addReactionTime(slaRule1, 7);
    expect(slaStore.rules[0].reactionTimeInDays).toBe(7);
  });
});
