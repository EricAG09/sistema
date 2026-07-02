import React from 'react';
import styles from './Card.module.css';

export interface CardFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'between' | 'center';
  className?: string;
}

export function CardFooter({
  children,
  align = 'left',
  className,
}: CardFooterProps): JSX.Element {
  return (
    <div
      className={[styles.footer, className].filter(Boolean).join(' ')}
      data-align={align}
    >
      {children}
    </div>
  );
}
