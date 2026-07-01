import { useState } from 'react';

export function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);
  return {
    value,
    setValue,
    toggle: () => setValue((prev) => !prev)
  };
}
