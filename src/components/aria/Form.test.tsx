import { render, screen } from '@testing-library/react';
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

    expect(
      screen.getByRole('form', { name: 'Profile form' })
    ).toBeInTheDocument();
  });
});
