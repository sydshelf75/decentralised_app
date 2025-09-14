import React from "react";
import LoginForm from "@/components/LoginForm";
import { GlassCard } from "@/components/glass-card";
import { Brain } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <div>
          <span className="text-2xl font-bold text-white">DHKE</span>
          <div className="text-sm text-gray-400">Decentralised Knowledge Engine</div>
        </div>
      </div>
      <GlassCard className="w-full max-w-md p-8">
        <LoginForm />
      </GlassCard>
    </div>
  );
}
