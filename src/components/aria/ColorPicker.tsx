import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  Button,
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorThumb,
  Dialog,
  DialogTrigger,
  Input,
  Label,
  Popover,
  SliderOutput,
  SliderTrack,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const colorPickerStyles = tv({
  slots: {
    trigger: [
      'inline-flex cursor-default items-center gap-2 rounded-md px-3 py-2',
      'border-2 border-input bg-input text-sm text-body',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
      'focus-visible:border-input-focus',
      'transition-colors duration-150',
    ],
    swatch: 'h-6 w-6 rounded-sm border border-black/10',
    popover: [
      'flex w-56 flex-col gap-3 rounded-lg border border-main bg-surface p-4 shadow-lg',
      'entering:animate-in entering:fade-in entering:zoom-in-95',
      'exiting:animate-out exiting:fade-out exiting:zoom-out-95',
    ],
    colorArea: 'h-48 w-full rounded-md',
    colorThumb: [
      'top-1/2 left-1/2 h-6 w-6 rounded-full border-2 border-white',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    ],
    sliderTrack: 'h-7 w-full rounded-md',
    sliderOutput: 'sr-only',
    hexField: 'flex flex-col gap-1',
    hexLabel: 'text-xs text-muted',
    hexInput: [
      'w-full rounded-md border-2 border-input bg-input px-2 py-1 text-sm text-body',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
      'focus-visible:border-input-focus',
      'transition-colors duration-150',
    ],
  },
});

export type ColorPickerProps = Omit<AriaColorPickerProps, 'children'> & {
  label?: string;
  children?: React.ReactNode;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  children,
  ...props
}: ColorPickerProps) => {
  const {
    trigger,
    swatch,
    popover,
    colorArea,
    colorThumb,
    sliderTrack,
    sliderOutput,
    hexField,
    hexLabel,
    hexInput,
  } = colorPickerStyles();

  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <Button aria-label={label ?? 'Select color'} className={trigger()}>
          <ColorSwatch className={swatch()} />
          {label && <span>{label}</span>}
        </Button>
        <Popover placement="bottom start" className={popover()}>
          <Dialog aria-label={label ?? 'Color picker'}>
            {children ?? (
              <>
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                  className={colorArea()}
                  style={({ defaultStyle, isDisabled }) => ({
                    ...defaultStyle,
                    background: isDisabled
                      ? undefined
                      : defaultStyle.background,
                  })}
                >
                  <ColorThumb
                    className={colorThumb()}
                    style={({ defaultStyle, isDisabled }) => ({
                      ...defaultStyle,
                      backgroundColor: isDisabled
                        ? undefined
                        : defaultStyle.backgroundColor,
                      boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
                    })}
                  />
                </ColorArea>
                <ColorSlider colorSpace="hsb" channel="hue" aria-label="Hue">
                  <SliderOutput className={sliderOutput()} />
                  <SliderTrack
                    className={sliderTrack()}
                    style={({ defaultStyle }) => ({
                      ...defaultStyle,
                      background: `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 12px 12px`,
                    })}
                  >
                    <ColorThumb
                      className={colorThumb()}
                      style={({ defaultStyle, isDisabled }) => ({
                        ...defaultStyle,
                        backgroundColor: isDisabled
                          ? undefined
                          : defaultStyle.backgroundColor,
                        boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
                      })}
                    />
                  </SliderTrack>
                </ColorSlider>
                <ColorField className={hexField()}>
                  <Label className={hexLabel()}>Hex</Label>
                  <Input className={hexInput()} />
                </ColorField>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
};
