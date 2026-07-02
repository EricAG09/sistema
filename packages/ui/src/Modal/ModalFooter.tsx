import React from 'react';
import styles from './Modal.module.css';

export interface ModalFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center' | 'between';
}

export function ModalFooter({ children, align = 'right' }: ModalFooterProps): JSX.Element {
  return (
    <div className={styles.footer} data-align={align}>
      {children}
    </div>
  );
}
