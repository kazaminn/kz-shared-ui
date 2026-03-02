import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders slider with role', () => {
    render(<Slider label="Volume" defaultValue={20} />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  it('has aria value attributes', () => {
    render(
      <Slider label="Volume" minValue={0} maxValue={100} defaultValue={30} />
    );

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('value', '30');
    expect(slider).toHaveAttribute('aria-valuetext', '30');
  });

  it('changes value with keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Slider
        label="Volume"
        minValue={0}
        maxValue={10}
        defaultValue={2}
        onChange={onChange}
      />
    );

    const slider = screen.getByRole('slider', { name: 'Volume' });
    slider.focus();
    await user.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('reflects disabled state', () => {
    render(<Slider label="Volume" isDisabled defaultValue={50} />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slider label="Volume" defaultValue={20} />);

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
