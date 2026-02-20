import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { type VariantProps, tv } from '@/lib/tv';

const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium',
    'transition-colors duration-150',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground pressed:bg-primary-hover',
      secondary:
        'bg-secondary text-secondary-foreground pressed:bg-secondary-hover',
      outline: 'hovered:bg-surface border border-main bg-transparent text-body',
      destructive: 'bg-danger text-danger-foreground pressed:bg-danger-hover',
      link: 'hovered:text-link-hover bg-transparent text-link underline-offset-4 pressed:text-link-active',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = AriaButtonProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
