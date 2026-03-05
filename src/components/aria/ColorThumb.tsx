import {
  ColorThumb as AriaColorThumb,
  type ColorThumbProps,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const thumbStyles = tv({
  base: 'top-[50%] left-[50%] box-border h-4.5 w-4.5 rounded-full border-2 border-main',
  variants: {
    isFocusVisible: {
      true: 'h-8 w-8',
    },
    isDragging: {
      true: 'dark:bg-hover bg-surface',
    },
    isDisabled: {
      true: 'border-main bg-disabled dark:border-main dark:bg-surface',
    },
  },
});

export function ColorThumb(props: ColorThumbProps) {
  return (
    <AriaColorThumb
      {...props}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
        boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
      })}
      className={thumbStyles}
    />
  );
}
