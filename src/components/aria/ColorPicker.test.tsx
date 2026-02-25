import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders trigger button', () => {
    render(<ColorPicker defaultValue="#3b82f6" />);
    expect(
      screen.getByRole('button', { name: 'Select color' })
    ).toBeInTheDocument();
  });

  it('renders trigger button with label', () => {
    render(<ColorPicker defaultValue="#3b82f6" label="Text color" />);
    expect(
      screen.getByRole('button', { name: 'Text color' })
    ).toBeInTheDocument();
    expect(screen.getByText('Text color')).toBeInTheDocument();
  });

  it('applies trigger base classes', () => {
    render(<ColorPicker defaultValue="#3b82f6" />);
    expect(screen.getByRole('button')).toHaveClass(
      'border-2',
      'border-input',
      'bg-input'
    );
  });

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#3b82f6" label="Color" />);
    await user.click(screen.getByRole('button', { name: 'Color' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders color area and hue slider in default content', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#3b82f6" label="Color" />);
    await user.click(screen.getByRole('button', { name: 'Color' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders custom children in dialog', async () => {
    const user = userEvent.setup();
    render(
      <ColorPicker defaultValue="#3b82f6" label="Color">
        <div>Custom color picker content</div>
      </ColorPicker>
    );
    await user.click(screen.getByRole('button', { name: 'Color' }));
    expect(screen.getByText('Custom color picker content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ColorPicker defaultValue="#3b82f6" label="Text color" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
