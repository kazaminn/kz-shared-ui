import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  SelectionIndicator,
  type TabListProps,
  type TabPanelProps,
  type TabPanelsProps,
  type TabProps,
  type TabRenderProps,
  type TabsProps,
} from 'react-aria-components';
import { composeProps, resolveRenderPropsChildren, tv } from '@/lib/tv';
import { focusRing } from '@/lib/variants';

const tabsStyles = tv({
  base: 'flex max-w-full gap-4 font-sans',
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row',
    },
  },
});

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeProps(props.className, tabsStyles())}
    />
  );
}

const tabListStyles = tv({
  base: '-m-1 flex max-w-full overflow-x-auto overflow-y-clip p-1 [scrollbar-width:none]',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
  },
});

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeProps(props.className, tabListStyles())}
    />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: 'group relative flex cursor-default items-center rounded-full px-3 py-1.5 text-sm font-medium transition forced-color-adjust-none [-webkit-tap-highlight-color:transparent]',
  variants: {
    isDisabled: {
      true: 'selected:bg-selected dark:selected:bg-selected text-disabled dark:text-disabled forced-colors:text-[GrayText] selected:text-white dark:selected:text-muted forced-colors:selected:bg-[GrayText] forced-colors:selected:text-[HighlightText]',
    },
  },
});

export function Tab(props: TabProps) {
  const { children, ...rest } = props;

  const renderContent = (
    renderProps: TabRenderProps & { defaultChildren: React.ReactNode }
  ) => {
    const resolved = resolveRenderPropsChildren(children, renderProps);

    return (
      <>
        {resolved}
        <SelectionIndicator className="group-disabled:dark:bg-hover absolute top-0 left-0 z-10 h-full w-full rounded-full bg-base mix-blend-difference group-disabled:-z-1 group-disabled:bg-disabled group-disabled:mix-blend-normal motion-safe:transition-[translate,width,height]" />
      </>
    );
  };

  return (
    <RACTab {...rest} className={composeProps(props.className, tabProps())}>
      {renderContent}
    </RACTab>
  );
}

export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  return (
    <RACTabPanels
      {...props}
      className={composeProps(
        props.className,
        'relative h-(--tab-panel-height) overflow-clip motion-safe:transition-[height]'
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: 'text-heading box-border flex-1 p-4 text-sm transition dark:text-body entering:opacity-0 exiting:absolute exiting:top-0 exiting:left-0 exiting:w-full exiting:opacity-0',
});

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeProps(props.className, tabPanelStyles())}
    />
  );
}
