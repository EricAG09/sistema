import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'pulse',
  className,
}: SkeletonProps): JSX.Element {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.lines}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={[styles.skeleton, className].filter(Boolean).join(' ')}
            data-variant="text"
            data-animation={animation}
            style={i === lines - 1 ? { ...style, width: '70%' } : style}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-animation={animation}
      style={style}
      aria-hidden="true"
    />
  );
}
