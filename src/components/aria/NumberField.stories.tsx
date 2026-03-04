import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta = {
  component: NumberField,
  args: {
    label: 'Quantity',
    defaultValue: 2,
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithStep: Story = { args: { minValue: 0, maxValue: 10, step: 2 } };
export const Disabled: Story = { args: { isDisabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <NumberField label="Default" defaultValue={2} />
      <NumberField
        label="With min/max/step"
        defaultValue={2}
        minValue={0}
        maxValue={10}
        step={2}
      />
      <NumberField label="Disabled" defaultValue={2} isDisabled />
    </div>
  ),
};
