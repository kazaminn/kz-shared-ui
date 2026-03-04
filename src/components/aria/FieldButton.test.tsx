import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FieldButton } from './FieldButton';

describe('FieldButton', () => {
  it('renders a button with accessible name', () => {
    render(<FieldButton>Open</FieldButton>);

    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('applies default wrapper classes', () => {
    render(<FieldButton>Open</FieldButton>);

    expect(screen.getByRole('button', { name: 'Open' }).className).toContain(
      'rounded-md'
    );
  });

  it('reflects disabled state', () => {
    render(<FieldButton isDisabled>Open</FieldButton>);

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
  });

  it('calls onPress when clicked', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<FieldButton onPress={onPress}>Open</FieldButton>);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(onPress).toHaveBeenCalledOnce();
  });
});
