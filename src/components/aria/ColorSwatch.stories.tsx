import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSwatch } from './ColorSwatch';

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffaa00'];

const meta = {
  component: ColorSwatch,
  args: {
    color: '#ff0000',
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {colors.map((color) => (
        <ColorSwatch key={color} color={color} />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      <ColorSwatch color="#ff0000" />
      <div style={{ display: 'flex', gap: 8 }}>
        {colors.map((color) => (
          <ColorSwatch key={`all-${color}`} color={color} />
        ))}
      </div>
    </div>
  ),
};
