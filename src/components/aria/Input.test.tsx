import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label and accessible name', () => {
    render(<Input label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input label="Email" placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(
      <Input label="Email" description="We will never share your email" />
    );
    expect(
      screen.getByText('We will never share your email')
    ).toBeInTheDocument();
  });

  it('shows error message when isInvalid', () => {
    render(
      <Input label="Email" isInvalid errorMessage="Invalid email address" />
    );
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('is disabled when isDisabled is true', () => {
    render(<Input label="Name" isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('is read-only when isReadOnly is true', () => {
    render(<Input label="Name" isReadOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('applies base input classes', () => {
    render(<Input label="Name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('w-full', 'rounded-md');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Name" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
