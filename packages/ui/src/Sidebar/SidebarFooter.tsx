import React from 'react';
import styles from './Sidebar.module.css';

export interface SidebarFooterProps {
  children: React.ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}
