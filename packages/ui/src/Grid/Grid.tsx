import React from 'react';
import styles from './Grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  as?: React.ElementType;
}

export function Grid({
  children,
  cols = 1,
  gap = 'md',
  align = 'stretch',
  className,
  as: Component = 'div',
}: GridProps) {
  return (
    <Component
      className={[styles.grid, className].filter(Boolean).join(' ')}
      data-cols={cols}
      data-gap={gap}
      data-align={align}
    >
      {children}
    </Component>
  );
}
