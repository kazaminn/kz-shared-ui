import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Aria/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isDisabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" isDisabled>
        Primary
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary
      </Button>
      <Button variant="outline" isDisabled>
        Outline
      </Button>
      <Button variant="destructive" isDisabled>
        Destructive
      </Button>
      <Button variant="link" isDisabled>
        Link
      </Button>
    </div>
  ),
};

export const SizesByVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="sm">
          Primary sm
        </Button>
        <Button variant="primary" size="md">
          Primary md
        </Button>
        <Button variant="primary" size="lg">
          Primary lg
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary" size="sm">
          Secondary sm
        </Button>
        <Button variant="secondary" size="md">
          Secondary md
        </Button>
        <Button variant="secondary" size="lg">
          Secondary lg
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" size="sm">
          Outline sm
        </Button>
        <Button variant="outline" size="md">
          Outline md
        </Button>
        <Button variant="outline" size="lg">
          Outline lg
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="destructive" size="sm">
          Destructive sm
        </Button>
        <Button variant="destructive" size="md">
          Destructive md
        </Button>
        <Button variant="destructive" size="lg">
          Destructive lg
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="link" size="sm">
          Link sm
        </Button>
        <Button variant="link" size="md">
          Link md
        </Button>
        <Button variant="link" size="lg">
          Link lg
        </Button>
      </div>
    </div>
  ),
};
