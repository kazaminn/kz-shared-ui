import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const switchRootStyles = tv({
  base: [
    'group inline-flex cursor-default items-center gap-3 select-none',
    'text-sm font-medium text-body',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
});

const trackStyles = tv({
  base: [
    'inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5',
    'border border-transparent',
    'transition-colors duration-200',
    'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-focus-ring group-data-[focus-visible]:ring-offset-2',
  ],
  variants: {
    isSelected: {
      false: 'bg-disabled',
      true: 'bg-primary',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

const handleStyles = tv({
  base: [
    'block h-5 w-5 rounded-full bg-white shadow-sm',
    'transition-transform duration-200',
  ],
  variants: {
    isSelected: {
      false: 'translate-x-0',
      true: 'translate-x-5',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export type SwitchProps = Omit<AriaSwitchProps, 'children'> & {
  children: React.ReactNode;
  className?: string;
};

export const Switch: React.FC<SwitchProps> = ({
  children,
  className,
  ...props
}: SwitchProps) => {
  return (
    <AriaSwitch className={switchRootStyles({ className })} {...props}>
      {({ isSelected }) => (
        <>
          <span className={trackStyles({ isSelected })}>
            <span className={handleStyles({ isSelected })} />
          </span>
          {children}
        </>
      )}
    </AriaSwitch>
  );
};
