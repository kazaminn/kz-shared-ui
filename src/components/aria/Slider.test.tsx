import { act, fireEvent, render, screen } from '@testing-library/react';
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

  it('changes value with keyboard', () => {
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

    act(() => {
      slider.focus();
      fireEvent.keyDown(slider, { key: 'ArrowRight', code: 'ArrowRight' });
    });

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('reflects disabled state', () => {
    render(<Slider label="Volume" isDisabled defaultValue={50} />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toBeDisabled();
  });
});
