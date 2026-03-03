import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  it('renders textbox with associated label', () => {
    render(<NumberField label="Quantity" defaultValue={1} />);

    expect(
      screen.getByRole('textbox', { name: 'Quantity' })
    ).toBeInTheDocument();
  });

  it('increments and decrements value with buttons', async () => {
    const user = userEvent.setup();
    render(<NumberField label="Quantity" defaultValue={1} />);

    const increment = screen.getByRole('button', { name: 'Increase Quantity' });
    const decrement = screen.getByRole('button', { name: 'Decrease Quantity' });
    const input = screen.getByRole('textbox', { name: 'Quantity' });

    await user.click(increment);
    expect(input).toHaveValue('2');

    await user.click(decrement);
    expect(input).toHaveValue('1');
  });

  it('reflects disabled state', () => {
    render(<NumberField label="Quantity" isDisabled defaultValue={1} />);

    expect(screen.getByRole('textbox', { name: 'Quantity' })).toBeDisabled();
  });
});
