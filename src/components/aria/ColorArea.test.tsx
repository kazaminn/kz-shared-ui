import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ColorArea } from './ColorArea';

describe('ColorArea', () => {
  it('renders a slider element', () => {
    render(
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
      />
    );

    expect(
      screen.getByRole('slider', { name: /Saturation and brightness/i })
    ).toBeInTheDocument();
  });

  it('reflects disabled state', () => {
    render(
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        isDisabled
      />
    );

    expect(
      screen.getByRole('slider', { name: /Saturation and brightness/i })
    ).toBeDisabled();
  });
});
