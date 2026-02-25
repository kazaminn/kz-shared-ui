import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Aria/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    isDisabled: { control: 'boolean' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
  },
  args: {
    label: 'Volume',
    isDisabled: false,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider {...args} defaultValue={50} />
    </div>
  ),
};

export const WithInitialValue: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider {...args} label="Brightness" defaultValue={75} />
    </div>
  ),
};

export const CustomRange: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider
        {...args}
        label="Temperature"
        defaultValue={22}
        minValue={15}
        maxValue={30}
        step={0.5}
        formatOptions={{ style: 'unit', unit: 'celsius' }}
      />
    </div>
  ),
};

export const RangeSlider: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider
        {...args}
        label="Price range"
        defaultValue={[20, 80]}
        thumbLabels={['Minimum price', 'Maximum price']}
        formatOptions={{ style: 'currency', currency: 'USD' }}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider {...args} label="Volume" defaultValue={50} isDisabled />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="flex w-64 flex-col gap-4">
        <Slider label="Volume" value={value} onChange={(v) => setValue(v)} />
        <p className="text-sm text-muted">Value: {value}</p>
      </div>
    );
  },
};

export const PercentFormat: Story = {
  render: (args) => (
    <div className="w-64">
      <Slider
        {...args}
        label="Opacity"
        defaultValue={0.75}
        minValue={0}
        maxValue={1}
        step={0.01}
        formatOptions={{ style: 'percent' }}
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-8">
      <Slider label="Default" defaultValue={50} />
      <Slider
        label="Custom range"
        defaultValue={22}
        minValue={0}
        maxValue={100}
      />
      <Slider
        label="Range"
        defaultValue={[25, 75]}
        thumbLabels={['min', 'max']}
      />
      <Slider label="Disabled" defaultValue={50} isDisabled />
    </div>
  ),
};
