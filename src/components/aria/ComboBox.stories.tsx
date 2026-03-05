import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ComboBox,
  ComboBoxItem,
  type ComboBoxProps,
  ComboBoxSection,
} from './ComboBox';

interface Person {
  id: string;
  name: string;
}

const people: Person[] = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'katherine', name: 'Katherine Johnson' },
];

type PeopleComboBoxProps = Omit<ComboBoxProps<Person>, 'children'>;

const PeopleComboBox = (args: PeopleComboBoxProps) => (
  <ComboBox<Person> {...args}>
    {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
  </ComboBox>
);

const meta = {
  component: PeopleComboBox,
  args: {
    label: 'Assignee',
    defaultItems: people,
  },
} satisfies Meta<typeof PeopleComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSections: Story = {
  render: () => (
    <ComboBox<Person> label="Assignee" defaultItems={people}>
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
      <PeopleComboBox label="Default" defaultItems={people} />
      <ComboBox<Person> label="With sections" defaultItems={people}>
        <ComboBoxSection title="Team A" items={people.slice(0, 2)}>
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBoxSection>
        <ComboBoxSection title="Team B" items={people.slice(2)}>
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBoxSection>
      </ComboBox>
      <PeopleComboBox label="Disabled" defaultItems={people} isDisabled />
    </div>
  ),
};
