import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Disclosure, DisclosureHeader, DisclosurePanel } from './Disclosure';

describe('Disclosure', () => {
  it('toggles expanded state and panel visibility when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Disclosure>
        <DisclosureHeader>Details</DisclosureHeader>
        <DisclosurePanel>Panel content</DisclosurePanel>
      </Disclosure>
    );

    const trigger = screen.getByRole('button', { name: 'Details' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Disclosure defaultExpanded>
        <DisclosureHeader>Details</DisclosureHeader>
        <DisclosurePanel>Panel content</DisclosurePanel>
      </Disclosure>
    );

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
