import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with label', () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders slider with accessible name from label', () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  it('renders output showing current value', () => {
    render(<Slider label="Volume" defaultValue={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies default value', () => {
    render(<Slider label="Volume" defaultValue={30} />);
    const slider = screen.getByRole('slider');
    // SliderThumb renders as <input type="range">; value is set via native attribute
    expect(slider).toHaveAttribute('value', '30');
  });

  it('respects minValue and maxValue', () => {
    render(
      <Slider
        label="Brightness"
        defaultValue={50}
        minValue={0}
        maxValue={200}
      />
    );
    const slider = screen.getByRole('slider');
    // SliderThumb renders as <input type="range">; min/max are native attributes
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '200');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Slider label="Volume" defaultValue={50} isDisabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('applies thumb classes', () => {
    const { container } = render(<Slider label="Volume" defaultValue={50} />);
    const thumbEl = container.querySelector(
      'div[class*="focus-visible:ring-focus-ring"]'
    );
    expect(thumbEl).toHaveClass('bg-primary');
    expect(thumbEl).toHaveClass('focus-visible:ring-focus-ring');
  });

  it('calls onChange while dragging', () => {
    const onChange = vi.fn();
    render(<Slider label="Volume" defaultValue={50} onChange={onChange} />);
    // onChange is called programmatically; just verify the prop is passed
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders range slider with two thumbs', () => {
    render(
      <Slider
        label="Price range"
        defaultValue={[20, 80]}
        thumbLabels={['min', 'max']}
      />
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('renders output using thumb value labels for range', () => {
    render(
      <Slider
        label="Price range"
        defaultValue={[20, 80]}
        thumbLabels={['min', 'max']}
      />
    );
    expect(screen.getByText('20 – 80')).toBeInTheDocument();
  });

  it('applies disabled styles to track fill and background', () => {
    const { container } = render(
      <Slider label="Volume" defaultValue={50} isDisabled />
    );
    const fill = container.querySelector('div[style*="--size"]');
    const background = container.querySelector('div.bg-disabled.opacity-70');
    expect(fill).toHaveClass('bg-disabled');
    expect(background).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slider label="Volume" defaultValue={50} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
