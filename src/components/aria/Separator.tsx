import {
  Separator as RACSeparator,
  type SeparatorProps,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const styles = tv({
  base: 'dark:bg-hover border-none bg-disabled forced-colors:bg-[ButtonBorder]',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full min-h-8 w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Separator(props: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className={styles({
        orientation: props.orientation,
        className: props.className,
      })}
    />
  );
}
