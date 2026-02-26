import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders as switch with accessible name', () => {
    render(<Switch>Enable notifications</Switch>);
    expect(
      screen.getByRole('switch', { name: 'Enable notifications' })
    ).toBeInTheDocument();
  });

  it('is not checked by default', () => {
    render(<Switch>Toggle</Switch>);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('is checked when defaultSelected is true', () => {
    render(<Switch defaultSelected>Toggle</Switch>);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('applies bg-disabled on track when not selected', () => {
    render(<Switch>Toggle</Switch>);
    const label = screen.getByRole('switch').closest('label');
    const track = label?.querySelector('div');
    expect(track).toHaveClass('bg-disabled');
  });

  it('applies bg-primary on track when selected', () => {
    render(<Switch defaultSelected>Toggle</Switch>);
    const label = screen.getByRole('switch').closest('label');
    const track = label?.querySelector('div');
    expect(track).toHaveClass('bg-primary');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Switch isDisabled>Toggle</Switch>);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Toggle</Switch>);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('merges custom className on root', () => {
    render(<Switch className="custom-class">Toggle</Switch>);
    const label = screen.getByRole('switch').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch>Enable feature</Switch>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
