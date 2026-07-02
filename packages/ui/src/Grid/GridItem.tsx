import React from 'react';

export interface GridItemProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

export function GridItem({ children, colSpan, className }: GridItemProps) {
  return (
    <div
      className={className}
      data-col-span={colSpan}
      style={{ gridColumn: colSpan ? `span ${colSpan}` : undefined }}
    >
      {children}
    </div>
  );
}
