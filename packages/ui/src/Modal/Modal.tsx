import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function Modal({
  open,
  onClose,
  children,
  size = 'md',
  closeOnOverlay = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ModalProps): JSX.Element | null {
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

  const dialog = (
    <div
      className={styles.overlay}
      onClick={closeOnOverlay ? onClose : undefined}
      aria-modal="true"
      role="presentation"
    >
      <div
        role="dialog"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={styles.modal}
        data-size={size}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(dialog, document.body) : null;
}
