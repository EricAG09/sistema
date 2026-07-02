import React from 'react';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'code'
  | 'label'
  | 'overline';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: 'default' | 'muted' | 'primary' | 'error' | 'success' | 'warning';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  as?: React.ElementType;
  className?: string;
}

const elementMap: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  code: 'code',
  label: 'label',
  overline: 'span',
};

export function Typography({
  variant = 'body',
  as,
  color = 'default',
  weight,
  align,
  truncate,
  children,
  className,
}: TypographyProps): JSX.Element {
  const Component = as ?? elementMap[variant];
  return (
    <Component
      className={[styles.text, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-color={color}
      data-weight={weight}
      data-align={align}
      data-truncate={truncate}
    >
      {children}
    </Component>
  );
}
