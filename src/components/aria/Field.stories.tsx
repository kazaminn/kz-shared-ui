import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField as RACTextField } from 'react-aria-components';
import { Description, FieldError, FieldGroup, Input, Label } from './Field';
import { FieldButton } from './FieldButton';

const meta = {
  title: 'Aria/Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RACTextField>
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
    </RACTextField>
  ),
};

export const WithDescriptionAndError: Story = {
  render: () => (
    <RACTextField isInvalid>
      <Label>Email</Label>
      <Input defaultValue="" />
      <Description>Enter your work email address.</Description>
      <FieldError>Email is required.</FieldError>
    </RACTextField>
  ),
};

export const WithFieldGroup: Story = {
  render: () => (
    <RACTextField>
      <Label>Amount</Label>
      <FieldGroup>
        <Input aria-label="Amount" defaultValue="100" />
        <FieldButton aria-label="Increment">+</FieldButton>
      </FieldGroup>
    </RACTextField>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      <RACTextField>
        <Label>Name</Label>
        <Input placeholder="Enter your name" />
      </RACTextField>

      <RACTextField isInvalid>
        <Label>Email</Label>
        <Input defaultValue="" />
        <Description>Enter your work email address.</Description>
        <FieldError>Email is required.</FieldError>
      </RACTextField>

      <RACTextField>
        <Label>Amount</Label>
        <FieldGroup>
          <Input aria-label="Amount" defaultValue="100" />
          <FieldButton aria-label="Increment">+</FieldButton>
        </FieldGroup>
      </RACTextField>
    </div>
  ),
};
