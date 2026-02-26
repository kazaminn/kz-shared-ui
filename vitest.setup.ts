import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

window.getComputedStyle = () =>
  ({
    getPropertyValue: () => '',
    getPropertyPriority: () => '',
  }) as unknown as CSSStyleDeclaration;

afterEach(() => {
  cleanup();
});
