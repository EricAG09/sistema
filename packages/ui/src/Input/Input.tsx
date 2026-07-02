import React, { useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled,
  required,
  fullWidth = false,
  id: idProp,
  className,
  ...rest
}: InputProps): JSX.Element {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(error);
  const descId = (error || helperText) ? `${id}-desc` : undefined;

  return (
    <div
      className={styles.field}
      data-error={hasError}
      data-disabled={disabled}
      data-full-width={fullWidth}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true"> *</span>
          )}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span className={styles.icon} data-position="left">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          className={styles.input}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={descId}
          data-has-left-icon={Boolean(leftIcon)}
          data-has-right-icon={Boolean(rightIcon)}
          {...rest}
        />
        {rightIcon && (
          <span className={styles.icon} data-position="right">
            {rightIcon}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <p id={descId} className={styles.helperText} data-error={hasError}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
