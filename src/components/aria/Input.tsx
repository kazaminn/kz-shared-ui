import {
  Input as AriaInput,
  type TextFieldProps as AriaTextFieldProps,
  FieldError,
  Label,
  Text,
  TextField,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const inputStyles = tv({
  base: [
    'w-full rounded-md border border-input bg-input',
    'px-3 py-2 text-base text-body',
    'placeholder:text-input-placeholder',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-0',
    'focus-visible:border-input-focus',
    'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled',
    'invalid:border-danger',
    'transition-colors duration-150',
  ],
});

export type InputProps = AriaTextFieldProps & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  ...props
}: InputProps) => {
  return (
    <TextField className={className} {...props}>
      {label && <Label>{label}</Label>}
      <AriaInput placeholder={placeholder} className={inputStyles()} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>
        {typeof errorMessage === 'function'
          ? (v) => errorMessage(v)
          : errorMessage}
      </FieldError>
    </TextField>
  );
};
