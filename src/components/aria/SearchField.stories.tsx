import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  component: SearchField,
  args: {
    label: 'Search',
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search users',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: 'Disabled query',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      <SearchField label="Default" />
      <SearchField label="With placeholder" placeholder="Search users" />
      <SearchField label="Disabled" defaultValue="Disabled query" isDisabled />
    </div>
  ),
};
