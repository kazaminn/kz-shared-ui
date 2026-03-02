import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboBox, ComboBoxItem, ComboBoxSection } from './ComboBox';

const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'katherine', name: 'Katherine Johnson' },
];

const meta = {
  component: ComboBox,
  args: {
    label: 'Assignee',
    defaultItems: people,
  },
  render: (args) => (
    <ComboBox {...args}>{(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}</ComboBox>
  ),
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSections: Story = {
  render: () => (
    <ComboBox label="Assignee" defaultItems={people}>
      <ComboBoxSection title="Team A" items={people.slice(0, 2)}>
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBoxSection>
      <ComboBoxSection title="Team B" items={people.slice(2)}>
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBoxSection>
    </ComboBox>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      <ComboBox label="Default" defaultItems={people}>
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
      <ComboBox label="With sections" defaultItems={people}>
        <ComboBoxSection title="Team A" items={people.slice(0, 2)}>
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBoxSection>
        <ComboBoxSection title="Team B" items={people.slice(2)}>
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBoxSection>
      </ComboBox>
      <ComboBox label="Disabled" defaultItems={people} isDisabled>
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
    </div>
  ),
};
