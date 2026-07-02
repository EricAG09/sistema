import React from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  alt?: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  alt,
  className,
}: AvatarProps): JSX.Element {
  const [imgError, setImgError] = React.useState(false);
  const initials = name ? getInitials(name) : '?';
  const showImage = src && !imgError;

  return (
    <span
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      data-size={size}
      data-shape={shape}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials} aria-label={name} role="img">
          {initials}
        </span>
      )}
      {status && (
        <span
          className={styles.status}
          data-status={status}
          aria-label={status}
        />
      )}
    </span>
  );
}
