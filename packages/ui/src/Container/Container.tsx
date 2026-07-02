import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
  as?: React.ElementType;
  className?: string;
}

export function Container({
  children,
  maxWidth = 'lg',
  padding = true,
  center = true,
  as: Component = 'div',
  className,
}: ContainerProps) {
  return (
    <Component
      className={[styles.container, className].filter(Boolean).join(' ')}
      data-max-width={maxWidth}
      data-padding={padding}
      data-center={center}
    >
      {children}
    </Component>
  );
}
