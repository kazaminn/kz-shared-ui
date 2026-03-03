import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders a separator role', () => {
    render(<Separator />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies vertical orientation classes', () => {
    render(<Separator orientation="vertical" />);

    expect(screen.getByRole('separator').className).toContain('w-px');
  });

  it('uses horizontal orientation by default', () => {
    render(<Separator />);

    expect(screen.getByRole('separator').className).toContain('h-px');
  });
});
