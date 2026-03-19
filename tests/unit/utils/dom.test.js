// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { findTemplate, renderGroup } from '../../../js/utils/dom.js';

describe('Should findTemplate function return the first child element of the template', () => {
  it('when template contains one child element should return this element', () => {
    const template = document.createElement('template');
    template.id = 'single-child';

    const img = document.createElement('img');
    img.alt = 'preview';
    template.content.appendChild(img);
    document.body.appendChild(template);

    expect(findTemplate('single-child')).toBe(img);
  });

  it('when template contains multiple child elements should return first child', () => {
    const template = document.createElement('template');
    template.id = 'multiple-children';

    const firstChild = document.createElement('li');
    firstChild.className = 'first';
    const secondChild = document.createElement('li');
    secondChild.className = 'second';

    template.content.appendChild(firstChild);
    template.content.appendChild(secondChild);
    document.body.appendChild(template);

    expect(findTemplate('multiple-children')).toBe(firstChild);
    document.body.removeChild(template);
  });

  it('when the template is not found', () => {
    expect(findTemplate('nonexistent')).toBeNull();
  });

  it('when the found element is not a template', () => {
    const div = document.createElement('div');
    div.id = 'fake';
    document.body.appendChild(div);

    expect(() => findTemplate('fake')).toThrow('Element is not a template');
    document.body.removeChild(div);
  });

  it('when the found template is empty', () => {
    const template = document.createElement('template');
    template.id = 'empty';
    document.body.appendChild(template);

    expect(() => findTemplate('empty')).toThrow(`Template ${template.id} has no child elements`);
    document.body.removeChild(template);
  });
});

describe('Should renderGroup function render a group of elements in a container', () => {
  it('when renders items correctly', () => {
    const items = [{ id: 1 }, { id: 2 }];
    const makeElement = vi.fn(() => document.createElement('div'));
    const container = document.createElement('div');

    renderGroup(items, makeElement, container);

    expect(container.children.length).toBe(2);
    expect(makeElement).toHaveBeenCalledTimes(2);
  });

  it('when container not found', () => {
    expect(() => renderGroup([], vi.fn(), null)).toThrow('Container not found');
  });

  it('when not a container instance of htmlelement', () => {
    const invalidContainer = document.createTextNode('text');
    expect(() => renderGroup([], vi.fn(), invalidContainer)).toThrow('Invalid container');
  });

  it('when are the boundary cases', () => {
    const makeElement = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);

    renderGroup([], makeElement, container);

    expect(container.children.length).toBe(0);
    document.body.removeChild(container);
  });
});
