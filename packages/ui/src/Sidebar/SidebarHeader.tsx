import React from 'react';
import styles from './Sidebar.module.css';

export interface SidebarHeaderProps {
  children: React.ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className={styles.header}>{children}</div>;
}
