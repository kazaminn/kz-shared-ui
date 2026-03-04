import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorArea } from 'react-aria-components';
import { ColorThumb } from './ColorThumb';

function ColorThumbPreview({ isDisabled = false }: { isDisabled?: boolean }) {
  return (
    <div style={{ width: 220 }}>
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        defaultValue="#ff0000"
        isDisabled={isDisabled}
      >
        <ColorThumb />
      </ColorArea>
    </div>
  );
}

const meta = {
  component: ColorThumbPreview,
  args: {
    isDisabled: false,
  },
} satisfies Meta<typeof ColorThumbPreview>;

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
    <div
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(2, minmax(0, 220px))',
      }}
    >
      <div style={{ display: 'grid', gap: 8 }}>
        <strong>Default</strong>
        <ColorThumbPreview />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <strong>Disabled</strong>
        <ColorThumbPreview isDisabled />
      </div>
    </div>
  ),
};
