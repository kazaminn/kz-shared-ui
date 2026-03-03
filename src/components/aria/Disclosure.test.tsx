import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const panel = screen.getByText('Panel content');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panel).not.toBeVisible();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toBeVisible();
  });
});
