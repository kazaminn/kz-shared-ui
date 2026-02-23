import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta = {
  title: 'Aria/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    keyboardActivation: {
      control: 'select',
      options: ['automatic', 'manual'],
    },
    isDisabled: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    keyboardActivation: 'automatic',
    isDisabled: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabList aria-label="Main navigation">
        <Tab id="overview">Overview</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="overview">
        <p className="text-sm text-body">Overview content goes here.</p>
      </TabPanel>
      <TabPanel id="settings">
        <p className="text-sm text-body">Settings content goes here.</p>
      </TabPanel>
      <TabPanel id="activity">
        <p className="text-sm text-body">Activity content goes here.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithDefaultSelectedKey: Story = {
  render: (args) => (
    <Tabs {...args} defaultSelectedKey="settings" className="w-96">
      <TabList aria-label="Tabs">
        <Tab id="overview">Overview</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="overview">Overview content</TabPanel>
      <TabPanel id="settings">Settings content (selected by default)</TabPanel>
      <TabPanel id="activity">Activity content</TabPanel>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabList aria-label="Tabs">
        <Tab id="overview">Overview</Tab>
        <Tab id="settings" isDisabled>
          Settings (disabled)
        </Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="overview">Overview content</TabPanel>
      <TabPanel id="settings">Settings content</TabPanel>
      <TabPanel id="activity">Activity content</TabPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs {...args} orientation="vertical" className="w-96">
      <TabList aria-label="Vertical tabs">
        <Tab id="overview">Overview</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="overview">
        <p className="text-sm text-body">Overview content goes here.</p>
      </TabPanel>
      <TabPanel id="settings">
        <p className="text-sm text-body">Settings content goes here.</p>
      </TabPanel>
      <TabPanel id="activity">
        <p className="text-sm text-body">Activity content goes here.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | number>('overview');
    return (
      <div className="flex w-96 flex-col gap-4">
        <Tabs selectedKey={selected} onSelectionChange={setSelected}>
          <TabList aria-label="Controlled tabs">
            <Tab id="overview">Overview</Tab>
            <Tab id="settings">Settings</Tab>
            <Tab id="activity">Activity</Tab>
          </TabList>
          <TabPanel id="overview">Overview content</TabPanel>
          <TabPanel id="settings">Settings content</TabPanel>
          <TabPanel id="activity">Activity content</TabPanel>
        </Tabs>
        <p className="text-sm text-muted">Active tab: {selected}</p>
      </div>
    );
  },
};

export const ManualActivation: Story = {
  render: (args) => (
    <Tabs {...args} keyboardActivation="manual" className="w-96">
      <TabList aria-label="Manual activation tabs">
        <Tab id="overview">Overview</Tab>
        <Tab id="settings">Settings</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="overview">Overview content</TabPanel>
      <TabPanel id="settings">Settings content</TabPanel>
      <TabPanel id="activity">Activity content</TabPanel>
    </Tabs>
  ),
};
