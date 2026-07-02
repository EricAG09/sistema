import React from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastItem {
  id: string;
  message: string;
  variant?: ToastVariant;
  title?: string;
  duration?: number;
}

export interface ToastContextValue {
  toast: (options: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

export interface SingleToastProps extends ToastItem {
  onDismiss?: () => void;
}

export function Toast({
  message,
  title,
  variant = 'info',
  onDismiss,
}: SingleToastProps): JSX.Element {
  return (
    <div role="status" className={styles.toast} data-variant={variant}>
      <div className={styles.toastContent}>
        {title && <p className={styles.toastTitle}>{title}</p>}
        <p className={styles.toastMessage}>{message}</p>
      </div>
      <button
        className={styles.toastDismiss}
        onClick={onDismiss}
        aria-label="Fechar"
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}
