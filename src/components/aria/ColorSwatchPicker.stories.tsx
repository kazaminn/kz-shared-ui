import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './ColorSwatchPicker';

const colors = [
  { label: 'Red', value: '#ff0000' },
  { label: 'Green', value: '#00ff00' },
  { label: 'Blue', value: '#0000ff' },
  { label: 'Orange', value: '#ffaa00' },
];

const meta = {
  component: ColorSwatchPicker,
} satisfies Meta<typeof ColorSwatchPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ColorSwatchPicker aria-label="Colors" defaultValue="#ff0000">
      {colors.map((color) => (
        <ColorSwatchPickerItem
          key={color.value}
          color={color.value}
          aria-label={color.label}
        />
      ))}
    </ColorSwatchPicker>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <ColorSwatchPicker aria-label="Colors" defaultValue="#0000ff">
      {colors.map((color) => (
        <ColorSwatchPickerItem
          key={color.value}
          color={color.value}
          aria-label={color.label}
        />
      ))}
    </ColorSwatchPicker>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <ColorSwatchPicker aria-label="Default colors" defaultValue="#ff0000">
        {colors.map((color) => (
          <ColorSwatchPickerItem
            key={`default-${color.value}`}
            color={color.value}
            aria-label={color.label}
          />
        ))}
      </ColorSwatchPicker>
      <ColorSwatchPicker aria-label="Selected colors" defaultValue="#0000ff">
        {colors.map((color) => (
          <ColorSwatchPickerItem
            key={`selected-${color.value}`}
            color={color.value}
            aria-label={color.label}
          />
        ))}
      </ColorSwatchPicker>
    </div>
  ),
};
