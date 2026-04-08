// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { findTemplate } from '../../../js/utils/utils.js';

describe('Should findTemplate function return null when the template is empty', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('when the found template is empty', () => {
    const template = document.createElement('template');
    template.id = 'empty';
    document.body.appendChild(template);

    const emptyTemplate = findTemplate('empty');

    expect(emptyTemplate).toBeNull();
  });
});
