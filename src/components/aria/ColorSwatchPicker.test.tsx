import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './ColorSwatchPicker';

describe('ColorSwatchPicker', () => {
  it('renders swatch picker options', () => {
    render(
      <ColorSwatchPicker aria-label="Color choices">
        <ColorSwatchPickerItem color="#ff0000" aria-label="Red" />
        <ColorSwatchPickerItem color="#0000ff" aria-label="Blue" />
      </ColorSwatchPicker>
    );

    expect(screen.getByRole('option', { name: 'Red' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Blue' })).toBeInTheDocument();
  });

  it('changes selected option when clicked', async () => {
    const user = userEvent.setup();
    render(
      <ColorSwatchPicker aria-label="Color choices" defaultValue="#ff0000">
        <ColorSwatchPickerItem color="#ff0000" aria-label="Red" />
        <ColorSwatchPickerItem color="#0000ff" aria-label="Blue" />
      </ColorSwatchPicker>
    );

    const red = screen.getByRole('option', { name: 'Red' });
    const blue = screen.getByRole('option', { name: 'Blue' });

    expect(red).toHaveAttribute('aria-selected', 'true');
    await user.click(blue);

    expect(blue).toHaveAttribute('aria-selected', 'true');
  });
});
