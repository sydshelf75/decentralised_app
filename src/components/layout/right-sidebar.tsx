"use client";

import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Award, Users } from "lucide-react";

const expertCommunities = [
  { name: "AI Safety Researchers", members: "2.4K", category: "AI/ML" },
  { name: "Blockchain Architects", members: "1.8K", category: "Web3" },
  { name: "Smart Contract Auditors", members: "945", category: "Security" },
  { name: "DeFi Protocol Builders", members: "1.2K", category: "DeFi" },
];

const topValidators = [
  {
    rank: 1,
    name: "CryptoSage",
    trustTokens: "12,840 TT",
    specialty: "Blockchain Security",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pDE-bOBINwBCfkLlh56ccyytjh9LNcqiKj8BVeKF2TaiWI9I0t80Dlogml0BG9kYl4jpepHYrUWX6EClfpCUmn2P7ilOoXjvVeQnU5UlrMzZcpLGGtrVhMJOD-GU3VRR4sHpWJ4DDlwhQY3eT71wgElPb8ODYsghRS2Enq8dkBm8tJvkl99Fs2aUncgiCNSmFxKdI45TLJ4kTmnzjcKcI37g0DrPzSgymF-6bYPGicWkcwwDlLyaYIRPXI-ZU7BkYRPDc_yrX_DQ",
  },
  {
    rank: 2,
    name: "AIExpert_Jane",
    trustTokens: "11,250 TT",
    specialty: "Machine Learning",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi9nzhBHuecGkx-pswdLlWpOz4BduFuTjt6op_RTOTVKNM7Y9WzNKWfsJmD06HGYFQJlSA4E5DPmQdcLhQ2C2s1qDXhdNx-z6Dl0gUcxT_2EJKObnYvUQYlEVzyTPYQdvxudBLQnTQZOsw40mnnCU_DAD80sinWZRJBrv1V4_YcPaqNubc8BDihY2pgiRqbCySNCpo4X3hcC_JyUToTdmE5Lb7tzEjeLGilO0UoE5p57rOD90NrSN52cEBTONqZa0JcZW2Gy0SFooU",
  },
  {
    rank: 3,
    name: "Web3Builder",
    trustTokens: "9,975 TT",
    specialty: "DApp Development",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeB8-ao4ky9e_bTcXo_h6Gs1zM3SukLA0bxmxnZvEv-kG0sK0_hONBBcdFnRgc3l2wjfOByODcfYes8OMpf-eEgbbLmsbFSUzpIV2dhl1SQMVhTjguhJVpIo31N_3Ri6oVnbThxk8o1bTyZayRZaWL28K1UVPkEUx7Pw8lVct7_UnsJ852aZfAmjTxlu3CNUPLWrvLdVs1lJsZgTU9JOkP6MhHyISXgzEJhB_wCiEpJl_AANshLyDHg0AlTBoLx2fTSRjuOM1yZ2M8",
  },
];

const recentValidations = [
  {
    question: "How to optimize gas fees in Ethereum?",
    reward: "+25 TT",
    time: "2m ago",
  },
  {
    question: "Best practices for NFT metadata?",
    reward: "+18 TT",
    time: "15m ago",
  },
  {
    question: "Implementing Layer 2 solutions",
    reward: "+32 TT",
    time: "1h ago",
  },
];

export function RightSidebar() {
  return (
    <aside className="w-75 flex flex-col gap-6">
      {/* Expert Communities */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Expert Communities</h3>
        </div>
        <div className="space-y-3">
          {expertCommunities.map((community) => (
            <div
              key={community.name}
              className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-300 text-sm">
                  {community.name}
                </div>
                <div className="text-xs text-gray-500">
                  {community.members} members • {community.category}
                </div>
              </div>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-full px-3 py-1"
              >
                Join
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-transparent"
        >
          Explore more communities
        </Button>
      </GlassCard>

      {/* Top Validators Leaderboard */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">Top Validators</h3>
        </div>
        <div className="space-y-4">
          {topValidators.map((validator) => (
            <div key={validator.rank} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-gray-900 font-bold text-sm">
                {validator.rank}
              </div>
              <Avatar className="w-10 h-10">
                <img
                  src={validator.avatar}
                  alt="Validator avatar"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback>{validator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">
                  {validator.name}
                </p>
                <p className="text-xs text-yellow-400">
                  {validator.trustTokens}
                </p>
                <p className="text-xs text-gray-500">{validator.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Recent Validation Activity */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {recentValidations.map((validation, index) => (
            <div
              key={index}
              className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg"
            >
              <div className="text-sm text-gray-300 mb-1">
                {validation.question}
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-400 font-semibold">
                  {validation.reward}
                </span>
                <span className="text-gray-500">{validation.time}</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 text-sm font-semibold border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
        >
          Start Validating
        </Button>
      </GlassCard>
    </aside>
  );
}
