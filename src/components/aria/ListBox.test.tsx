import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { ListBox, ListBoxItem } from './ListBox';

describe('ListBox', () => {
  it('renders listbox and options', () => {
    render(
      <ListBox aria-label="Fruits">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    );

    expect(screen.getByRole('listbox', { name: 'Fruits' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  it('changes selection with click and keyboard', async () => {
    const user = userEvent.setup();

    render(
      <ListBox aria-label="Fruits" selectionMode="single">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    );

    const apple = screen.getByRole('option', { name: 'Apple' });
    const orange = screen.getByRole('option', { name: 'Orange' });

    await user.click(apple);
    expect(apple).toHaveAttribute('aria-selected', 'true');

    apple.focus();
    await user.keyboard('{ArrowDown}');

    expect(orange).toHaveAttribute('aria-selected', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ListBox aria-label="Fruits" selectionMode="single">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    );

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
