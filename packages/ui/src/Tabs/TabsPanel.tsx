import React from 'react';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.css';

export interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsPanel({ value, children, className }: TabsPanelProps): JSX.Element | null {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={[styles.panel, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
