import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SidebarContext } from './SidebarContext';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  /**
   * Reserved for a future collapse toggle. In v1 collapse is fully controlled by
   * the consumer via `collapsed` / `defaultCollapsed`, so this callback is not
   * fired internally yet.
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  variant?: 'dark' | 'light';
  width?: string;
  collapsedWidth?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  'aria-label': string;
}

const MOBILE_QUERY = '(max-width: 768px)';

export function Sidebar({
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  variant = 'dark',
  width = '16rem',
  collapsedWidth = '4rem',
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  'aria-label': ariaLabel
}: SidebarProps) {
  const collapsed = collapsedProp ?? defaultCollapsed;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const [mobileOpenState, setMobileOpenState] = useState(defaultOpen);
  const mobileOpen = openProp ?? mobileOpenState;
  const setMobileOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) {
        setMobileOpenState(next);
      }
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  const ctx = useMemo(
    () => ({ collapsed, variant, isMobile, mobileOpen, setMobileOpen }),
    [collapsed, variant, isMobile, mobileOpen, setMobileOpen]
  );

  useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobile, mobileOpen, setMobileOpen]);

  const style = {
    ['--sidebar-width' as string]: collapsed ? collapsedWidth : width
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={ctx}>
      {isMobile && mobileOpen && (
        <div
          data-testid="sidebar-overlay"
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        aria-label={ariaLabel}
        className={styles.sidebar}
        data-collapsed={collapsed}
        data-variant={variant}
        data-mobile={isMobile}
        data-open={mobileOpen}
        style={style}
      >
        {children}
      </nav>
    </SidebarContext.Provider>
  );
}
