import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Button, DialogTrigger, Modal } from 'react-aria-components';
import { Dialog } from './Dialog';

function DialogExample() {
  return (
    <DialogTrigger>
      <Button>Open dialog</Button>
      <Modal isDismissable>
        <Dialog aria-label="Example dialog">Dialog content</Dialog>
      </Modal>
    </DialogTrigger>
  );
}

describe('Dialog', () => {
  it('renders a dialog role when opened', async () => {
    const user = userEvent.setup();

    render(<DialogExample />);

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog', { name: 'Example dialog' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(<DialogExample />);

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
