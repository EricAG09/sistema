import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  spacing = 'none',
  color,
  className,
}: DividerProps): JSX.Element {
  const lineStyle = color ? { background: color } : undefined;

  return (
    <div
      className={[styles.divider, className].filter(Boolean).join(' ')}
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      data-spacing={spacing}
    >
      <span className={styles.line} style={lineStyle} />
      {label && orientation === 'horizontal' && (
        <span className={styles.label}>{label}</span>
      )}
      {label && orientation === 'horizontal' && (
        <span className={styles.line} style={lineStyle} />
      )}
    </div>
  );
}
