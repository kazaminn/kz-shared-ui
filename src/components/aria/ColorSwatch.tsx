import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps as AriaColorSwatchProps,
} from 'react-aria-components';
import { type VariantProps, composeProps, tv } from '@/lib/tv';

const colorSwatchStyles = tv({
  base: ['rounded-md', 'border-secondary', 'shadow-sm'],
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
    shape: {
      square: 'rounded-md',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'square',
  },
});

export type ColorSwatchProps = AriaColorSwatchProps &
  VariantProps<typeof colorSwatchStyles> & {
    className?: string;
  };

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  size,
  shape,
  className: classNameProp,
  ...props
}: ColorSwatchProps) => {
  return (
    <AriaColorSwatch
      {...props}
      className={composeProps(
        classNameProp,
        colorSwatchStyles({ size, shape })
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color.toString('css')}, ${color.toString('css')}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
};
