import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  component: Slider,
  args: {
    defaultValue: 40,
    minValue: 0,
    maxValue: 100,
  },
} satisfies Meta<typeof Slider<number>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Volume' } };
export const Disabled: Story = { args: { label: 'Volume', isDisabled: true } };
export const Range: Story = {
  render: () => <Slider label="Range" defaultValue={[20, 80]} minValue={0} maxValue={100} thumbLabels={['Minimum', 'Maximum']} />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <Slider label="Default" defaultValue={40} />
      <Slider label="Disabled" defaultValue={40} isDisabled />
      <Slider label="Range" defaultValue={[20, 80]} thumbLabels={['Minimum', 'Maximum']} />
    </div>
  ),
};
