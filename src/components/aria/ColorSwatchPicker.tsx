import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';
import { ColorSwatch } from './ColorSwatch';

const pickerStyles = tv({
  base: 'flex gap-1',
  variants: {
    layout: {
      stack: 'flex-col',
      grid: 'flex-wrap',
    },
  },
});

export function ColorSwatchPicker({
  children,
  ...props
}: Omit<ColorSwatchPickerProps, 'layout'>) {
  return (
    <AriaColorSwatchPicker
      {...props}
      className={composeProps(props.className, pickerStyles())}
    >
      {children}
    </AriaColorSwatchPicker>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: 'relative rounded-xs [-webkit-tap-highlight-color:transparent]',
});

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props} className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 box-border h-full w-full rounded-md border-2 border-main outline-2 -outline-offset-4 outline-white forced-color-adjust-none dark:border-main dark:outline-black" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  );
}
