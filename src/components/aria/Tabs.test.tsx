import { User } from '@react-aria/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from './Tabs';

describe('Tabs', () => {
  const renderTabs = () =>
    render(
      <Tabs>
        <TabList aria-label="Sections">
          <Tab id="one">One</Tab>
          <Tab id="two">Two</Tab>
          <Tab id="three" isDisabled>
            Three
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="one">Panel One</TabPanel>
          <TabPanel id="two">Panel Two</TabPanel>
          <TabPanel id="three">Panel Three</TabPanel>
        </TabPanels>
      </Tabs>
    );

  it('renders tablist, tabs and tabpanel', async () => {
    renderTabs();

    await waitFor(() => {
      expect(
        screen.getByRole('tablist', { name: 'Sections' })
      ).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });
  });

  it('switches tab when clicked', async () => {
    renderTabs();
    const user = new User();
    const tabsTester = user.createTester('Tabs', {
      root: screen.getByRole('tablist', { name: 'Sections' }),
    });

    await tabsTester.triggerTab({ tab: 'Two' });

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel Two');
    });
  });

  it('switches tab with arrow keys', async () => {
    renderTabs();
    const user = new User({ interactionType: 'keyboard' });
    const tabsTester = user.createTester('Tabs', {
      root: screen.getByRole('tablist', { name: 'Sections' }),
    });

    await tabsTester.triggerTab({ tab: 'Two' });

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  it('reflects disabled state', async () => {
    renderTabs();

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
  });
});
