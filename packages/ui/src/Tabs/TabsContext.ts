import { createContext, useContext } from 'react';

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (v: string) => void;
  orientation: 'horizontal' | 'vertical';
}

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs subcomponents must be used within Tabs');
  return ctx;
}
