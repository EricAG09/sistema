import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarItemsProps {
  children: React.ReactNode;
}

export function NavbarItems({ children }: NavbarItemsProps) {
  return <nav className={styles.items}>{children}</nav>;
}
