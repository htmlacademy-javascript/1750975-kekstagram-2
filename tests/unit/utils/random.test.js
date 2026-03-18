import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getRandomInt } from '../../../js/utils/random.js';

describe('Should getRandomInt function return the deterministic value', () => {
  beforeEach(() => {
    // GIVEN: Фиксируем Math.random для воспроизводимых результатов
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('when two arguments are passed', () => {
    expect(getRandomInt(1, 5)).toBe(3);
  });

  it('when generated number does not include an upper bound', () => {
    expect(getRandomInt(0, 1)).toBe(1);
  });

  it('when are the boundary cases', () => {
    expect(getRandomInt(0, 0)).toBe(0);
    expect(getRandomInt(0.5, 10.5)).toBe(6);
  });
});
