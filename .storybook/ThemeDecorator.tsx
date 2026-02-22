import React from 'react';
import type { Decorator } from '@storybook/react-vite';

export const ThemeDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';
  return (
    <div
      style={{
        background: theme === 'dark' ? 'oklch(13% 0.028 261.692)' : '#ffffff',
        padding: '1rem',
      }}
    >
      <Story />
    </div>
  );
};
