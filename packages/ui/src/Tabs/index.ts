import { Tabs as TabsRoot } from './Tabs';
import { TabsList } from './TabsList';
import { TabsTab } from './TabsTab';
import { TabsPanel } from './TabsPanel';

type TabsComponent = typeof TabsRoot & {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
};

const Tabs = TabsRoot as TabsComponent;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

export { Tabs };
export type { TabsProps } from './Tabs';
export type { TabsListProps } from './TabsList';
export type { TabsTabProps } from './TabsTab';
export type { TabsPanelProps } from './TabsPanel';
export { useTabsContext } from './TabsContext';
