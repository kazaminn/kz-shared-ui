import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { MyToastRegion, queue } from './Toast';

describe('Toast', () => {
  it('renders a toast from queue.add with the expected role', async () => {
    render(<MyToastRegion />);

    queue.add({ title: 'Saved successfully' });

    const toast = await screen.findByRole('alert');

    expect(toast).toBeInTheDocument();
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it('closes the toast when close button is clicked', async () => {
    const user = userEvent.setup();

    render(<MyToastRegion />);

    queue.add({ title: 'Closable toast' });

    const closeButton = await screen.findByRole('button', { name: 'Close' });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Closable toast')).not.toBeInTheDocument();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MyToastRegion />);

    queue.add({ title: 'Accessible toast', description: 'With description' });

    await screen.findByRole('alert');

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
