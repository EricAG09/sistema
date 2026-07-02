import React from 'react';
import styles from './Card.module.css';

export interface CardHeaderProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function CardHeader({
  children,
  title,
  subtitle,
  actions,
  className,
}: CardHeaderProps): JSX.Element {
  if (title !== undefined) {
    return (
      <div className={[styles.header, className].filter(Boolean).join(' ')}>
        <div className={styles.headerText}>
          <p className={styles.headerTitle}>{title}</p>
          {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.headerActions}>{actions}</div>}
      </div>
    );
  }

  return (
    <div className={[styles.header, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
