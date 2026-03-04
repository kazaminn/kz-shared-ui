import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ColorSlider } from './ColorSlider';

describe('ColorSlider', () => {
  it('renders slider with role', () => {
    render(
      <ColorSlider
        label="Hue"
        colorSpace="hsb"
        channel="hue"
        defaultValue="#ff0000"
      />
    );

    expect(screen.getByRole('slider', { name: 'Hue' })).toBeInTheDocument();
  });
});
