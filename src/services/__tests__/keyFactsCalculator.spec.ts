import { describe, expect, test } from 'vitest';
import { calculateAverageSolvingTime } from '../keyFactsCalculator';

describe('keyFactsTests', () => {
  test('calculateAverageSolvingTime with empty issues', () => {
    expect(calculateAverageSolvingTime([])).toEqual(null);
  });
});
