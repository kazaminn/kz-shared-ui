import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorArea } from './ColorArea';

const colorSpaces = ['hsb', 'hsl'] as const;

const meta = {
  component: ColorArea,
  args: {
    'aria-label': 'Saturation and brightness',
    colorSpace: 'hsb',
    xChannel: 'saturation',
    yChannel: 'brightness',
    defaultValue: '#ff0000',
  },
} satisfies Meta<typeof ColorArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDifferentColorSpaces: Story = {
  args: {
    colorSpace: 'hsl',
    xChannel: 'saturation',
    yChannel: 'lightness',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(2, minmax(0, 220px))',
      }}
    >
      {colorSpaces.map((space) => (
        <div key={space} style={{ display: 'grid', gap: 8 }}>
          <strong>{space.toUpperCase()}</strong>
          <ColorArea
            aria-label={`${space} area`}
            colorSpace={space}
            xChannel="saturation"
            yChannel={space === 'hsb' ? 'brightness' : 'lightness'}
            defaultValue="#ff0000"
          />
        </div>
      ))}
    </div>
  ),
};
