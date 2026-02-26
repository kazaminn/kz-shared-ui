import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  Label,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';

const sliderStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-2',
    header: 'flex items-center justify-between',
    label: 'text-sm font-medium text-body',
    output: 'text-sm text-muted tabular-nums',
    track: [
      'relative flex items-center',
      'orientation-horizontal:h-5 orientation-horizontal:w-full',
      'orientation-vertical:h-40 orientation-vertical:w-5 orientation-vertical:flex-col',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    trackBackground: [
      'absolute rounded-full bg-disabled',
      'orientation-horizontal:h-1.5 orientation-horizontal:w-full',
      'orientation-vertical:h-full orientation-vertical:w-1.5',
    ],
    trackFill: [
      'absolute rounded-full bg-primary',
      'orientation-horizontal:h-1.5',
      'orientation-vertical:w-1.5',
    ],
    thumb: [
      'h-5 w-5 rounded-full',
      'border-2 border-white bg-primary',
      'cursor-grab shadow-sm',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
      'dragging:scale-110 dragging:cursor-grabbing',
      'disabled:cursor-not-allowed disabled:bg-disabled',
      'transition-transform duration-100',
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
  const {
    root,
    header,
    label: labelClass,
    output,
    track,
    trackBackground,
    trackFill,
    thumb,
  } = sliderStyles();

  return (
    <AriaSlider className={composeProps(classNameProp, root())} {...props}>
      <div className={header()}>
        {label && <Label className={labelClass()}>{label}</Label>}
        <SliderOutput className={output()} />
      </div>
      <SliderTrack className={track()}>
        {({ state }) => {
          const isRange = state.values.length > 1;
          return (
            <>
              <div className={trackBackground()} />
              <div
                className={trackFill()}
                style={
                  isRange
                    ? {
                        left: `${state.getThumbPercent(0) * 100}%`,
                        width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
                      }
                    : { width: `${state.getThumbPercent(0) * 100}%` }
                }
              />
              {state.values.map((_, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  className={thumb()}
                  aria-label={thumbLabels?.[i]}
                />
              ))}
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
