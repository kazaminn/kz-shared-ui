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
    'cursor-pointer',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover pressed:bg-primary-hover',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover pressed:bg-secondary-hover',
      outline: 'border border-main bg-transparent text-body hover:bg-surface',
      destructive:
        'bg-danger text-danger-foreground hover:bg-danger-hover pressed:bg-danger-hover',
      link: 'bg-transparent text-link underline-offset-4 hover:text-link-hover pressed:text-link-active',
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
