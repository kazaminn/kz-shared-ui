import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  it('renders a color swatch element', () => {
    render(<ColorSwatch aria-label="Primary color" color="#ff0000" />);

    expect(
      screen.getByRole('img', { name: /Primary color/i })
    ).toBeInTheDocument();
  });
});
