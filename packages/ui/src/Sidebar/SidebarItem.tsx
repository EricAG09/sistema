import React from 'react';
import { useSidebarContext } from './SidebarContext';
import styles from './Sidebar.module.css';

export interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  badge?: React.ReactNode;
}

export function SidebarItem({
  label,
  icon,
  active = false,
  href,
  onClick,
  disabled = false,
  badge
}: SidebarItemProps) {
  const { collapsed } = useSidebarContext();

  const content = (
    <>
      {icon != null && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      {!collapsed && <span className={styles.itemLabel}>{label}</span>}
      {!collapsed && badge != null && <span className={styles.itemBadge}>{badge}</span>}
    </>
  );

  const commonProps = {
    className: styles.item,
    'data-active': active,
    title: collapsed ? label : undefined,
    'aria-label': collapsed ? label : undefined
  };

  if (href && !disabled) {
    return (
      <a
        {...commonProps}
        href={href}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
      >
        {content}
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
      {content}
    </button>
  );
}
