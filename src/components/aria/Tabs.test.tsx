import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function BasicTabs() {
  return (
    <Tabs>
      <TabList aria-label="Main tabs">
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel id="tab1">Content 1</TabPanel>
      <TabPanel id="tab2">Content 2</TabPanel>
      <TabPanel id="tab3">Content 3</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders tabs with accessible roles', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('renders tab panels', () => {
    render(<BasicTabs />);
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  });

  it('selects first tab by default', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches content when a tab is clicked', async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('applies selected styles on active tab', () => {
    render(<BasicTabs />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveClass(
      'selected:border-primary'
    );
  });

  it('supports defaultSelectedKey', () => {
    render(
      <Tabs defaultSelectedKey="tab2">
        <TabList aria-label="Tabs">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
        <TabPanel id="tab2">Content 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('calls onSelectionChange when tab is clicked', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <Tabs onSelectionChange={onSelectionChange}>
        <TabList aria-label="Tabs">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
        <TabPanel id="tab2">Content 2</TabPanel>
      </Tabs>
    );
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(onSelectionChange).toHaveBeenCalledWith('tab2');
  });

  it('disables individual tab', () => {
    render(
      <Tabs>
        <TabList aria-label="Tabs">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2" isDisabled>
            Tab 2
          </Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
        <TabPanel id="tab2">Content 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('merges custom className on Tabs root', () => {
    render(
      <Tabs className="custom-class">
        <TabList aria-label="Tabs">
          <Tab id="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel id="tab1">Content 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tablist').parentElement).toHaveClass(
      'custom-class'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<BasicTabs />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
