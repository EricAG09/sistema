import { createContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
