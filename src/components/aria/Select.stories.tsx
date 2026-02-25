import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectItem } from './Select';

const meta = {
  title: 'Aria/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
  args: {
    label: 'Animal',
    isDisabled: false,
    isInvalid: false,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} className="w-64">
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="bird">Bird</SelectItem>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: (args) => (
    <Select {...args} placeholder="Pick an animal" className="w-64">
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="bird">Bird</SelectItem>
    </Select>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Select
      {...args}
      description="Choose your favorite animal"
      className="w-64"
    >
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="bird">Bird</SelectItem>
    </Select>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Select
      {...args}
      isInvalid
      errorMessage="Please select an animal"
      className="w-64"
    >
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} isDisabled className="w-64">
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
    </Select>
  ),
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Select {...args} disabledKeys={['bird']} className="w-64">
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="bird">Bird (disabled)</SelectItem>
    </Select>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <Select
          label="Animal"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          className="w-64"
        >
          <SelectItem id="cat">Cat</SelectItem>
          <SelectItem id="dog">Dog</SelectItem>
          <SelectItem id="bird">Bird</SelectItem>
        </Select>
        <p className="text-sm text-muted">Selected: {selected ?? 'none'}</p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Select label="Default" className="w-64">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
      <Select label="With description" description="Pick one" className="w-64">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
      </Select>
      <Select
        label="Invalid"
        isInvalid
        errorMessage="Required"
        className="w-64"
      >
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
      <Select label="Disabled" isDisabled className="w-64">
        <SelectItem id="cat">Cat</SelectItem>
      </Select>
    </div>
  ),
};
