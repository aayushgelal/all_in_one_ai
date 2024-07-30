// providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export function Providers({ children}: { children: React.ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>;
}