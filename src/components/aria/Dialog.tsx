import { type DialogProps, Dialog as RACDialog } from 'react-aria-components';
import { composeProps } from '@/lib/tv';

export function Dialog(props: DialogProps) {
  return (
    <RACDialog
      {...props}
      className={composeProps(
        props.className,
        'relative box-border max-h-[inherit] overflow-auto p-6 outline-0 [[data-placement]>&]:p-4'
      )}
    />
  );
}
