import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './ColorPicker';

const meta = {
  component: ColorPicker,
  args: {
    label: 'Color',
    defaultValue: '#ff0000',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Theme color',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <ColorPicker label="Color" defaultValue="#ff0000" />
      <ColorPicker label="Theme color" defaultValue="#00aaff" />
    </div>
  ),
};
