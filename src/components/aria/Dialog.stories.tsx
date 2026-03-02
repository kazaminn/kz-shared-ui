import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, DialogTrigger, Modal } from 'react-aria-components';
import { Dialog } from './Dialog';

const meta = {
  component: Dialog,
  render: () => (
    <DialogTrigger>
      <Button>Open dialog</Button>
      <Modal isDismissable>
        <Dialog aria-label="Dialog example">Dialog body content</Dialog>
      </Modal>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
