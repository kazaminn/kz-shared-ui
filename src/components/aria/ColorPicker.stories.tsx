import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  type Color,
  ColorArea,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  SliderOutput,
  SliderTrack,
  parseColor,
} from 'react-aria-components';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Aria/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultValue: '#3b82f6',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Text color',
    defaultValue: '#ef4444',
  },
};

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = useState<Color>(parseColor('#3b82f6'));
    return (
      <div className="flex flex-col gap-4">
        <ColorPicker
          label="Background color"
          value={color}
          onChange={setColor}
        />
        <p className="text-sm text-muted">Selected: {color.toString('hex')}</p>
      </div>
    );
  },
};

export const WithSwatchPicker: Story = {
  render: () => (
    <ColorPicker label="Color" defaultValue="#3b82f6">
      <ColorArea
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        className="h-40 w-full rounded-md"
        style={({ defaultStyle }) => ({ ...defaultStyle })}
      >
        <ColorThumb
          className="top-1/2 left-1/2 h-6 w-6 rounded-full border-2 border-white outline-none"
          style={({ defaultStyle }) => ({
            ...defaultStyle,
            boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
          })}
        />
      </ColorArea>
      <ColorSlider colorSpace="hsb" channel="hue" aria-label="Hue">
        <SliderOutput className="sr-only" />
        <SliderTrack
          className="h-7 w-full rounded-md"
          style={({ defaultStyle }) => ({ ...defaultStyle })}
        >
          <ColorThumb
            className="top-1/2 left-1/2 h-6 w-6 rounded-full border-2 border-white outline-none"
            style={({ defaultStyle }) => ({
              ...defaultStyle,
              boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
            })}
          />
        </SliderTrack>
      </ColorSlider>
      <ColorSwatchPicker className="flex flex-wrap gap-1">
        {['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'].map(
          (c) => (
            <ColorSwatchPickerItem key={c} color={c} className="rounded-sm">
              <ColorSwatch className="h-6 w-6 rounded-sm border border-black/10" />
            </ColorSwatchPickerItem>
          )
        )}
      </ColorSwatchPicker>
    </ColorPicker>
  ),
};

export const MultipleColors: Story = {
  render: () => {
    const [bg, setBg] = useState<Color>(parseColor('#ffffff'));

    const [text, setText] = useState<Color>(parseColor('#000000'));
    return (
      <div className="flex gap-4">
        <ColorPicker label="Background" value={bg} onChange={setBg} />
        <ColorPicker label="Text" value={text} onChange={setText} />
      </div>
    );
  },
};
