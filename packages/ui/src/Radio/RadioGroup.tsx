import React from 'react';
import styles from './Radio.module.css';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  name: string;
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

export function RadioGroup({
  children,
  label,
  error,
  name,
  orientation = 'vertical',
  disabled,
}: RadioGroupProps): JSX.Element {
  const hasError = Boolean(error);

  return (
    <RadioGroupContext.Provider value={{ name, disabled }}>
      <fieldset
        className={styles.group}
        data-orientation={orientation}
        data-error={hasError}
        disabled={disabled}
      >
        {label && (
          <legend className={styles.groupLegend}>{label}</legend>
        )}
        <div className={styles.groupItems} data-orientation={orientation}>
          {children}
        </div>
        {error && (
          <p className={styles.groupError} role="alert">
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
