import {
  ColorSlider as AriaColorSlider,
  type ColorSliderProps as AriaColorSliderProps,
  SliderOutput,
  SliderTrack,
} from 'react-aria-components';
import { ColorThumb } from '@/components/aria/ColorThumb';
import { Label } from '@/components/aria/Field';
import { composeProps, tv } from '@/lib/tv';

const trackStyles = tv({
  base: 'group col-span-2 rounded-md',
  variants: {
    orientation: {
      horizontal: 'h-6 w-full',
      vertical: 'h-50 w-6',
    },
    isDisabled: {
      true: 'bg-disabled dark:bg-surface forced-colors:bg-[GrayText]',
    },
  },
});

interface ColorSliderProps extends AriaColorSliderProps {
  label?: string;
}

export function ColorSlider({ label, ...props }: ColorSliderProps) {
  return (
    <AriaColorSlider
      {...props}
      className={composeProps(
        props.className,
        'grid-cols-[1fr_auto] flex-col items-center gap-2 font-sans orientation-horizontal:grid orientation-horizontal:w-56 orientation-vertical:flex'
      )}
    >
      {label && <Label>{label}</Label>}
      <SliderOutput className="dark:text-subtle text-sm font-medium text-muted orientation-vertical:hidden" />
      <SliderTrack
        className={trackStyles}
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      >
        <ColorThumb />
      </SliderTrack>
    </AriaColorSlider>
  );
}
