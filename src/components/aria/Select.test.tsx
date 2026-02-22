import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Select, SelectItem } from './Select';

describe('Select', () => {
  it('renders with label and trigger button', () => {
    render(
      <Select label="Animal">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
    );
    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows placeholder text when no value selected', () => {
    render(
      <Select label="Animal" placeholder="Pick an animal">
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    );
    expect(screen.getByText('Pick an animal')).toBeInTheDocument();
  });

  it('applies trigger base classes', () => {
    render(
      <Select label="Animal">
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'border-2',
      'border-input',
      'bg-input'
    );
  });

  it('is disabled when isDisabled is true', () => {
    render(
      <Select label="Animal" isDisabled>
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('opens listbox when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Animal">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects an item and closes listbox', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <Select label="Animal" onSelectionChange={onSelectionChange}>
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Cat' }));
    expect(onSelectionChange).toHaveBeenCalledWith('cat');
  });

  it('renders description text', () => {
    render(
      <Select label="Animal" description="Choose your favorite animal">
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    );
    expect(screen.getByText('Choose your favorite animal')).toBeInTheDocument();
  });

  it('shows error message when isInvalid', () => {
    render(
      <Select label="Animal" isInvalid errorMessage="Please select an animal">
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    );
    expect(screen.getByText('Please select an animal')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Select label="Animal">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
