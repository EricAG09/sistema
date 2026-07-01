import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeConfig } from '@nexus-ui/types';
import { tokens } from '@nexus-ui/tokens';

export type NexusTheme = ThemeConfig;

export const defaultTheme: NexusTheme = {
  branding: {
    name: 'Nexus UI',
    logoUrl: undefined,
    faviconUrl: undefined
  },
  mode: 'light',
  colors: {
    ...tokens.colors,
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#05244F',
    muted: '#6b7280'
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '1rem',
    fontSizeLarge: '1.125rem',
    fontSizeSmall: '0.875rem',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },
  shape: {
    borderRadius: tokens.radius.md,
    borderRadiusLarge: tokens.radius.lg
  },
  shadows: tokens.shadows,
  spacing: tokens.spacing
};

export interface ThemeContextValue {
  theme: NexusTheme;
  setTheme: (theme: NexusTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren<{ initialTheme?: NexusTheme }>> = ({
  children,
  initialTheme = defaultTheme
}) => {
  const [theme, setTheme] = useState<NexusTheme>(initialTheme);

  const value = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function themeToCssVariables(theme: NexusTheme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-success': theme.colors.success,
    '--color-error': theme.colors.error,
    '--color-warning': theme.colors.warning,
    '--color-info': theme.colors.info,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-muted': theme.colors.muted,
    '--font-family': theme.typography.fontFamily,
    '--font-size': theme.typography.fontSize,
    '--font-size-large': theme.typography.fontSizeLarge,
    '--font-size-small': theme.typography.fontSizeSmall,
    '--font-weight-regular': theme.typography.fontWeightRegular.toString(),
    '--font-weight-medium': theme.typography.fontWeightMedium.toString(),
    '--font-weight-bold': theme.typography.fontWeightBold.toString(),
    '--radius-sm': tokens.radius.sm,
    '--radius-md': tokens.radius.md,
    '--radius-lg': tokens.radius.lg,
    '--shadow-sm': theme.shadows.sm,
    '--shadow-md': theme.shadows.md,
    '--shadow-lg': theme.shadows.lg,
    '--spacing-xxs': theme.spacing.xxs,
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
    '--anim-duration': tokens.animation.duration.normal,
    '--anim-easing': tokens.animation.easing.standard,
    '--sidebar-bg': '#05244F',
    '--sidebar-fg': '#ffffff',
    '--sidebar-muted': 'rgba(255,255,255,0.62)',
    '--sidebar-active-bg': theme.colors.primary,
    '--sidebar-active-fg': '#ffffff',
    '--sidebar-hover-bg': 'rgba(255,255,255,0.08)',
    '--sidebar-border': 'rgba(255,255,255,0.12)',
    '--sidebar-overlay-bg': 'rgba(5, 36, 79, 0.5)'
  };
}
