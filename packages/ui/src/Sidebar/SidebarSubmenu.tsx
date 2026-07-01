import React, { useCallback, useId, useState } from 'react';
import { useSidebarContext } from './SidebarContext';
import styles from './Sidebar.module.css';

export interface SidebarSubmenuProps {
  label: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function SidebarSubmenu({
  label,
  icon,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children
}: SidebarSubmenuProps) {
  const { collapsed } = useSidebarContext();
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const panelId = useId();

  const toggle = useCallback(() => {
    const next = !open;
    if (openProp === undefined) {
      setOpenState(next);
    }
    onOpenChange?.(next);
  }, [open, openProp, onOpenChange]);

  return (
    <div className={styles.submenu} data-open={open}>
      <button
        type="button"
        className={styles.item}
        aria-expanded={open}
        aria-controls={panelId}
        title={collapsed ? label : undefined}
        aria-label={collapsed ? label : undefined}
        onClick={toggle}
      >
        {icon != null && (
          <span className={styles.itemIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        {!collapsed && <span className={styles.itemLabel}>{label}</span>}
      </button>
      {open && (
        <div id={panelId} className={styles.submenuPanel}>
          {children}
        </div>
      )}
    </div>
  );
}
