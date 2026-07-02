import { createContext, useContext } from 'react';

export interface NavbarContextValue {
  variant: 'dark' | 'light';
}

export const NavbarContext = createContext<NavbarContextValue>({ variant: 'dark' });

export function useNavbarContext(): NavbarContextValue {
  return useContext(NavbarContext);
}
