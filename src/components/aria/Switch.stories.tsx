import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Aria/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Enable notifications',
    isDisabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultSelected: true,
    children: 'Notifications enabled',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled switch',
  },
};

export const DisabledSelected: Story = {
  args: {
    isDisabled: true,
    defaultSelected: true,
    children: 'Disabled (selected)',
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultSelected: true,
    children: 'Read-only switch',
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Switch isSelected={selected} onChange={setSelected}>
          {selected ? 'On' : 'Off'}
        </Switch>
        <p className="text-sm text-muted">
          State: {selected ? 'enabled' : 'disabled'}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch>Default (off)</Switch>
      <Switch defaultSelected>Default (on)</Switch>
      <Switch isDisabled>Disabled (off)</Switch>
      <Switch isDisabled defaultSelected>
        Disabled (on)
      </Switch>
      <Switch isReadOnly defaultSelected>
        Read-only (on)
      </Switch>
    </div>
  ),
};
