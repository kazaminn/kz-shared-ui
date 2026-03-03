import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, DialogTrigger } from 'react-aria-components';
import { Popover } from './Popover';

const meta = {
  component: Popover,
  render: (args) => (
    <DialogTrigger>
      <Button>Open popover</Button>
      <Popover {...args}>
        <div style={{ padding: 12 }}>Popover content</div>
      </Popover>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArrow: Story = {
  args: {
    showArrow: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <DialogTrigger>
        <Button>Default popover</Button>
        <Popover>
          <div style={{ padding: 12 }}>Default popover content</div>
        </Popover>
      </DialogTrigger>
      <DialogTrigger>
        <Button>Arrow popover</Button>
        <Popover showArrow>
          <div style={{ padding: 12 }}>Arrow popover content</div>
        </Popover>
      </DialogTrigger>
    </div>
  ),
};
