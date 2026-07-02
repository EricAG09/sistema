import React, { useId } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
}

export function Switch({
  label,
  size = 'md',
  helperText,
  disabled,
  id: idProp,
  ...rest
}: SwitchProps): JSX.Element {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = helperText ? `${id}-desc` : undefined;

  return (
    <div className={styles.field} data-disabled={disabled}>
      <label className={styles.label} htmlFor={id}>
        <input
          type="checkbox"
          role="switch"
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-describedby={descId}
          {...rest}
        />
        <span className={styles.track} data-size={size}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {helperText && (
        <p id={descId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}
