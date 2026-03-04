import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField as RACTextField } from 'react-aria-components';
import { Description, FieldError, FieldGroup, Input, Label } from './Field';
import { FieldButton } from './FieldButton';

interface FieldPreviewProps {
  label: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  withFieldGroup?: boolean;
  isDisabled?: boolean;
}

function FieldPreview({
  label,
  placeholder,
  description,
  errorMessage,
  isInvalid = false,
  withFieldGroup = false,
  isDisabled = false,
}: FieldPreviewProps) {
  return (
    <RACTextField isInvalid={isInvalid} isDisabled={isDisabled}>
      <Label>{label}</Label>
      {withFieldGroup ? (
        <FieldGroup>
          <Input aria-label={label} defaultValue="100" />
          <FieldButton aria-label="Increment">+</FieldButton>
        </FieldGroup>
      ) : (
        <Input placeholder={placeholder} />
      )}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}

const meta = {
  title: 'Aria/Field',
  component: FieldPreview,
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    description: undefined,
    errorMessage: undefined,
    isInvalid: false,
    withFieldGroup: false,
    isDisabled: false,
  },
} satisfies Meta<typeof FieldPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescriptionAndError: Story = {
  args: {
    label: 'Email',
    description: 'Enter your work email address.',
    errorMessage: 'Email is required.',
    isInvalid: true,
  },
};

export const WithFieldGroup: Story = {
  args: {
    label: 'Amount',
    withFieldGroup: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      <FieldPreview label="Name" placeholder="Enter your name" />
      <FieldPreview
        label="Email"
        isInvalid
        description="Enter your work email address."
        errorMessage="Email is required."
      />
      <FieldPreview label="Amount" withFieldGroup />
    </div>
  ),
};
