"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps as ProviderProps } from "next-themes/dist/types";

export function Providers({ children, ...props }: ProviderProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
