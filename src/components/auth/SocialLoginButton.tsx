// components/auth/SocialLoginButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SocialLoginButton({ provider, icon: Icon, label }: any) {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={() => signIn(provider)}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Button>
  );
}
