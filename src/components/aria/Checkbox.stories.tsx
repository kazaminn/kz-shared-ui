import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Aria/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Accept terms and conditions',
    isDisabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultSelected: true,
    children: 'Already accepted',
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    children: 'Select all (partial)',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled option',
  },
};

export const DisabledSelected: Story = {
  args: {
    isDisabled: true,
    defaultSelected: true,
    children: 'Disabled (selected)',
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    children: 'You must accept the terms',
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultSelected: true,
    children: 'Read-only (selected)',
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox isSelected={selected} onChange={setSelected}>
          {selected ? 'Subscribed' : 'Unsubscribed'}
        </Checkbox>
        <p className="text-sm text-muted">
          State: {selected ? 'checked' : 'unchecked'}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox>Default (unchecked)</Checkbox>
      <Checkbox defaultSelected>Default (checked)</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled (unchecked)</Checkbox>
      <Checkbox isDisabled defaultSelected>
        Disabled (checked)
      </Checkbox>
      <Checkbox isInvalid>Invalid</Checkbox>
      <Checkbox isReadOnly defaultSelected>
        Read-only (checked)
      </Checkbox>
    </div>
  ),
};
