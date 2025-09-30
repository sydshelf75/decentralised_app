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

export default function Home() {
  return (
    <>
      <div className="w-full px-7 py-4">
        <Header />
      </div>
      <div className="grid grid-cols-[240px_1fr_300px] gap-6 p-6 h-screen">
        <Sidebar />
        <MainContent>
          <>
            {/* Knowledge Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <GlassCard className="p-4 text-center">
                <Brain className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">45.2K</div>
                <div className="text-sm text-gray-400">AI Summaries</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12.8K</div>
                <div className="text-sm text-gray-400">Expert Answers</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98.5%</div>
                <div className="text-sm text-gray-400">Verified</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.4M</div>
                <div className="text-sm text-gray-400">Trust Tokens</div>
              </GlassCard>
            </div>

            {/* Featured Knowledge Section */}
            <section>
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">🔥 Trending Knowledge</h2>
                <div className="space-y-6">
                  <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-300">
                        <Brain className="w-3 h-3 mr-1" />
                        AI Summary
                      </Badge>
                      <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3">How to build real-time WebSocket connections with React?</h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                        <div>
                          <div className="text-gray-300 mb-1">
                            <strong>AI Summary:</strong> Use socket.io-client with React hooks for connection management...
                          </div>
                          <div className="text-sm text-gray-500">Generated in 0.8s • Confidence: 92%</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <div className="text-gray-300 mb-1">
                            <strong>Expert Answer:</strong> @reactdev_mike explains advanced error handling patterns...
                          </div>
                          <div className="text-sm text-gray-500">Trust Score: 850 TT • 3 peer validations</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">👍 124 • 💬 23 • 🔄 45</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-full">
                          View Layers
                        </Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 rounded-full">
                          <span className="material-icons text-base mr-1">monetization_on</span>
                          Earn TT
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Knowledge Feed */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Communities</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-gray-300">
                    Latest
                  </Badge>
                  <Badge variant="outline" className="text-gray-300">
                    Trending
                  </Badge>
                  <Badge variant="outline" className="text-gray-300">
                    Your Topics
                  </Badge>
                </div>
              </div>

              <CommunitiesList />
            </section>
          </>
        </MainContent>
        <RightSidebar />
      </div>
    </>
  );
}

function CommunitiesList() {
  const {
    data: communities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: () => apiClient.getCommunities(),
  });

  if (isLoading) {
    return <div className="text-white">Loading communities...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error loading communities.</div>;
  }

  return (
    <div className="space-y-4">
      {communities?.map((community: any) => (
        <GlassCard key={community.id} className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
              {community.name}
            </Badge>
            <Badge variant="secondary" className="bg-orange-600/20 text-orange-300">
              {community.description}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-white mb-3">{community.name}</h3>

          <div className="text-gray-300 mb-4">{community.description}</div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>👥 {community.memberCount || 0} members</span>
            </div>
            <Button variant="secondary" size="sm" className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full">
              View Community
            </Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
