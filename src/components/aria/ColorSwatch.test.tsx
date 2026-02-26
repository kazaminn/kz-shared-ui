import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  it('renders with a color', () => {
    render(<ColorSwatch color="#ff0000" colorName="Red" />);
    expect(screen.getByRole('img', { name: 'Red' })).toBeInTheDocument();
  });

  it('applies default size and shape classes', () => {
    render(<ColorSwatch color="#ff0000" aria-label="Color" />);
    const swatch = screen.getByRole('img');
    expect(swatch).toHaveClass('h-8', 'w-8', 'rounded-md');
  });

  it('applies size="sm" classes', () => {
    render(<ColorSwatch color="#ff0000" aria-label="Color" size="sm" />);
    expect(screen.getByRole('img')).toHaveClass('h-6', 'w-6');
  });

  it('applies size="lg" classes', () => {
    render(<ColorSwatch color="#ff0000" aria-label="Color" size="lg" />);
    expect(screen.getByRole('img')).toHaveClass('h-10', 'w-10');
  });

  it('applies shape="circle" classes', () => {
    render(<ColorSwatch color="#ff0000" aria-label="Color" shape="circle" />);
    expect(screen.getByRole('img')).toHaveClass('rounded-full');
  });

  it('merges custom className', () => {
    render(
      <ColorSwatch
        color="#ff0000"
        aria-label="Color"
        className="custom-class"
      />
    );
    expect(screen.getByRole('img')).toHaveClass('custom-class', 'rounded-md');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ColorSwatch color="#ff0000" aria-label="Color" colorName="Red color" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
