import React from 'react';
import styles from './Alert.module.css';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

function DefaultIcon({ variant }: { variant: string }) {
  if (variant === 'success') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
  if (variant === 'error') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6"/>
    </svg>
  );
  if (variant === 'warning') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m10.29 3.86-8.58 14.86A2 2 0 0 0 3.43 21h17.14a2 2 0 0 0 1.72-3l-8.57-14.86a2 2 0 0 0-3.43 0z"/><path d="M12 9v4m0 4h.01"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
    </svg>
  );
}

export function Alert({
  children,
  variant = 'info',
  title,
  dismissible,
  onDismiss,
  icon,
  className,
}: AlertProps): JSX.Element {
  const displayIcon = icon ?? <DefaultIcon variant={variant} />;
  return (
    <div
      role="alert"
      className={[styles.alert, className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      <span className={styles.icon} aria-hidden="true">{displayIcon}</span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.body}>{children}</div>
      </div>
      {dismissible && (
        <button
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Fechar alerta"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}
