import React from 'react';
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children: React.ReactNode;
}

const track = tv({
  extend: focusRing,
  base: 'box-border flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border border-transparent px-px font-sans shadow-inner transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'group-pressed:bg-hover border-main bg-surface dark:bg-surface',
      true: 'bg-primary group-pressed:bg-primary',
    },
    isDisabled: {
      true: 'bg-hover dark:group-selected:bg-selected border-main group-selected:bg-disabled dark:border-main dark:bg-surface',
    },
  },
});

const handle = tv({
  base: 'h-4 w-4 transform rounded-full shadow-xs outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'dark:bg-hover translate-x-0 bg-base',
      true: 'translate-x-full bg-base dark:bg-base',
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: true,
      class: 'bg-disabled dark:bg-surface',
    },
    {
      isSelected: true,
      isDisabled: true,
      class: 'bg-surface dark:bg-surface',
    },
  ],
});

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeProps(
        props.className,
        'group relative flex items-center gap-2 text-sm text-body transition [-webkit-tap-highlight-color:transparent] disabled:text-disabled'
      )}
    >
      {(renderProps) => (
        <>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  );
}
