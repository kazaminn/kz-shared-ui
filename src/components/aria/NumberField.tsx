import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  type ValidationResult,
} from 'react-aria-components';
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from '@/components/aria/Field';
import { composeProps } from '@/lib/tv';
import { fieldBorderStyles } from '@/lib/variants';

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={composeProps(
        props.className,
        'group flex flex-col gap-1 font-sans'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input className="w-20" placeholder={placeholder} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                class: 'flex h-full flex-col border-s',
              })}
            >
              <StepperButton slot="increment">
                <ChevronUp aria-hidden className="h-4 w-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  class: 'border-b',
                })}
              />
              <StepperButton slot="decrement">
                <ChevronDown aria-hidden className="h-4 w-4" />
              </StepperButton>
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaNumberField>
  );
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="dark:text-subtle pressed:bg-hover dark:pressed:bg-hover box-border flex flex-1 cursor-default border-0 bg-transparent px-0.5 py-0 text-muted [-webkit-tap-highlight-color:transparent] group-disabled:text-disabled dark:group-disabled:text-disabled"
    />
  );
}
