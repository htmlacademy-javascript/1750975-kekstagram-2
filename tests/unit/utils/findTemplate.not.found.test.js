// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { findTemplate } from '../../../js/utils/utils.js';

describe('Should findTemplate function return null when no template is found', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('when the template is not found', () => {
    expect(findTemplate('nonexistent')).toBeNull();
  });
});
