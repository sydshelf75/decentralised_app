"use client";

import { GlassCard } from "@/components/glass-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Brain, Users, TrendingUp, BookOpen, Zap, Settings, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Brain, label: "Knowledge Feed", href: "/" },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: Users, label: "Expert Network", href: "/experts" },
  { icon: BookOpen, label: "My Learning", href: "/learning" },
  { icon: Zap, label: "Validate & Earn", href: "/validate" },
  { icon: Newspaper, label: "Community", href: "/community" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const knowledgeCategories = [
  { name: "Web3 Development", count: "2.4K", color: "bg-indigo-500" },
  { name: "AI & Machine Learning", count: "1.8K", color: "bg-purple-500" },
  { name: "Blockchain Security", count: "945", color: "bg-red-500" },
  { name: "DeFi Protocols", count: "1.2K", color: "bg-green-500" },
  { name: "Smart Contracts", count: "867", color: "bg-yellow-500" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60">
      <GlassCard className="p-6 h-full flex flex-col">
        {/* Logo */}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mb-8">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all
              ${isActive ? "text-white bg-gradient-to-r from-indigo-600/50 to-purple-600/30 border border-indigo-500/30" : "text-gray-400 hover:bg-gray-700/30 hover:text-white"}`}
              >
                <IconComponent className="w-5 h-5" />
                <span className={isActive ? "font-semibold" : "font-medium"}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Knowledge Categories */}
        <div className="flex-1">
          <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
          <div className="flex flex-col gap-2">
            {knowledgeCategories.map((category) => (
              <Link key={category.name} href="#" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white rounded-lg transition-colors group">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <div className="flex-1">
                  <span className="font-medium text-sm group-hover:text-white">{category.name}</span>
                  <div className="text-xs text-gray-500">{category.count} questions</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Score */}
        <div className="mt-4 p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Your Trust Score</span>
            <Badge variant="secondary" className="bg-indigo-600/30 text-indigo-300">
              Expert
            </Badge>
          </div>
          <div className="text-2xl font-bold text-white">1,247 TT</div>
          <div className="text-xs text-gray-400">+45 this week</div>
        </div>
      </GlassCard>
    </aside>
  );
}
