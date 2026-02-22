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

const inputVariants = tv({
  slots: {
    root: 'flex w-full flex-col gap-1',
    label: 'text-sm font-medium text-body',
    input: [
      'w-full rounded-md border-2 border-input bg-input',
      'px-3 py-2 text-base text-body',
      'placeholder:text-input-placeholder',
      'outline-none',
      'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-0',
      'focus-visible:border-input-focus',
      'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled',
      'invalid:border-danger',
      'transition-colors duration-150',
    ],
    description: 'text-sm text-muted',
    error: 'text-sm text-danger',
  },
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
  const {
    root,
    label: labelClass,
    input,
    description: descriptionClass,
    error,
  } = inputVariants();

  return (
    <TextField className={root({ class: className })} {...props}>
      {label && <Label className={labelClass()}>{label}</Label>}
      <AriaInput placeholder={placeholder} className={input()} />
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
    </TextField>
  );
};
