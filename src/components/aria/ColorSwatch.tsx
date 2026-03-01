import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps,
} from 'react-aria-components';
import { composeProps } from '@/lib/tv';

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      className={composeProps(
        props.className,
        'box-border h-8 w-8 rounded-md border border-main/10'
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color.toString()}, ${color.toString()}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
}
