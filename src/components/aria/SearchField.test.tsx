import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('renders a searchbox and accepts input', async () => {
    const user = userEvent.setup();

    render(<SearchField label="Search" />);

    const input = screen.getByRole('searchbox', { name: 'Search' });
    await user.type(input, 'react');

    expect(input).toHaveValue('react');
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();

    render(<SearchField label="Search" defaultValue="query" />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('');
  });

  it('reflects disabled state', () => {
    render(<SearchField label="Search" isDisabled />);

    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeDisabled();
  });
});
