import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'current';
  label?: string;
  className?: string;
}

export function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Carregando...',
  className,
}: SpinnerProps): JSX.Element {
  return (
    <span
      role="status"
      className={[styles.spinner, className].filter(Boolean).join(' ')}
      data-size={size}
      data-color={color}
      aria-label={label}
    >
      <span className={styles.sr}>{label}</span>
    </span>
  );
}
