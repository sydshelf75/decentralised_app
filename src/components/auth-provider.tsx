"use client";

import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";

export function AuthProvider({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
}
