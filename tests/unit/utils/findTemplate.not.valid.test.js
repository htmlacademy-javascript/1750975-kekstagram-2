// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { findTemplate } from '../../../js/utils/dom.js';

describe('Should findTemplate function return null when the element is not valid', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('when the found element is not a template', () => {
    const div = document.createElement('div');
    div.id = 'fake';
    document.body.appendChild(div);

    const notTemplateTag = findTemplate('fake');

    expect(notTemplateTag).toBeNull();
  });
});
