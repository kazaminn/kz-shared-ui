import { User } from '@react-aria/test-utils';
import { render, screen } from '@testing-library/react';
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

  it('changes selection with click', async () => {
    render(
      <ListBox aria-label="Fruits" selectionMode="single">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    );

    const user = new User();
    const listBoxTester = user.createTester('ListBox', {
      root: screen.getByRole('listbox', { name: 'Fruits' }),
    });

    await listBoxTester.toggleOptionSelection({ option: 'Apple' });

    const apple = screen.getByRole('option', { name: 'Apple' });
    expect(apple).toHaveAttribute('aria-selected', 'true');
  });

  it('changes selection with keyboard', async () => {
    render(
      <ListBox aria-label="Fruits" selectionMode="single">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    );

    const user = new User({ interactionType: 'keyboard' });
    const listBoxTester = user.createTester('ListBox', {
      root: screen.getByRole('listbox', { name: 'Fruits' }),
    });

    await listBoxTester.toggleOptionSelection({ option: 'Orange' });

    const orange = screen.getByRole('option', { name: 'Orange' });
    expect(orange).toHaveAttribute('aria-selected', 'true');
  });
});
