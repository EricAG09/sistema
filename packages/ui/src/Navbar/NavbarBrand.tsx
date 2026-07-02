import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarBrandProps {
  children: React.ReactNode;
  href?: string;
}

export function NavbarBrand({ children, href }: NavbarBrandProps) {
  if (href) {
    return (
      <a href={href} className={styles.brand}>
        {children}
      </a>
    );
  }

  return <span className={styles.brand}>{children}</span>;
}
