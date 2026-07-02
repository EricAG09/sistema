import React from 'react';
import styles from './Drawer.module.css';

export interface DrawerBodyProps {
  children: React.ReactNode;
}

export function DrawerBody({ children }: DrawerBodyProps): JSX.Element {
  return <div className={styles.body}>{children}</div>;
}
