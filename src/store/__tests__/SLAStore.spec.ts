import { describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useSLAStore from '@/store/SLAStore';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

// Test SLA Data
const SLASubscriber1: SLASubscriber = {
  id: null,
  name: 'Subscriber 1',
  description: 'Subscriber 1 description',
};
const SLARule1: SLARule = {
  id: null,
  name: 'SLA Rule 1',
  durationInDays: 3,
  expirationDate: null,
  maxAssignedEmployees: 5,
  occurredIn: null,
};
const SLACategory1: SLACategory = {
  id: null,
  name: 'New Category',
  rule: SLARule1,
  subscriber: SLASubscriber1,
};

describe('SLA Store Tests', () => {
  setActivePinia(createPinia());
  const SLAStore = useSLAStore();

  test('has 0 Subscribers in the Beginning', () => {
    expect(SLAStore.subscriber).toHaveLength(0);
  });
  test('has 0 Rules in the Beginning', () => {
    expect(SLAStore.rules).toHaveLength(0);
  });
  test('has 0 Categories in the Beginning', () => {
    expect(SLAStore.slaCategories).toHaveLength(0);
  });
  test('can add a Subscriber', () => {
    SLAStore.addSubscriber(SLASubscriber1);
    expect(SLAStore.subscriber).toHaveLength(1);
    expect(SLAStore.subscriber[0].id).toBe(1);
    expect(SLAStore.subscriber[0].name).toBe('Subscriber 1');
    expect(SLAStore.subscriber[0].description).toBe('Subscriber 1 description');
  });
  test('can add a Rule', () => {
    SLAStore.addRule(SLARule1);
    expect(SLAStore.rules).toHaveLength(1);
    expect(SLAStore.rules[0].id).toBe(1);
    expect(SLAStore.rules[0].name).toBe('SLA Rule 1');
    expect(SLAStore.rules[0].durationInDays).toBe(3);
    expect(SLAStore.rules[0].expirationDate).toBe(null);
    expect(SLAStore.rules[0].maxAssignedEmployees).toBe(5);
    expect(SLAStore.rules[0].occurredIn).toBe(null);
  });
  test('can add a Category', () => {
    SLAStore.addSLACategory(SLACategory1);
    expect(SLAStore.slaCategories).toHaveLength(1);
    expect(SLAStore.slaCategories[0].id).toBe(1);
    expect(SLAStore.slaCategories[0].name).toBe('New Category');
    expect(SLAStore.slaCategories[0].rule).toStrictEqual(SLARule1);
    expect(SLAStore.slaCategories[0].subscriber).toStrictEqual(SLASubscriber1);
  });
  test('can delete a Category', () => {
    SLAStore.deleteSLACategory(SLACategory1);
    expect(SLAStore.slaCategories).toHaveLength(0);
  });
  test('can initialize Categories', () => {
    SLAStore.initializeCategories();
    expect(SLAStore.slaCategories).toHaveLength(5);
  });
});
