'use client';
import React from 'react';
import { Check } from 'lucide-react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  type ListBoxItemProps,
  type ListBoxItemRenderProps,
  ListBoxSection,
  type SectionProps,
} from 'react-aria-components';
import { composeProps } from '@/lib/tv';
import { dropdownItemStyles, itemStyles } from '@/lib/variants';

type ListBoxProps<T> = Omit<AriaListBoxProps<T>, 'layout' | 'orientation'>;

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeProps(
        props.className,
        'w-50 rounded-lg border border-main bg-base p-1 font-sans outline-0 dark:border-main dark:bg-base'
      )}
    >
      {children}
    </AriaListBox>
  );
}

export function ListBoxItem(props: ListBoxItemProps) {
  const { children, ...rest } = props;

  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  const renderContent = (
    renderProps: ListBoxItemRenderProps & { defaultChildren: React.ReactNode }
  ) => {
    const resolved =
      typeof children === 'function'
        ? children(renderProps)
        : (children ?? renderProps.defaultChildren);

    return (
      <>
        {resolved}
        <div className="absolute right-4 bottom-0 left-4 hidden h-px bg-base/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
      </>
    );
  };

  return (
    <AriaListBoxItem {...rest} textValue={textValue} className={itemStyles}>
      {renderContent}
    </AriaListBoxItem>
  );
}

export function DropdownItem(props: ListBoxItemProps) {
  const { children, ...rest } = props;

  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  const renderContent = (
    renderProps: ListBoxItemRenderProps & { defaultChildren: React.ReactNode }
  ) => {
    const resolved =
      typeof children === 'function'
        ? children(renderProps)
        : (children ?? renderProps.defaultChildren);

    return (
      <>
        <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
          {resolved}
        </span>
        <span className="flex w-5 items-center">
          {renderProps.isSelected && <Check className="h-4 w-4" />}
        </span>
      </>
    );
  };

  return (
    <AriaListBoxItem
      {...rest}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {renderContent}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
  items?: Iterable<T>;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return (
    <ListBoxSection className="after:block after:h-1.25 after:content-[''] first:-mt-1.25 last:after:hidden">
      <Header className="bg-hover/60 supports-[-moz-appearance:none]:bg-hover sticky -top-1.25 z-10 -mx-1 -mt-px truncate border-y border-y-main px-4 py-1 text-sm font-semibold text-muted backdrop-blur-md dark:border-y-main dark:bg-surface/60 dark:text-muted [&+*]:mt-1">
        {props.title}
      </Header>
      {props.items && (
        <Collection items={props.items}>{props.children}</Collection>
      )}
    </ListBoxSection>
  );
}
