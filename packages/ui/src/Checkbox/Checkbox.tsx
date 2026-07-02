import React, { useId, useRef, useEffect } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  error,
  helperText,
  indeterminate = false,
  disabled,
  id: idProp,
  ...rest
}: CheckboxProps): JSX.Element {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const ref = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);
  const descId = (error || helperText) ? `${id}-desc` : undefined;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div
      className={styles.field}
      data-disabled={disabled}
      data-error={hasError}
    >
      <label className={styles.label} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={descId}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true" />
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
      {(error || helperText) && (
        <p id={descId} className={styles.helperText} data-error={hasError}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
