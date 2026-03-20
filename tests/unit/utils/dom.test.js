// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderGroup } from '../../../js/utils/dom.js';

describe('Should renderGroup function render a group of elements in a container', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('when renders items correctly', () => {
    const items = [{ id: 1 }, { id: 2 }];
    const makeElement = vi.fn(() => document.createElement('div'));
    const container = document.createElement('div');

    renderGroup(items, makeElement, container);

    expect(container.children.length).toBe(2);
    expect(makeElement).toHaveBeenCalledTimes(2);
  });

  it('when container not found', () => {
    const result = renderGroup([], vi.fn(), null);

    expect(result).toBeNull();
  });

  it('when are the boundary cases', () => {
    const makeElement = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderGroup([], makeElement, container);

    expect(container.children.length).toBe(0);
  });
});
