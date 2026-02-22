import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders as button with accessible name', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');

    // defaultVariants: variant="primary", size="md"
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-10');
  });

  it('applies variant="secondary" classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-secondary',
      'text-secondary-foreground'
    );
  });

  it('applies variant="outline" classes', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-main',
      'bg-transparent'
    );
  });

  it('applies variant="destructive" classes', () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-danger',
      'text-danger-foreground'
    );
  });

  it('applies variant="link" classes', () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'text-link',
      'underline-offset-4'
    );
  });

  it('applies size="sm" classes', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8', 'px-3', 'text-sm');
  });

  it('applies size="lg" classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12', 'px-6', 'text-lg');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Submit</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it('merges custom className without overriding default variant', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-primary');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Submit</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
