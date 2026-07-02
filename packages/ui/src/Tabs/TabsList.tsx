import React from 'react';
import styles from './Tabs.module.css';

export interface TabsListProps {
  children: React.ReactNode;
}

export function TabsList({ children }: TabsListProps): JSX.Element {
  return (
    <div role="tablist" className={styles.list}>
      {children}
    </div>
  );
}
