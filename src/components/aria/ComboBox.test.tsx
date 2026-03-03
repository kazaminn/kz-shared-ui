import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ComboBox, ComboBoxItem } from './ComboBox';

describe('ComboBox', () => {
  it('renders a combobox with label and opens listbox', async () => {
    const user = userEvent.setup();

    render(
      <ComboBox label="Assignee">
        <ComboBoxItem id="1">Ada</ComboBoxItem>
        <ComboBoxItem id="2">Grace</ComboBoxItem>
      </ComboBox>
    );

    const trigger = screen.getByRole('button', { name: /show suggestions/i });
    await user.click(trigger);

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(
      await screen.findByRole('option', { name: 'Ada' })
    ).toBeInTheDocument();
  });

  it('selects an option and calls onSelectionChange', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <ComboBox label="Assignee" onSelectionChange={onSelectionChange}>
        <ComboBoxItem id="1">Ada</ComboBoxItem>
        <ComboBoxItem id="2">Grace</ComboBoxItem>
      </ComboBox>
    );

    const combobox = screen.getByRole('combobox', { name: 'Assignee' });
    const trigger = screen.getByRole('button', { name: /show suggestions/i });
    await user.click(trigger);
    await user.click(await screen.findByRole('option', { name: 'Grace' }));

    expect(onSelectionChange).toHaveBeenCalledWith('2');
    expect(combobox).toHaveValue('Grace');
  });

  it('filters options based on text input', async () => {
    const user = userEvent.setup();

    render(
      <ComboBox
        label="Assignee"
        defaultItems={[
          { id: '1', name: 'Ada' },
          { id: '2', name: 'Grace' },
        ]}
      >
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
    );

    const combobox = screen.getByRole('combobox', { name: 'Assignee' });
    await user.click(combobox);
    await user.type(combobox, 'Gr');

    const listbox = screen.getByRole('listbox');
    expect(
      within(listbox).getByRole('option', { name: 'Grace' })
    ).toBeInTheDocument();
    expect(
      within(listbox).queryByRole('option', { name: 'Ada' })
    ).not.toBeInTheDocument();
  });

  it('reflects disabled state', () => {
    render(
      <ComboBox label="Assignee" isDisabled>
        <ComboBoxItem id="1">Ada</ComboBoxItem>
      </ComboBox>
    );

    expect(screen.getByRole('combobox', { name: 'Assignee' })).toBeDisabled();
  });
});
