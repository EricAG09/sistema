import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarActionsProps {
  children: React.ReactNode;
}

export function NavbarActions({ children }: NavbarActionsProps) {
  return <div className={styles.actions}>{children}</div>;
}
