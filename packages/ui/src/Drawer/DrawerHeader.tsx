import React from 'react';
import styles from './Drawer.module.css';

export interface DrawerHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function DrawerHeader({
  children,
  onClose,
  showCloseButton = true,
}: DrawerHeaderProps): JSX.Element {
  return (
    <div className={styles.header}>
      <div style={{ flex: 1, fontWeight: 600, fontSize: '1.125rem', color: 'var(--color-text, #05244F)' }}>
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar painel"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
