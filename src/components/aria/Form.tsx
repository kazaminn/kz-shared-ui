import { type FormProps, Form as RACForm } from 'react-aria-components';
import { composeProps } from '@/lib/tv';

export function Form(props: FormProps) {
  return (
    <RACForm
      {...props}
      className={composeProps(props.className, 'flex flex-col gap-6')}
    />
  );
}
