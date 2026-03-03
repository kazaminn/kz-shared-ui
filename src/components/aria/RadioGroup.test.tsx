import { User } from '@react-aria/test-utils';
import { render, screen } from '@testing-library/react';
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

    expect(
      screen.getByRole('radiogroup', { name: 'Theme' })
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeInTheDocument();
  });

  it('changes selection when clicked', async () => {
    render(
      <RadioGroup label="Theme">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );
    const user = new User();
    const radioGroupTester = user.createTester('RadioGroup', {
      root: screen.getByRole('radiogroup', { name: 'Theme' }),
    });

    await radioGroupTester.triggerRadio({ radio: 'Dark' });
    const dark = screen.getByRole('radio', { name: 'Dark' });

    expect(dark).toBeChecked();
  });

  it('changes selection with keyboard', async () => {
    render(
      <RadioGroup label="Theme" defaultValue="light">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    );
    const user = new User({ interactionType: 'keyboard' });
    const radioGroupTester = user.createTester('RadioGroup', {
      root: screen.getByRole('radiogroup', { name: 'Theme' }),
    });

    await radioGroupTester.triggerRadio({ radio: 'Dark' });

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
});
