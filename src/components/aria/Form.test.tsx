import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { Form } from './Form';
import { TextField } from './TextField';

describe('Form', () => {
  it('renders a form element', () => {
    render(
      <Form aria-label="Profile form">
        <TextField label="Name" />
        <Button type="submit">Save</Button>
      </Form>
    );

    expect(screen.getByRole('form', { name: 'Profile form' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Form aria-label="Profile form">
        <TextField label="Name" />
        <Button type="submit">Save</Button>
      </Form>
    );

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
