"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { GlassCard } from "@/components/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Brain, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Header } from "@/components/layout/header";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("User session:", session);

  return (
    <>
      <div className="w-full px-7 py-4">
        <Header />
      </div>
      <div className="grid grid-cols-[240px_1fr_300px] gap-6 p-6 h-screen">
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </>
  );
}
