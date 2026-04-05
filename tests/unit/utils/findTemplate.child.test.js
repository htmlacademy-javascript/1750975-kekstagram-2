// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { findTemplate } from '../../../js/utils/utils.js';

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
});
