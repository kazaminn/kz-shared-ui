import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
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

  it('renders tablist, tabs and tabpanel', () => {
    renderTabs();

    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('switches tab when clicked', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel Two');
  });

  it('switches tab with arrow keys', async () => {
    const user = userEvent.setup();
    renderTabs();

    const firstTab = screen.getByRole('tab', { name: 'One' });
    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
  });

  it('reflects disabled state', () => {
    renderTabs();

    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderTabs();

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
