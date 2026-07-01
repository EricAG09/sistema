export const colors = {
  primary: '#FF5B00',
  secondary: '#3C58B4',
  success: '#16a34a',
  error: '#dc2626',
  warning: '#f59e0b',
  info: '#0284c7',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#05244F',
  muted: '#6b7280'
} as const;

export const typography = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSizeBase: '1rem',
  fontSizeSmall: '0.875rem',
  fontSizeLarge: '1.125rem',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700
} as const;

export const spacing = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
} as const;

export const radius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  pill: '9999px'
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
  md: '0 4px 12px rgba(15, 23, 42, 0.08)',
  lg: '0 10px 30px rgba(15, 23, 42, 0.12)'
} as const;

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const;

export const zIndex = {
  dropdown: 1000,
  modal: 1100,
  popover: 1050,
  tooltip: 1200,
  toast: 1300
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms'
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)'
  }
} as const;

export const grid = {
  gutter: '1rem',
  columns: 12
} as const;

export const sizes = {
  icon: '1.5rem',
  inputHeight: '2.5rem',
  buttonHeight: '2.75rem'
} as const;

export const iconSizes = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.75rem'
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  zIndex,
  animation,
  grid,
  sizes,
  iconSizes
};

export type Tokens = typeof tokens;
