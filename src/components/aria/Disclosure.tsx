import React, { useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps,
  DisclosureStateContext,
  Heading,
} from 'react-aria-components';
import { composeProps, tv } from '@/lib/tv';
import { Button } from './Button';

const disclosure = tv({
  base: 'group min-w-50 rounded-lg font-sans text-body',
});

const chevron = tv({
  base: 'dark:text-subtle h-4 w-4 text-muted transition-transform duration-200 ease-in-out',
  variants: {
    isExpanded: {
      true: 'rotate-90 transform',
    },
    isDisabled: {
      true: 'text-disabled dark:text-disabled forced-colors:text-[GrayText]',
    },
  },
});

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  return (
    <AriaDisclosure
      {...props}
      className={composeProps(props.className, disclosure())}
    >
      {children}
    </AriaDisclosure>
  );
}

export interface DisclosureHeaderProps {
  children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  const { isExpanded } = useContext(DisclosureStateContext)!;
  return (
    <Heading className="m-0 text-lg font-semibold">
      <Button
        slot="trigger"
        variant="quiet"
        className="w-full justify-start font-medium"
      >
        {({ isDisabled }) => (
          <>
            <ChevronRight
              aria-hidden
              className={chevron({ isExpanded, isDisabled })}
            />
            <span>{children}</span>
          </>
        )}
      </Button>
    </Heading>
  );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeProps(
        props.className,
        'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]'
      )}
    >
      <div className="px-4 py-2">{children}</div>
    </AriaDisclosurePanel>
  );
}
