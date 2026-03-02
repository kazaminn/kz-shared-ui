import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  component: Switch,
  args: {
    children: 'Notifications',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultSelected: true } };
export const Disabled: Story = { args: { isDisabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Switch>Default</Switch>
      <Switch defaultSelected>Checked</Switch>
      <Switch isDisabled>Disabled</Switch>
    </div>
  ),
};
