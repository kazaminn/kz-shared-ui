import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, DialogTrigger, Modal } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
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

    expect(
      screen.getByRole('dialog', { name: 'Example dialog' })
    ).toBeInTheDocument();
  });
});
