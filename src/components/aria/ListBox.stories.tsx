import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownSection, ListBox, ListBoxItem } from './ListBox';

const items = [
  { id: 'apple', name: 'Apple' },
  { id: 'orange', name: 'Orange' },
  { id: 'grape', name: 'Grape' },
];

const meta = {
  component: ListBox,
  render: () => (
    <ListBox aria-label="Fruits" selectionMode="single">
      {items.map((item) => (
        <ListBoxItem key={item.id} id={item.id}>
          {item.name}
        </ListBoxItem>
      ))}
    </ListBox>
  ),
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  render: () => (
    <ListBox
      aria-label="Fruits"
      selectionMode="single"
      defaultSelectedKeys={['orange']}
    >
      {items.map((item) => (
        <ListBoxItem key={item.id} id={item.id}>
          {item.name}
        </ListBoxItem>
      ))}
    </ListBox>
  ),
};

export const WithSections: Story = {
  render: () => (
    <ListBox aria-label="Fruits" selectionMode="single">
      <DropdownSection title="Citrus" items={[items[1]]}>
        {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
      </DropdownSection>
      <DropdownSection title="Others" items={[items[0], items[2]]}>
        {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
      </DropdownSection>
    </ListBox>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <ListBox aria-label="Default" selectionMode="single">
        {items.map((item) => (
          <ListBoxItem key={item.id} id={item.id}>
            {item.name}
          </ListBoxItem>
        ))}
      </ListBox>
      <ListBox
        aria-label="With selection"
        selectionMode="single"
        defaultSelectedKeys={['orange']}
      >
        {items.map((item) => (
          <ListBoxItem key={item.id} id={item.id}>
            {item.name}
          </ListBoxItem>
        ))}
      </ListBox>
      <ListBox aria-label="With sections" selectionMode="single">
        <DropdownSection title="Citrus" items={[items[1]]}>
          {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
        </DropdownSection>
        <DropdownSection title="Others" items={[items[0], items[2]]}>
          {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
        </DropdownSection>
      </ListBox>
    </div>
  ),
};
