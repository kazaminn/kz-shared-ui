import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders textbox with label association', () => {
    render(<TextField label="Name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<TextField label="Name" placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('reflects disabled state', () => {
    render(<TextField label="Name" isDisabled />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
  });

  it('renders description', () => {
    render(<TextField label="Name" description="This name is public" />);

    expect(screen.getByText('This name is public')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <TextField label="Name" errorMessage="Name is required" isInvalid />
    );

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });
});
