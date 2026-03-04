import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSlider } from './ColorSlider';

const channels = ['hue', 'saturation', 'brightness'] as const;

const meta = {
  component: ColorSlider,
  args: {
    label: 'Hue',
    colorSpace: 'hsb',
    channel: 'hue',
    defaultValue: '#ff0000',
  },
} satisfies Meta<typeof ColorSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HueChannel: Story = {
  args: {
    channel: 'hue',
    label: 'Hue',
  },
};

export const SaturationChannel: Story = {
  args: {
    channel: 'saturation',
    label: 'Saturation',
  },
};

export const BrightnessChannel: Story = {
  args: {
    channel: 'brightness',
    label: 'Brightness',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      {channels.map((channel) => (
        <ColorSlider
          key={channel}
          label={channel[0].toUpperCase() + channel.slice(1)}
          colorSpace="hsb"
          channel={channel}
          defaultValue="#ff0000"
        />
      ))}
    </div>
  ),
};
