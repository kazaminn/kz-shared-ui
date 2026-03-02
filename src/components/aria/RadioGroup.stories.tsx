import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
  args: {
    label: 'Theme',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="light">Light</Radio>
      <Radio value="dark">Dark</Radio>
      <Radio value="system">System</Radio>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <RadioGroup {...args} description="Pick one option.">
      <Radio value="light">Light</Radio>
      <Radio value="dark">Dark</Radio>
      <Radio value="system">System</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} isDisabled>
      <Radio value="light">Light</Radio>
      <Radio value="dark">Dark</Radio>
      <Radio value="system">System</Radio>
    </RadioGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <RadioGroup label="Default">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
      <RadioGroup label="With description" description="Pick one option.">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
      <RadioGroup label="Disabled" isDisabled>
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    </div>
  ),
};
