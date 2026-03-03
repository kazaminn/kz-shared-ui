import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MyToastRegion, queue } from './Toast';

describe('Toast', () => {
  afterEach(() => {
    act(() => {
      queue.clear();
    });
  });

  it('renders a toast from queue.add with the expected role', async () => {
    render(<MyToastRegion />);

    act(() => {
      queue.add({ title: 'Saved successfully' });
    });

    const toast = await screen.findByRole('alert');

    expect(toast).toBeInTheDocument();
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it('closes the toast when close button is clicked', async () => {
    const user = userEvent.setup();

    render(<MyToastRegion />);

    act(() => {
      queue.add({ title: 'Closable toast' });
    });

    const title = await screen.findByText('Closable toast');
    const toast = title.closest('[role="alertdialog"]');

    expect(toast).toBeInTheDocument();

    const closeButton = within(toast as HTMLElement).getByRole('button', {
      name: 'Close',
    });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Closable toast')).not.toBeInTheDocument();
    });
  });
});
