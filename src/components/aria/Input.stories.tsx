import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Aria/Input',
  component: Input,
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
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
    },
  },
  args: {
    label: 'Label',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isInvalid: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'This is a helpful description.',
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    placeholder: 'Disabled input',
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: 'Read-only value',
  },
};

export const Required: Story = {
  args: {
    isRequired: true,
    label: 'Email',
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <Input label="Default" placeholder="Default input" />
      <Input label="With description" description="Helpful description" />
      <Input label="Invalid" isInvalid errorMessage="This field is required." />
      <Input label="Disabled" isDisabled placeholder="Disabled input" />
      <Input label="Read only" isReadOnly defaultValue="Read-only value" />
    </div>
  ),
};
