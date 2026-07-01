import React from 'react';
import { useSidebarContext } from './SidebarContext';
import styles from './Sidebar.module.css';

export interface SidebarGroupProps {
  label?: string;
  children: React.ReactNode;
}

export function SidebarGroup({ label, children }: SidebarGroupProps) {
  const { collapsed } = useSidebarContext();
  return (
    <div className={styles.group} role="group" aria-label={label}>
      {label && !collapsed && <div className={styles.groupLabel}>{label}</div>}
      {label && collapsed && <div className={styles.groupDivider} aria-hidden="true" />}
      {children}
    </div>
  );
}
