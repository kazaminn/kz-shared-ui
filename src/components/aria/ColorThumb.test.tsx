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

    const thumb = screen.getByRole('presentation');
    expect(thumb).toHaveClass('h-4.5', 'w-4.5', 'border-2', 'border-main');
    expect(thumb).toHaveStyle({
      boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
    });
  });

  it('reflects disabled state styles', () => {
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

    expect(screen.getByRole('presentation')).toHaveClass('bg-disabled');
  });
});
