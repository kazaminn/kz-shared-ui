import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders a button with accessible name', () => {
    render(<ColorPicker label="Color" defaultValue="#ff0000" />);

    expect(screen.getByRole('button', { name: /Color$/i })).toBeInTheDocument();
  });

  it('opens popover content when trigger button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorPicker label="Color" defaultValue="#ff0000" />);

    expect(
      screen.queryByRole('textbox', { name: 'Hex' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Color$/i }));

    expect(screen.getByRole('textbox', { name: 'Hex' })).toBeInTheDocument();
  });
});
