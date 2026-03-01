import React, { type ReactNode } from 'react';
import {
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps,
  type RadioRenderProps,
  type ValidationResult,
} from 'react-aria-components';
import { Description, FieldError, Label } from '@/components/aria/Field';
import { composeProps, tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeProps(
        props.className,
        'group flex flex-col gap-2 font-sans'
      )}
    >
      <Label>{props.label}</Label>
      <div className="flex gap-2 group-orientation-horizontal:gap-4 group-orientation-vertical:flex-col">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

const styles = tv({
  extend: focusRing,
  base: 'box-border h-4.5 w-4.5 rounded-full border bg-base transition-all dark:bg-base',
  variants: {
    isSelected: {
      false:
        'border-main group-pressed:border-main dark:border-main dark:group-pressed:border-main',
      true: 'border-[calc(var(--spacing)*1.5)] border-main group-pressed:border-main dark:border-main dark:group-pressed:border-main forced-colors:border-[Highlight]!',
    },
    isInvalid: {
      true: 'border-danger group-pressed:border-danger dark:border-danger dark:group-pressed:border-danger forced-colors:border-[Mark]!',
    },
    isDisabled: {
      true: 'border-main dark:border-main forced-colors:border-[GrayText]!',
    },
  },
});

export function Radio(props: RadioProps) {
  const { children, ...rest } = props;

  const renderContent = (
    renderProps: RadioRenderProps & { defaultChildren: React.ReactNode }
  ) => {
    const resolved =
      typeof children === 'function'
        ? children(renderProps)
        : (children ?? renderProps.defaultChildren);

    return (
      <>
        <div className={styles(renderProps)} />
        {resolved}
      </>
    );
  };

  return (
    <RACRadio
      {...rest}
      className={composeProps(
        props.className,
        'group relative flex items-center gap-2 text-sm text-body transition [-webkit-tap-highlight-color:transparent] disabled:text-disabled dark:text-body dark:disabled:text-disabled forced-colors:disabled:text-[GrayText]'
      )}
    >
      {renderContent}
    </RACRadio>
  );
}
