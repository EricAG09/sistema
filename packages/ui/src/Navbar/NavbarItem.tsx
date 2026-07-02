import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarItemProps {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export function NavbarItem({
  label,
  href,
  active = false,
  onClick,
  disabled = false,
}: NavbarItemProps) {
  const commonProps = {
    className: styles.item,
    'data-active': active,
  };

  if (href && !disabled) {
    return (
      <a
        {...commonProps}
        href={href}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      type="button"
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
