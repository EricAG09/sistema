import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  as?: React.ElementType;
}

export function Card({
  children,
  shadow = 'sm',
  hoverable = false,
  bordered = true,
  padding = 'none',
  as: Component = 'div',
  className,
}: CardProps): JSX.Element {
  return (
    <Component
      className={[styles.card, className].filter(Boolean).join(' ')}
      data-shadow={shadow}
      data-hoverable={hoverable}
      data-bordered={bordered}
      data-padding={padding}
    >
      {children}
    </Component>
  );
}
