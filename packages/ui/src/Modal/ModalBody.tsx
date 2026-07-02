import React from 'react';
import styles from './Modal.module.css';

export interface ModalBodyProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export function ModalBody({ children, scrollable = true }: ModalBodyProps): JSX.Element {
  return (
    <div
      className={styles.body}
      style={scrollable ? undefined : { overflowY: 'visible' }}
    >
      {children}
    </div>
  );
}
