import React, { useId } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export function Textarea({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  disabled,
  required,
  rows = 4,
  id: idProp,
  className,
  style,
  ...rest
}: TextareaProps): JSX.Element {
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
      <textarea
        id={id}
        className={styles.textarea}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={descId}
        style={{ resize, ...style }}
        {...rest}
      />
      {(error || helperText) && (
        <p id={descId} className={styles.helperText} data-error={hasError}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
