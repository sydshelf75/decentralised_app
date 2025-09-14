"use client";

import { GlassCard } from "@/components/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Brain, Users, CheckCircle, TrendingUp } from "lucide-react";

export function MainContent({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      {/* Enhanced Search Bar */}
      <div className="sticky top-0 z-10 py-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="w-full bg-gray-800 border-gray-700 rounded-full py-4 pl-12 pr-4 text-gray-200 placeholder-gray-400 focus:ring-indigo-500 text-lg"
            placeholder="Ask anything... AI + Human experts will answer"
          />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 rounded-full px-6">
            Ask
          </Button>
        </div>
      </div>

      {children ? (
        children
      ) : (
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
              <h2 className="text-2xl font-bold text-white mb-4">
                🔥 Trending Knowledge
              </h2>
              <div className="space-y-6">
                <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-600/20 text-indigo-300"
                    >
                      <Brain className="w-3 h-3 mr-1" />
                      AI Summary
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-600/20 text-green-300"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    How to build real-time WebSocket connections with React?
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <div>
                        <div className="text-gray-300 mb-1">
                          <strong>AI Summary:</strong> Use socket.io-client with
                          React hooks for connection management...
                        </div>
                        <div className="text-sm text-gray-500">
                          Generated in 0.8s • Confidence: 92%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="text-gray-300 mb-1">
                          <strong>Expert Answer:</strong> @reactdev_mike explains
                          advanced error handling patterns...
                        </div>
                        <div className="text-sm text-gray-500">
                          Trust Score: 850 TT • 3 peer validations
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        👍 124 • 💬 23 • 🔄 45
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        View Layers
                      </Button>
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-500 rounded-full"
                      >
                        <span className="material-icons text-base mr-1">
                          monetization_on
                        </span>
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
              <h2 className="text-2xl font-bold text-white">
                Knowledge Feed
              </h2>
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

            <div className="space-y-4">
              {[1, 2].map((index) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300"
                    >
                      Web3
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-600/20 text-orange-300"
                    >
                      Development
                    </Badge>
                    {index === 1 && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-600/20 text-yellow-300"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {index === 1
                      ? "Best practices for smart contract security auditing?"
                      : "How to implement zkSNARKs in Ethereum applications?"}
                  </h3>

                  <div className="text-gray-300 mb-4">
                    {index === 1
                      ? "Looking for comprehensive guidelines on auditing Solidity contracts..."
                      : "Need help understanding zero-knowledge proofs implementation..."}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>🧠 2 AI responses</span>
                      <span>👥 5 expert answers</span>
                      <span>✅ 12 validations</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full"
                    >
                      View Knowledge
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
