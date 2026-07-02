import React, { useId, useContext } from 'react';
import styles from './Radio.module.css';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Radio({
  label,
  helperText,
  error,
  disabled,
  id: idProp,
  name: nameProp,
  ...rest
}: RadioProps): JSX.Element {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(error);
  const descId = (error || helperText) ? `${id}-desc` : undefined;

  const groupCtx = useContext(RadioGroupContext);
  const name = groupCtx?.name ?? nameProp;
  const groupDisabled = groupCtx?.disabled ?? false;
  const isDisabled = disabled || groupDisabled;

  return (
    <div
      className={styles.field}
      data-disabled={isDisabled}
      data-error={hasError}
    >
      <label className={styles.label} htmlFor={id}>
        <input
          type="radio"
          id={id}
          name={name}
          className={styles.input}
          disabled={isDisabled}
          aria-invalid={hasError}
          aria-describedby={descId}
          {...rest}
        />
        <span className={styles.circle} aria-hidden="true" />
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
