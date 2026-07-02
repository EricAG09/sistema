import React, { useCallback, useState } from 'react';
import { TabsContext } from './TabsContext';
import styles from './Tabs.module.css';

export interface TabsProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function Tabs({
  children,
  value: valueProp,
  defaultValue = '',
  onChange,
  orientation = 'horizontal',
}: TabsProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = valueProp ?? internalValue;

  const setActiveTab = useCallback(
    (v: string) => {
      if (valueProp === undefined) setInternalValue(v);
      onChange?.(v);
    },
    [valueProp, onChange],
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, orientation }}>
      <div className={styles.tabs} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
