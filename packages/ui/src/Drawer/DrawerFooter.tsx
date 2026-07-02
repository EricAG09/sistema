import React from 'react';
import styles from './Drawer.module.css';

export interface DrawerFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'between';
}

export function DrawerFooter({ children, align = 'left' }: DrawerFooterProps): JSX.Element {
  return (
    <div className={styles.footer} data-align={align}>
      {children}
    </div>
  );
}
