import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSwatch } from './ColorSwatch';

const meta = {
  title: 'Aria/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
    },
  },
  args: {
    color: '#3b82f6',
    size: 'md',
    shape: 'square',
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#3b82f6',
    'aria-label': 'Blue',
  },
};

export const Red: Story = {
  args: {
    color: '#ef4444',
    'aria-label': 'Red',
  },
};

export const WithAlpha: Story = {
  args: {
    color: 'rgba(59, 130, 246, 0.5)',
    'aria-label': 'Semi-transparent blue',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" size="sm" aria-label="Small" />
      <ColorSwatch color="#3b82f6" size="md" aria-label="Medium" />
      <ColorSwatch color="#3b82f6" size="lg" aria-label="Large" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#3b82f6" shape="square" aria-label="Square" />
      <ColorSwatch color="#3b82f6" shape="circle" aria-label="Circle" />
    </div>
  ),
};

export const ColorFormats: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ColorSwatch color="#ef4444" aria-label="Hex red" />
      <ColorSwatch color="rgb(59, 130, 246)" aria-label="RGB blue" />
      <ColorSwatch color="hsl(142, 71%, 45%)" aria-label="HSL green" />
      <ColorSwatch color="rgba(168, 85, 247, 0.6)" aria-label="RGBA purple" />
    </div>
  ),
};

export const Palette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
        '#6b7280',
      ].map((color) => (
        <ColorSwatch key={color} color={color} aria-label={color} />
      ))}
    </div>
  ),
};
