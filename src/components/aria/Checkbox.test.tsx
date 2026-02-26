import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders as checkbox with accessible name', () => {
    render(<Checkbox>Subscribe</Checkbox>);
    expect(
      screen.getByRole('checkbox', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });

  it('is not checked by default', () => {
    render(<Checkbox>Option</Checkbox>);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('is checked when defaultSelected is true', () => {
    render(<Checkbox defaultSelected>Option</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('applies bg-input and border-input classes on indicator box when unchecked', () => {
    render(<Checkbox>Option</Checkbox>);
    const box = screen
      .getByRole('checkbox')
      .closest('label')
      ?.querySelector('div');
    expect(box).toHaveClass('bg-input');
    expect(box).toHaveClass('border-input');
  });

  it('applies bg-primary and border-primary classes on indicator box when selected', () => {
    render(<Checkbox defaultSelected>Option</Checkbox>);
    const box = screen
      .getByRole('checkbox')
      .closest('label')
      ?.querySelector('div');
    expect(box).toHaveClass('bg-primary');
    expect(box).toHaveClass('border-primary');
  });

  it('applies bg-primary on indicator box when indeterminate', () => {
    render(<Checkbox isIndeterminate>Option</Checkbox>);
    const box = screen
      .getByRole('checkbox')
      .closest('label')
      ?.querySelector('div');
    expect(box).toHaveClass('bg-primary');
  });

  it('applies border-danger on indicator box when isInvalid is true', () => {
    render(<Checkbox isInvalid>Option</Checkbox>);
    const box = screen
      .getByRole('checkbox')
      .closest('label')
      ?.querySelector('div');
    expect(box).toHaveClass('border-danger');
  });

  it('applies bg-disabled and border-disabled on indicator box when disabled', () => {
    render(<Checkbox isDisabled>Option</Checkbox>);
    const box = screen
      .getByRole('checkbox')
      .closest('label')
      ?.querySelector('div');
    expect(box).toHaveClass('bg-disabled');
    expect(box).toHaveClass('border-disabled');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Checkbox isDisabled>Option</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Option</Checkbox>);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('merges custom className on root label', () => {
    render(<Checkbox className="custom-class">Option</Checkbox>);
    const label = screen.getByRole('checkbox').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox>Subscribe</Checkbox>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
