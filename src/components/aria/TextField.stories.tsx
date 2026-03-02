import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  component: TextField,
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'This name is visible to others.' } };
export const WithError: Story = { args: { isInvalid: true, errorMessage: 'Name is required.' } };
export const Disabled: Story = { args: { isDisabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 320 }}>
      <TextField label="Default" placeholder="Type here" />
      <TextField label="With description" placeholder="Type here" description="Helper text" />
      <TextField label="With error" placeholder="Type here" isInvalid errorMessage="Invalid value" />
      <TextField label="Disabled" placeholder="Type here" isDisabled />
    </div>
  ),
};
