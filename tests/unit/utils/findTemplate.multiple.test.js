// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { findTemplate } from '../../../js/utils/dom.js';

describe('Should findTemplate function return the first child element of the template', () => {
  beforeEach(() => {
    document.body.replaceChildren();
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
});
