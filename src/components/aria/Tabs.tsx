import {
  Tab as AriaTab,
  TabList as AriaTabList,
  type TabListProps as AriaTabListProps,
  TabPanel as AriaTabPanel,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  Tabs as AriaTabs,
  type TabsProps as AriaTabsProps,
} from 'react-aria-components';
import { tv } from '@/lib/tv';

const tabsStyles = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row gap-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const tabListStyles = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: 'flex-row border-b border-main',
      vertical: 'flex-col border-r border-main',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const tabStyles = tv({
  base: [
    'cursor-default px-4 py-2 text-sm font-medium',
    'outline-none',
    '-mb-px border-b-2 border-transparent',
    'text-muted transition-colors duration-150',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset',
    'hover:text-body',
    'selected:text-primary selected:border-primary',
    'disabled:cursor-not-allowed disabled:text-disabled',
  ],
});

const tabPanelStyles = tv({
  base: [
    'pt-4 outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring',
  ],
});

export type TabsProps = AriaTabsProps & {
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  className,
  orientation = 'horizontal',
  ...props
}: TabsProps) => {
  return (
    <AriaTabs
      className={tabsStyles({ orientation, className })}
      orientation={orientation}
      {...props}
    />
  );
};

export type TabListProps<T extends object = object> = AriaTabListProps<T> & {
  className?: string;
};

export function TabList<T extends object = object>({
  className,
  ...props
}: TabListProps<T>) {
  return <AriaTabList className={tabListStyles({ className })} {...props} />;
}

export type TabProps = AriaTabProps & {
  className?: string;
};

export const Tab: React.FC<TabProps> = ({ className, ...props }: TabProps) => {
  return <AriaTab className={tabStyles({ className })} {...props} />;
};

export type TabPanelProps = AriaTabPanelProps & {
  className?: string;
};

export const TabPanel: React.FC<TabPanelProps> = ({
  className,
  ...props
}: TabPanelProps) => {
  return <AriaTabPanel className={tabPanelStyles({ className })} {...props} />;
};
