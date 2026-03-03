import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ColorField } from './ColorField';

describe('ColorField', () => {
  it('renders textbox with label association', () => {
    render(<ColorField label="Hex color" defaultValue="#ff0000" />);

    expect(
      screen.getByRole('textbox', { name: 'Hex color' })
    ).toBeInTheDocument();
  });

  it('allows entering a hex value', async () => {
    const user = userEvent.setup();
    render(<ColorField label="Hex color" defaultValue="#000000" />);

    const input = screen.getByRole('textbox', { name: 'Hex color' });
    await user.clear(input);
    await user.type(input, '#00ff00');

    expect(input).toHaveDisplayValue(/00ff00/i);
  });

  it('reflects disabled state', () => {
    render(<ColorField label="Hex color" isDisabled defaultValue="#ff0000" />);

    expect(screen.getByRole('textbox', { name: 'Hex color' })).toBeDisabled();
  });
});
