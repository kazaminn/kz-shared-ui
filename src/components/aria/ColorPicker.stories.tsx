import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorField } from './ColorField';
import { ColorPicker } from './ColorPicker';
import { ColorSlider } from './ColorSlider';

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
    <div style={{ display: 'grid', gap: 16, maxWidth: 440 }}>
      <p style={{ margin: 0, fontSize: 12 }}>
        Click each trigger to compare popover content.
      </p>

      <div style={{ display: 'grid', gap: 8 }}>
        <strong>Default popover</strong>
        <ColorPicker label="Color" defaultValue="#ff0000" />
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <strong>Custom popover</strong>
        <ColorPicker label="Theme color" defaultValue="#00aaff">
          <div style={{ display: 'grid', gap: 8 }}>
            <ColorSlider
              label="Hue"
              colorSpace="hsb"
              channel="hue"
              defaultValue="#00aaff"
            />
            <ColorField label="Accent Hex" />
          </div>
        </ColorPicker>
      </div>
    </div>
  ),
};
