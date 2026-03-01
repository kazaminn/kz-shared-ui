import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { Label } from '@/components/aria/Field';
import { composeProps, tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';

const trackStyles = tv({
  base: 'rounded-full',
  variants: {
    orientation: {
      horizontal: 'h-1.5 w-full',
      vertical: 'ml-[50%] h-full w-1.5 -translate-x-[50%]',
    },
    isDisabled: {
      false: 'bg-disabled dark:bg-surface forced-colors:bg-[ButtonBorder]',
      true: 'bg-hover dark:bg-surface forced-colors:bg-[ButtonBorder]',
    },
  },
});

const fillStyles = tv({
  base: 'absolute rounded-full',
  variants: {
    orientation: {
      horizontal: 'inset-s-(--start,0) h-1.5 w-(--size)',
      vertical:
        'bottom-(--start,0) ml-[50%] h-(--size) w-1.5 -translate-x-[50%]',
    },
    isDisabled: {
      false: 'bg-primary forced-colors:bg-[Highlight]',
      true: 'dark:bg-hover bg-disabled forced-colors:bg-[GrayText]',
    },
  },
});

const thumbStyles = tv({
  extend: focusRing,
  base: 'h-4.5 w-4.5 rounded-full border border-main bg-surface group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 dark:border-main dark:bg-base',
  variants: {
    isDragging: {
      true: 'dark:bg-hover bg-surface forced-colors:bg-[ButtonBorder]',
    },
    isDisabled: {
      true: 'border-main dark:border-main forced-colors:border-[GrayText]',
    },
  },
});

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeProps(
        props.className,
        'grid-cols-[1fr_auto] flex-col items-center gap-2 font-sans orientation-horizontal:grid orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)] orientation-vertical:flex'
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="dark:text-subtle text-sm text-muted orientation-vertical:hidden">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack className="group col-span-2 flex items-center orientation-horizontal:h-5 orientation-vertical:h-38 orientation-vertical:w-5">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.length === 1 ? (
              // Single thumb, render fill from the end
              <div
                className={fillStyles(renderProps)}
                style={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  { '--size': state.getThumbPercent(0) * 100 + '%' } as any
                }
              />
            ) : state.values.length === 2 ? (
              // Range slider, render fill between the thumbs
              <div
                className={fillStyles(renderProps)}
                style={
                  {
                    '--start': state.getThumbPercent(0) * 100 + '%',
                    '--size':
                      (state.getThumbPercent(1) - state.getThumbPercent(0)) *
                        100 +
                      '%',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                }
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
