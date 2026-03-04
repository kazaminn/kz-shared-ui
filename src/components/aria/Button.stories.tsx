import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const variants = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'quiet',
] as const;

const meta = {
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Quiet: Story = { args: { variant: 'quiet' } };
export const Disabled: Story = { args: { isDisabled: true } };
export const Pending: Story = { args: { isPending: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Button key={`${variant}-disabled`} variant={variant} isDisabled>
            {variant} disabled
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Button key={`${variant}-pending`} variant={variant} isPending>
            {variant} pending
          </Button>
        ))}
      </div>
    </div>
  ),
};
