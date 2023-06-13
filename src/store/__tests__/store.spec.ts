import {
  describe, test, expect,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useSLAStore from '../store';
import type { SLASubscriber } from '../../model/SLASubscriber';
import type { SLARule } from '../../model/SLARule';
import type { SLACategory } from '../../model/SLACategory';

describe('SLA Store', () => {
  setActivePinia(createPinia());

  const store = useSLAStore();
  test('has 3 Subscribers in the Beginning', () => {
    expect(store.subscriber.length).toEqual(3);
  });
  test('has 3 Rules in the Beginning', () => {
    expect(store.rules.length).toEqual(3);
  });
  const subscriber: SLASubscriber = { id: null, name: 'New Subscriber', description: 'New Description' };
  test('adds Subscribers', () => {
    store.addSubscriber(subscriber);

    expect(store.subscriber).toContain(subscriber);
  });
  const rule: SLARule = {
    id: null, name: 'New Rule', durationInDays: 3, expirationDate: null, maxAssignedEmployees: 5,
  };
  test('adds Rules', () => {
    store.addRule(rule);

    expect(store.rules).toContain(rule);
  });
  test('adds new Configuration', () => {
    expect(store.slaCategories.length).toEqual(0);
    store.initializeCategories();

    expect(store.slaCategories.length).toBeGreaterThanOrEqual(3);
  });
  test('adds new Configuration', () => {
    const category: SLACategory = {
      id: null, name: 'New Category', rule, subscriber,
    };
    store.addSLACategory(category);

    expect(store.slaCategories).toContain(category);
  });

  test('has 4 Subscribers now', () => {
    expect(store.subscriber.length).toEqual(4);
  });
  test('has 4 Rules now', () => {
    expect(store.rules.length).toEqual(4);
  });
});
