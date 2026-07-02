import React from 'react';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.css';

export interface TabsTabProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function TabsTab({ value, children, disabled }: TabsTabProps): JSX.Element {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      className={styles.tab}
      data-active={isActive}
      disabled={disabled}
      onClick={() => {
        if (!disabled) setActiveTab(value);
      }}
      tabIndex={isActive ? 0 : -1}
      type="button"
    >
      {children}
    </button>
  );
}
