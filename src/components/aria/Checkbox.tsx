import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';

const rootStyles = tv({
  base: [
    'group inline-flex cursor-default items-center gap-2 select-none',
    'text-sm font-medium text-body',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'relative [-webkit-tap-highlight-color:transparent]',
  ],
});

const boxStyles = tv({
  base: [
    'h-4.5 w-4.5 shrink-0 rounded-sm border',
    'flex items-center justify-center',
    'transition-colors duration-150',
    'group-data-focus-visible:ring-2 group-data-focus-visible:ring-focus-ring group-data-focus-visible:ring-offset-2',
  ],
  variants: {
    isSelected: {
      false: 'border-input bg-input',
      true: 'border-primary bg-primary',
    },
    isIndeterminate: {
      true: 'border-primary bg-primary',
    },
    isInvalid: {
      true: 'border-danger',
    },
    isDisabled: {
      true: 'border-disabled bg-disabled',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

const iconStyles = 'h-3 w-3 text-primary-foreground pointer-events-none';

export type CheckboxProps = Omit<AriaCheckboxProps, 'children'> & {
  children?: React.ReactNode;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className: classNameProp,
  ...props
}: CheckboxProps) => {
  return (
    <AriaCheckbox
      {...props}
      className={composeProps(classNameProp, rootStyles())}
    >
      {({ isSelected, isIndeterminate, isDisabled, isInvalid }) => (
        <>
          <div
            className={boxStyles({
              isSelected,
              isIndeterminate,
              isDisabled,
              isInvalid,
            })}
          >
            {isIndeterminate ? (
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={iconStyles}
                fill="currentColor"
              >
                <rect x="3" y="7" width="10" height="2" rx="1" />
              </svg>
            ) : isSelected ? (
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={iconStyles}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2.5 8.5 6.5 12.5 13.5 4.5" />
              </svg>
            ) : null}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
};
