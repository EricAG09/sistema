import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Drawer.module.css';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnOverlay?: boolean;
  'aria-label'?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  size = 'md',
  closeOnOverlay = true,
  'aria-label': ariaLabel,
}: DrawerProps): JSX.Element | null {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = (
    <>
      <div
        className={styles.overlay}
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label={ariaLabel}
        aria-modal="true"
        className={styles.drawer}
        data-side={side}
        data-size={size}
      >
        {children}
      </div>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
