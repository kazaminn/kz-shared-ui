import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclosure, DisclosureHeader, DisclosurePanel } from './Disclosure';

const meta = {
  component: Disclosure,
  args: {
    children: (
      <>
        <DisclosureHeader>Shipping details</DisclosureHeader>
        <DisclosurePanel>Ships in 1-2 business days.</DisclosurePanel>
      </>
    ),
  },
  render: (args) => <Disclosure {...args} />,
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyExpanded: Story = {
  args: {
    defaultExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Disclosure>
        <DisclosureHeader>Default</DisclosureHeader>
        <DisclosurePanel>Default state disclosure.</DisclosurePanel>
      </Disclosure>
      <Disclosure defaultExpanded>
        <DisclosureHeader>Initially expanded</DisclosureHeader>
        <DisclosurePanel>Starts opened.</DisclosurePanel>
      </Disclosure>
      <Disclosure isDisabled>
        <DisclosureHeader>Disabled</DisclosureHeader>
        <DisclosurePanel>Disabled state disclosure.</DisclosurePanel>
      </Disclosure>
    </div>
  ),
};
