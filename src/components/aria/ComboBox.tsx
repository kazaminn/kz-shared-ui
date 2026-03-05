import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxStateContext,
  ListBox,
  type ListBoxItemProps,
  type ValidationResult,
} from 'react-aria-components';
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from '@/components/aria/Field';
import { FieldButton } from '@/components/aria/FieldButton';
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps,
} from '@/components/aria/ListBox';
import { Popover } from '@/components/aria/Popover';
import { composeProps } from '@/lib/tv';

export interface ComboBoxProps<T extends object> extends Omit<
  AriaComboBoxProps<T>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: ComboBoxProps<T>) {
  const state = useContext(ComboBoxStateContext);
  const isSelected = state?.selectedKey != null;

  return (
    <AriaComboBox
      {...props}
      className={composeProps(
        props.className,
        'group flex flex-col gap-1 font-sans'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <Input
          data-selected={isSelected || undefined}
          className="data-[selected]:text-heading selected:text-heading ps-3 pe-1"
        />
        <FieldButton className="mr-1 w-6 outline-offset-0">
          <ChevronDown aria-hidden className="h-4 w-4" />
        </FieldButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <Popover className="w-(--trigger-width)">
        <ListBox
          items={items}
          className="box-border max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function ComboBoxSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return <DropdownSection {...props} />;
}
