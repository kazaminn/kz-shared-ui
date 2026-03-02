import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button with accessible name', () => {
    render(<Button>Submit</Button>);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(screen.getByRole('button', { name: 'Secondary' }).className).toContain('bg-surface');
  });

  it('uses default variant when variant is not specified', () => {
    render(<Button>Default</Button>);

    expect(screen.getByRole('button', { name: 'Default' }).className).toContain('bg-primary');
  });

  it('reflects disabled state', () => {
    render(<Button isDisabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('calls onPress when clicked', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Submit</Button>);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it('shows spinner when pending', () => {
    render(<Button isPending>Pending</Button>);

    expect(screen.getByRole('button', { name: 'Pending' }).querySelector('svg')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Submit</Button>);

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
