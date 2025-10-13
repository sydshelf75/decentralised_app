"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, User, MessageSquare, Loader2, Users, TrendingUp } from "lucide-react";

interface KnowledgePost {
  id: string;
  question: string;
  answer: string;
  type: "AI" | "EXPERT";
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
  confidence?: number;
  trustScore?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

interface KnowledgeStats {
  aiSummaries: number;
  expertAnswers: number;
  verifiedPercentage: number;
  trustTokens: number;
}

export function MainContent() {
  const [knowledgePosts, setKnowledgePosts] = useState<KnowledgePost[]>([]);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch knowledge posts
        const postsResponse = await fetch("/api/knowledge-posts");

        if (!postsResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
        }

        const postsData = await postsResponse.json();
        setKnowledgePosts(postsData);

        // Fetch knowledge stats (you might want to create this API endpoint)
        try {
          const statsResponse = await fetch("/api/knowledge-stats");
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setKnowledgeStats(statsData);
          }
        } catch (statsError) {
          console.log("Stats endpoint not available, using default values");
        }
      } catch (err) {
        console.error("Error fetching knowledge data:", err);
        setError("Failed to load knowledge data");
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeData();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
        <div className="flex justify-center items-center h-40 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading knowledge hub...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
        <GlassCard className="p-6 text-center">
          <div className="text-red-400 mb-2">{error}</div>
          <Button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      {/* Knowledge Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4 text-center">
          <Brain className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{knowledgeStats ? (knowledgeStats.aiSummaries / 1000).toFixed(1) + "K" : "0"}</div>
          <div className="text-sm text-gray-400">AI Summaries</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{knowledgeStats ? (knowledgeStats.expertAnswers / 1000).toFixed(1) + "K" : "0"}</div>
          <div className="text-sm text-gray-400">Expert Answers</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{knowledgeStats ? knowledgeStats.verifiedPercentage + "%" : "0%"}</div>
          <div className="text-sm text-gray-400">Verified</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{knowledgeStats ? (knowledgeStats.trustTokens / 1000000).toFixed(1) + "M" : "0"}</div>
          <div className="text-sm text-gray-400">Trust Tokens</div>
        </GlassCard>
      </div>

      {/* Featured Knowledge Section */}
      <section>
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">🔥 Trending Knowledge</h2>
          {knowledgePosts.length > 0 ? (
            <div className="space-y-6">
              {knowledgePosts.slice(0, 2).map((post) => (
                <div key={post.id} className="p-5 bg-gray-900/50 border border-gray-700 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-300">
                      <Brain className="w-3 h-3 mr-1" />
                      {post.type === "AI" ? "AI Summary" : "Expert Answer"}
                    </Badge>
                    {post.confidence && post.confidence > 90 && (
                      <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{post.question}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${post.type === "AI" ? "bg-indigo-500" : "bg-green-500"}`}></div>
                      <div>
                        <div className="text-gray-300 mb-1">
                          <strong>{post.type === "AI" ? "AI Summary:" : "Expert Answer:"}</strong> {post.answer}
                        </div>
                        <div className="text-sm text-gray-500">{post.type === "AI" ? `Generated in 0.8s • Confidence: ${post.confidence}%` : `Trust Score: ${post.trustScore} TT • 3 peer validations`}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        👍 {post.likes || 0} • 💬 {post.comments || 0} • 🔄 {post.shares || 0}
                      </span>
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
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">No trending knowledge posts available</div>
          )}
        </GlassCard>
      </section>

      {/* Knowledge Feed */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">📚 Knowledge Feed</h2>
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

        {knowledgePosts.length === 0 ? (
          <GlassCard className="p-6 text-center">
            <div className="text-gray-400 italic">No knowledge posts yet. Be the first to share knowledge!</div>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {knowledgePosts.map((post, index) => (
              <GlassCard key={post.id} className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl">
                {/* Question Title - Only show if different from previous */}
                {(index === 0 || post.question !== knowledgePosts[index - 1].question) && <h3 className="text-lg font-semibold text-white mb-4">{post.question}</h3>}

                {/* Message Bubble */}
                <div className={`flex items-start gap-3 ${post.type === "AI" ? "justify-start" : "justify-end"}`}>
                  {post.type === "AI" && (
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[80%] p-4 rounded-2xl ${post.type === "AI" ? "bg-gray-800 text-gray-200 rounded-bl-none" : "bg-indigo-600 text-white rounded-br-none"}`}>
                    <p className="text-sm leading-relaxed">{post.answer}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                      <span>{post.user?.name}</span>
                      <span>{new Date(post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>

                  {post.type === "EXPERT" && (
                    <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="mt-3 flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex gap-3">
                    {post.type === "AI" ? (
                      <span className="flex items-center gap-1 text-indigo-400">
                        <Brain className="w-3 h-3" />
                        AI Summary
                        {post.confidence && <span className="ml-1">• {post.confidence}% confidence</span>}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Expert Insight
                        {post.trustScore && <span className="ml-1">• {post.trustScore} TT</span>}
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-indigo-400 text-xs flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Reply
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
