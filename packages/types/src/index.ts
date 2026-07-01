export type ThemeMode = 'light' | 'dark';

export interface ThemeBranding {
  logoUrl?: string;
  faviconUrl?: string;
  name: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: string;
  fontSizeLarge: string;
  fontSizeSmall: string;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
}

export interface ThemeShape {
  borderRadius: string;
  borderRadiusLarge: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface ThemeSpacing {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeConfig {
  branding: ThemeBranding;
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  shape: ThemeShape;
  shadows: ThemeShadows;
  spacing: ThemeSpacing;
}
