import React, { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import styles from './Toast.module.css';
import type { ToastItem, ToastPosition } from './Toast';

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: Omit<ToastItem, 'id'>) => {
      const id = `toast-${++counterRef.current}`;
      const item: ToastItem = { duration: 5000, variant: 'info', ...options, id };
      setToasts((prev) => [item, ...prev].slice(0, maxToasts));
      if (item.duration && item.duration > 0) {
        setTimeout(() => dismiss(id), item.duration);
      }
    },
    [dismiss, maxToasts],
  );

  const container = (
    <div
      className={styles.container}
      data-position={position}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((item) => (
        <Toast key={item.id} {...item} onDismiss={() => dismiss(item.id)} />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof document !== 'undefined' && createPortal(container, document.body)}
    </ToastContext.Provider>
  );
}
