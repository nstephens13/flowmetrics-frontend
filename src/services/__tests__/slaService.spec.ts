import {
  assert, expect, test, describe, vitest,
} from 'vitest';
import fetchSLARules from '../slaService';
import type { SLACategory } from '@/model/SLACategory';
import type { SLARule } from '../../model/SLARule';

describe('When mock data helper is asked for mock data, there should be correctly constructed mock data object returned ', () => {
  test('loadedSLARules should be an array with valid SLARule Objects', () => {
    // given+when
    const rules = fetchSLARules();

    // then
    assert(Array.isArray(rules));
    assert(rules.length > 0);
    assert(rules.every((rule) => typeof rule === 'object'));
    assert(rules.every((rule) => Object.prototype.hasOwnProperty.call(rule, 'category')));
    assert(rules.every((rule) => Object.prototype.hasOwnProperty.call(rule, 'deadline')));
  });

  test('SLARule should connect a Deadline to the correct category', () => {
    const rules = fetchSLARules();

    rules.forEach((rule) => {
      assert(rule.deadline.categoryId === rule.category.id);
    });
  });
});
