import React from 'react';
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  Button,
  DialogTrigger,
} from 'react-aria-components';
import { ColorArea } from '@/components/aria/ColorArea';
import { ColorField } from '@/components/aria/ColorField';
import { ColorSlider } from '@/components/aria/ColorSlider';
import { ColorSwatch } from '@/components/aria/ColorSwatch';
import { Dialog } from '@/components/aria/Dialog';
import { Popover } from '@/components/aria/Popover';
import { tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';

const buttonStyles = tv({
  extend: focusRing,
  base: 'flex cursor-default items-center gap-2 rounded-xs border-0 bg-transparent font-sans text-sm text-body [-webkit-tap-highlight-color:transparent] dark:text-body',
});

export interface ColorPickerProps extends Omit<
  AriaColorPickerProps,
  'children'
> {
  label?: string;
  children?: React.ReactNode;
}

export function ColorPicker({ label, children, ...props }: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <Button className={buttonStyles}>
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-2">
            {children ?? (
              <>
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                />
                <ColorSlider colorSpace="hsb" channel="hue" />
                <ColorField label="Hex" />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}
