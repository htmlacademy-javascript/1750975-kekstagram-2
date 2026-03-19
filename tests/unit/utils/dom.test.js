// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { findTemplate, renderGroup } from '../../../js/utils/dom.js';

describe('Should findTemplate function return the first child element of the template', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('when template contains one child element should return this element', () => {
    // GIVEN (получение)
    const template = document.createElement('template');
    const img = document.createElement('img');

    // модификация
    template.id = 'single-child';
    img.alt = 'preview';

    // добавление
    template.content.appendChild(img);
    document.body.appendChild(template);

    // WHEN
    const singleTemplate = findTemplate('single-child');

    // THEN
    expect(singleTemplate).toBe(img);
  });

  it('when template contains multiple child elements should return first child', () => {
    // GIVEN получение
    const template = document.createElement('template');
    const firstChild = document.createElement('li');
    const secondChild = document.createElement('li');

    // модификация
    template.id = 'multiple-children';
    firstChild.className = 'first';
    secondChild.className = 'second';

    // добавление
    template.content.appendChild(firstChild);
    template.content.appendChild(secondChild);
    document.body.appendChild(template);

    // WHEN
    const multipleTemplate = findTemplate('multiple-children');

    // THEN
    expect(multipleTemplate).toBe(firstChild);
  });

  it('when the template is not found', () => {
    expect(findTemplate('nonexistent')).toBeNull();
  });

  it('when the found element is not a template', () => {
    const div = document.createElement('div');
    div.id = 'fake';
    document.body.appendChild(div);

    expect(() => findTemplate('fake')).toThrow('Element is not a template');
  });

  it('when the found template is empty', () => {
    const template = document.createElement('template');
    template.id = 'empty';
    document.body.appendChild(template);

    expect(() => findTemplate('empty')).toThrow(`Template ${template.id} has no child elements`);
  });
});

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
  });
});
