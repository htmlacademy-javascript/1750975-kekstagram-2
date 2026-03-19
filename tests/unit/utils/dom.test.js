// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
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
