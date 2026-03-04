import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  it('renders a color swatch element', () => {
    render(<ColorSwatch data-testid="swatch" color="#ff0000" />);

    expect(screen.getByTestId('swatch')).toBeInTheDocument();
  });
});
