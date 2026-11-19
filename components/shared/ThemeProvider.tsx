'use client';

import { useEffect } from 'react';
import { DEFAULT_PRIMARY_COLOR } from '@/lib/constants';
import {
  adjustBrightness,
  getContrastTextColor,
  mixWithWhite,
} from '@/lib/theme';

type ThemeProviderProps = {
  primaryColor?: string;
  children: React.ReactNode;
};

export function ThemeProvider({ primaryColor, children }: ThemeProviderProps) {
  const color = primaryColor || DEFAULT_PRIMARY_COLOR;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', color);
    root.style.setProperty('--color-primary-hover', adjustBrightness(color, -12));
    root.style.setProperty('--color-primary-light', mixWithWhite(color, 0.85));
    root.style.setProperty('--color-primary-foreground', getContrastTextColor(color));
  }, [color]);

  return <>{children}</>;
}
