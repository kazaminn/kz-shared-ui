import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
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
  base: 'flex w-full max-w-full gap-4 font-sans',
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeProps(props.className, ({ orientation }) =>
        tabsStyles({ orientation })
      )}
    />
  );
}

const tabListStyles = tv({
  base: 'relative flex w-full max-w-full overflow-x-auto overflow-y-clip [scrollbar-width:none]',
  variants: {
    orientation: {
      horizontal: 'flex-row items-end gap-2 border-b border-main/30',
      vertical: 'flex-col items-start gap-1 border-r border-main/15 pr-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeProps(props.className, ({ orientation }) =>
        tabListStyles({ orientation })
      )}
    />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: 'group transition-colors[-webkit-tap-highlight-color:transparent] relative flex cursor-default items-center px-5 py-3 text-lg font-medium',
  variants: {
    isSelected: {
      false: 'text-body',
      true: 'text-heading',
    },
    isDisabled: {
      true: 'text-disabled',
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
        {renderProps.isSelected && (
          <span className="absolute right-2 -bottom-px left-2 z-10 h-1 rounded-full bg-primary group-disabled:bg-disabled" />
        )}
      </>
    );
  };

  return (
    <RACTab
      {...rest}
      className={composeProps(props.className, (renderProps) =>
        tabProps({
          isFocusVisible: renderProps.isFocusVisible,
          isSelected: renderProps.isSelected,
          isDisabled: renderProps.isDisabled,
        })
      )}
    >
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
