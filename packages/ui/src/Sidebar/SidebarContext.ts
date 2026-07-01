import { createContext, useContext } from 'react';

export interface SidebarContextValue {
  collapsed: boolean;
  variant: 'dark' | 'light';
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('Sidebar subcomponents must be used within <Sidebar>');
  }
  return ctx;
}
