import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldButton } from './FieldButton';

const meta = {
  component: FieldButton,
  args: {
    children: 'Action',
  },
} satisfies Meta<typeof FieldButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FieldButton>Default</FieldButton>
      <FieldButton isDisabled>Disabled</FieldButton>
    </div>
  ),
};
