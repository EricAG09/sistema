import React from 'react';
import styles from './Card.module.css';

export interface CardBodyProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function CardBody({
  children,
  padding,
  className,
}: CardBodyProps): JSX.Element {
  return (
    <div
      className={[styles.body, className].filter(Boolean).join(' ')}
      data-padding={padding}
    >
      {children}
    </div>
  );
}
