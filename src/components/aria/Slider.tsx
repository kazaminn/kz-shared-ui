import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  Label,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';

const trackBackgroundStyles = tv({
  base: 'absolute rounded-full',
  variants: {
    orientation: {
      horizontal: 'top-1/2 h-1.5 w-full -translate-y-1/2',
      vertical: 'left-1/2 h-full w-1.5 -translate-x-1/2',
    },
    isDisabled: {
      false: 'bg-disabled',
      true: 'bg-disabled opacity-70',
    },
  },
});

const trackFillStyles = tv({
  base: 'absolute rounded-full',
  variants: {
    orientation: {
      horizontal:
        'inset-s-(--start,0) top-1/2 h-1.5 w-(--size) -translate-y-1/2',
      vertical: 'bottom-(--start,0) left-1/2 h-(--size) w-1.5 -translate-x-1/2',
    },
    isDisabled: {
      false: 'bg-primary',
      true: 'bg-disabled',
    },
  },
});

const thumbStyles = tv({
  base: [
    'h-5 w-5 rounded-full',
    'group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5',
    'border-2 border-secondary bg-primary',
    'shadow-sm outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'transition-transform duration-100',
  ],
  variants: {
    isDragging: {
      true: 'scale-110 cursor-pointer',
      false: 'cursor-pointer',
    },
    isDisabled: {
      true: 'cursor-not-allowed border-disabled bg-disabled',
    },
  },
});

const sliderStyles = tv({
  slots: {
    root: [
      'w-full gap-2',
      'orientation-horizontal:grid orientation-horizontal:grid-cols-[1fr_auto]',
      'orientation-vertical:flex orientation-vertical:flex-col orientation-vertical:items-center',
    ],
    label: 'text-sm font-medium text-body',
    output: 'text-sm text-muted tabular-nums orientation-vertical:hidden',
    track: [
      'group flex items-center',
      'orientation-horizontal:col-span-2',
      'orientation-horizontal:h-5 orientation-horizontal:w-full',
      'orientation-vertical:h-40 orientation-vertical:w-5',
      'disabled:cursor-not-allowed',
    ],
  },
});

export type SliderProps<T extends number | number[] = number> =
  AriaSliderProps<T> & {
    label?: string;
    thumbLabels?: string[];
    className?: string;
  };

export function Slider<T extends number | number[] = number>({
  label,
  thumbLabels,
  className: classNameProp,
  ...props
}: SliderProps<T>) {
  const { root, label: labelClass, output, track } = sliderStyles();

  return (
    <AriaSlider className={composeProps(classNameProp, root())} {...props}>
      {label && <Label className={labelClass()}>{label}</Label>}
      <SliderOutput className={output()}>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack className={track()}>
        {({ state, orientation, isDisabled }) => (
          <>
            <div
              className={trackBackgroundStyles({ orientation, isDisabled })}
            />
            {state.values.length === 1 ? (
              <div
                className={trackFillStyles({ orientation, isDisabled })}
                style={
                  {
                    '--size': `${state.getThumbPercent(0) * 100}%`,
                  } as React.CSSProperties
                }
              />
            ) : state.values.length === 2 ? (
              <div
                className={trackFillStyles({ orientation, isDisabled })}
                style={
                  {
                    '--start': `${state.getThumbPercent(0) * 100}%`,
                    '--size': `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
                  } as React.CSSProperties
                }
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                className={thumbStyles}
                aria-label={thumbLabels?.[i]}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
