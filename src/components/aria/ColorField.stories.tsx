import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorField } from './ColorField';

const meta = {
  component: ColorField,
  args: {
    defaultValue: '#ff0000',
  },
} satisfies Meta<typeof ColorField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Hex',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Hex',
    isDisabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 280 }}>
      <ColorField label="Default" defaultValue="#ff0000" />
      <ColorField label="Disabled" defaultValue="#00ff00" isDisabled />
    </div>
  ),
};
