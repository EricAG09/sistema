import React, { useId } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

export function Select({
  label,
  options,
  error,
  helperText,
  placeholder,
  fullWidth = false,
  disabled,
  required,
  id: idProp,
  className,
  ...rest
}: SelectProps): JSX.Element {
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
      <div className={styles.selectWrapper}>
        <select
          id={id}
          className={styles.select}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={descId}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} aria-hidden="true">▾</span>
      </div>
      {(error || helperText) && (
        <p id={descId} className={styles.helperText} data-error={hasError}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
