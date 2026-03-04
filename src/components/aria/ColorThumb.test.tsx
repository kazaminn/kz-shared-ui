import { render, screen } from '@testing-library/react';
import { ColorArea } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { ColorThumb } from './ColorThumb';

describe('ColorThumb', () => {
  it('renders thumb in color area', () => {
    render(
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
      >
        <ColorThumb />
      </ColorArea>
    );

    expect(
      screen.getByRole('slider', { name: /Saturation and brightness/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('reflects disabled state', () => {
    render(
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        isDisabled
      >
        <ColorThumb />
      </ColorArea>
    );

    expect(
      screen.getByRole('slider', { name: /Saturation and brightness/i })
    ).toBeDisabled();
  });
});
