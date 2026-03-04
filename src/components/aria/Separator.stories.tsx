import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta = {
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Separator orientation="horizontal" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 80 }}>
      <Separator orientation="vertical" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: 16, alignItems: 'stretch', height: 80 }}
    >
      <div style={{ width: 120, display: 'grid', alignItems: 'center' }}>
        <Separator orientation="horizontal" />
      </div>
      <Separator orientation="vertical" />
      <div style={{ width: 120, display: 'grid', alignItems: 'center' }}>
        <Separator orientation="horizontal" />
      </div>
    </div>
  ),
};
