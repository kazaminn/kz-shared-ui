import {
  ColorArea as AriaColorArea,
  type ColorAreaProps as AriaColorAreaProps,
} from 'react-aria-components';
import { ColorThumb } from '@/components/aria/ColorThumb';
import { composeProps } from '@/lib/tv';

export type ColorAreaProps = AriaColorAreaProps;

export function ColorArea(props: ColorAreaProps) {
  return (
    <AriaColorArea
      {...props}
      className={composeProps(
        props.className,
        'aspect-square w-full max-w-56 rounded-lg bg-disabled dark:bg-surface'
      )}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background,
      })}
    >
      <ColorThumb />
    </AriaColorArea>
  );
}
