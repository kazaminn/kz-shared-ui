import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders switch with accessible name', () => {
    render(<Switch>Airplane mode</Switch>);

    expect(
      screen.getByRole('switch', { name: 'Airplane mode' })
    ).toBeInTheDocument();
  });

  it('toggles aria-checked when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch>Wi-Fi</Switch>);

    const element = screen.getByRole('switch', { name: 'Wi-Fi' });
    expect(element.closest('label')).not.toHaveAttribute('data-selected');

    await user.click(element);

    expect(element.closest('label')).toHaveAttribute('data-selected', 'true');
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Bluetooth</Switch>);

    await user.click(screen.getByRole('switch', { name: 'Bluetooth' }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('reflects disabled state', () => {
    render(<Switch isDisabled>NFC</Switch>);

    expect(screen.getByRole('switch', { name: 'NFC' })).toBeDisabled();
  });
});
