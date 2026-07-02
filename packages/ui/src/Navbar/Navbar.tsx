import React, { useMemo } from 'react';
import { NavbarContext } from './NavbarContext';
import styles from './Navbar.module.css';

export interface NavbarProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  sticky?: boolean;
  elevated?: boolean;
  'aria-label'?: string;
}

export function Navbar({
  children,
  variant = 'dark',
  sticky = false,
  elevated = false,
  'aria-label': ariaLabel,
}: NavbarProps) {
  const ctx = useMemo(() => ({ variant }), [variant]);

  return (
    <NavbarContext.Provider value={ctx}>
      <header
        aria-label={ariaLabel}
        className={styles.navbar}
        data-variant={variant}
        data-sticky={sticky}
        data-elevated={elevated}
      >
        {children}
      </header>
    </NavbarContext.Provider>
  );
}
