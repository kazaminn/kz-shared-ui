import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from './Tabs';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsExample = ({
  disabledThird = false,
}: {
  disabledThird?: boolean;
}) => (
  <Tabs>
    <TabList aria-label="Sections">
      <Tab id="overview">Overview</Tab>
      <Tab id="details">Details</Tab>
      <Tab id="settings" isDisabled={disabledThird}>
        Settings
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel id="overview">Overview panel</TabPanel>
      <TabPanel id="details">Details panel</TabPanel>
      <TabPanel id="settings">Settings panel</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Default: Story = { render: () => <TabsExample /> };
export const WithPanels: Story = { render: () => <TabsExample /> };
export const DisabledTab: Story = {
  render: () => <TabsExample disabledThird />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <TabsExample />
      <TabsExample disabledThird />
    </div>
  ),
};
