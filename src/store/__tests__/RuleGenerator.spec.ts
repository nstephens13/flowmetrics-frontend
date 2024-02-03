import { describe, expect, test } from 'vitest';
import generateRules from '@/store/mockdata/RulesGenerator';

describe('RulesGenerator', () => {
  test('should generate a list of rules', () => {
    const rules = generateRules();
    expect(rules.length).toBeGreaterThan(0);
    expect(rules.length).toBeLessThan(13);
    expect(rules[0].id).toBe(1);
    expect(rules[0].name).toBe('Sla rule 1');
    expect(rules[0].reactionTime).toBeDefined();
    expect(rules[0].expirationDate).toBeDefined();
    expect(rules[0].occurredIn).toBeDefined();
    expect(rules[0].priority).toBeDefined();
    expect(rules[0].issueType).toBeDefined();
  });
});
