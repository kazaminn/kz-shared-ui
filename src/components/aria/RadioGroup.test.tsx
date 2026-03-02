import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Radio, RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radiogroup and radio options', () => {
    render(
      <RadioGroup label="Theme">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );

    expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeInTheDocument();
  });

  it('changes selection when clicked', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Theme">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );

    const dark = screen.getByRole('radio', { name: 'Dark' });
    await user.click(dark);

    expect(dark).toBeChecked();
  });

  it('changes selection with keyboard', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Theme" defaultValue="light">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );

    const light = screen.getByRole('radio', { name: 'Light' });
    light.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
  });

  it('reflects disabled state', () => {
    render(
      <RadioGroup label="Theme" isDisabled>
        <Radio value="light">Light</Radio>
      </RadioGroup>
    );

    expect(screen.getByRole('radio', { name: 'Light' })).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RadioGroup label="Theme">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
