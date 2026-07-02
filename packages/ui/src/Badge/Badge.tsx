import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
}: BadgeProps): JSX.Element {
  if (dot) {
    return (
      <span
        className={[styles.dot, className].filter(Boolean).join(' ')}
        data-variant={variant}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={[styles.badge, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </span>
  );
}
