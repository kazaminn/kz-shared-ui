import { render, screen } from '@testing-library/react';
import { TextField as RACTextField } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { Description, FieldError, FieldGroup, Input, Label } from './Field';

describe('Field', () => {
  it('renders label and input with accessible name', () => {
    render(
      <RACTextField>
        <Label>Name</Label>
        <Input />
      </RACTextField>
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('renders description and error message text', () => {
    render(
      <RACTextField isInvalid>
        <Label>Email</Label>
        <Input />
        <Description>Email will be visible to your team.</Description>
        <FieldError>Email is required.</FieldError>
      </RACTextField>
    );

    expect(
      screen.getByText('Email will be visible to your team.')
    ).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });

  it('renders field group with group role', () => {
    render(
      <FieldGroup>
        <Input aria-label="Amount" />
      </FieldGroup>
    );

    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
