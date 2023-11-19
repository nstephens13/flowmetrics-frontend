import { describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useSlaStore from '../slaStore';
import type { SlaSubscriber } from '../../model/SlaSubscriber';
import type { SlaRule } from '../../model/SlaRule';
import type { SlaCategory } from '../../model/SlaCategory';

// Test SLA Data
const slaSubscriber1: SlaSubscriber = {
  id: null,
  name: 'Subscriber 1',
  description: 'Subscriber 1 description',
};
const slaRule1: SlaRule = {
  id: null,
  name: 'SLA Rule 1',
  durationInDays: 3,
  expirationDate: null,
  occurredIn: null,
};
const slaCategory1: SlaCategory = {
  id: null,
  name: 'New Category',
  rule: slaRule1,
  subscriber: slaSubscriber1,
};

describe('SLA Store Tests', () => {
  setActivePinia(createPinia());
  const slaStore = useSlaStore();

  test('has 0 Subscribers in the Beginning', () => {
    expect(slaStore.subscriber).toHaveLength(0);
  });
  test('has 0 Rules in the Beginning', () => {
    expect(slaStore.rules).toHaveLength(0);
  });
  test('has 0 Categories in the Beginning', () => {
    expect(slaStore.slaCategories).toHaveLength(0);
  });
  test('can add a Subscriber', () => {
    slaStore.addSubscriber(slaSubscriber1);
    expect(slaStore.subscriber).toHaveLength(1);
    expect(slaStore.subscriber[0].id).toBe(1);
    expect(slaStore.subscriber[0].name).toBe('Subscriber 1');
    expect(slaStore.subscriber[0].description).toBe('Subscriber 1 description');
  });
  test('can add a Rule', () => {
    slaStore.addRule(slaRule1);
    expect(slaStore.rules).toHaveLength(1);
    expect(slaStore.rules[0].id).toBe(1);
    expect(slaStore.rules[0].name).toBe('SLA Rule 1');
    expect(slaStore.rules[0].durationInDays).toBe(3);
    expect(slaStore.rules[0].expirationDate).toBe(null);
    expect(slaStore.rules[0].occurredIn).toBe(null);
  });
  test('can add a Category', () => {
    slaStore.addSlaCategory(slaCategory1);
    expect(slaStore.slaCategories).toHaveLength(1);
    expect(slaStore.slaCategories[0].id).toBe(1);
    expect(slaStore.slaCategories[0].name).toBe('New Category');
    expect(slaStore.slaCategories[0].rule).toStrictEqual(slaRule1);
    expect(slaStore.slaCategories[0].subscriber).toStrictEqual(slaSubscriber1);
  });
  test('can delete a Category', () => {
    slaStore.deleteSlaCategory(slaCategory1);
    expect(slaStore.slaCategories).toHaveLength(0);
  });
});
