import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>送信</Button>);
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
  });

  it('applies variant="primary" classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-primary',
      'text-primary-foreground'
    );
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

  it('applies size="md" classes', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10', 'px-4', 'text-base');
  });

  it('applies size="lg" classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12', 'px-6', 'text-lg');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Submit</Button>);
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
});
