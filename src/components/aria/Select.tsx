import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  SelectValue,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const selectStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1',
    label: 'text-sm font-medium text-body',
    trigger: [
      'inline-flex w-full items-center justify-between gap-2',
      'h-10 rounded-md px-3',
      'border-2 border-input bg-input text-body',
      'cursor-default text-base',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
      'focus-visible:border-input-focus',
      'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled',
      'invalid:border-danger',
      'transition-colors duration-150',
    ],
    popover: [
      'min-w-[var(--trigger-width)] overflow-auto rounded-md border border-main bg-surface',
      'shadow-md',
      'entering:animate-in entering:fade-in entering:zoom-in-95',
      'exiting:animate-out exiting:fade-out exiting:zoom-out-95',
    ],
    listbox: 'p-1 outline-none',
    description: 'text-sm text-muted',
    error: 'text-sm text-danger',
  },
});

const itemStyles = tv({
  base: [
    'flex cursor-default items-center gap-2 rounded-sm px-3 py-2',
    'text-base text-body',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring',
    'focused:bg-surface',
    'selected:font-medium',
    'disabled:cursor-not-allowed disabled:text-disabled',
    'transition-colors duration-100',
  ],
});

export type SelectItemProps = ListBoxItemProps & {
  className?: string;
};

export const SelectItem: React.FC<SelectItemProps> = ({
  className,
  ...props
}: SelectItemProps) => {
  return <ListBoxItem className={itemStyles({ className })} {...props} />;
};

export type SelectProps<T extends object = object> = AriaSelectProps<T> & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
};

export function Select<T extends object = object>({
  label,
  description,
  errorMessage,
  className,
  children,
  ...props
}: SelectProps<T>) {
  const {
    root,
    label: labelClass,
    trigger,
    popover,
    listbox,
    description: descriptionClass,
    error,
  } = selectStyles();

  return (
    <AriaSelect className={root({ class: className })} {...props}>
      {label && <Label className={labelClass()}>{label}</Label>}
      <Button className={trigger()}>
        <SelectValue />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="currentColor"
          className="shrink-0 text-muted"
        >
          <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </Button>
      {description && (
        <Text slot="description" className={descriptionClass()}>
          {description}
        </Text>
      )}
      <FieldError className={error()}>
        {typeof errorMessage === 'function'
          ? (v) => errorMessage(v)
          : errorMessage}
      </FieldError>
      <Popover className={popover()}>
        <ListBox className={listbox()}>{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
}
