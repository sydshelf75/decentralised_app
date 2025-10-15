"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Loader2, TrendingUp, Users } from "lucide-react";
import { AnswerContent } from "../AnswerContent";

interface KnowledgePost {
  id: string;
  question?: string;
  title?: string;
  answers?: Answer[];
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

interface Answer {
  id: string;
  knowledgePostId: string;
  userId: string;
  content: string;
  answerType: "AI" | "EXPERT";
  createdAt?: string;
  updatedAt?: string;
  trustScore?: number;
  confidence?: number;
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

        const postsResponse = await fetch("/api/knowledge-posts");
        if (!postsResponse.ok) throw new Error(`Failed to fetch posts: ${postsResponse.status}`);

        const postsData: KnowledgePost[] = await postsResponse.json();
        setKnowledgePosts(postsData);
      } catch (err) {
        console.error(err);
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

      {/* Knowledge Feed */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">📚 Knowledge Feed</h2>
        {knowledgePosts.length === 0 ? (
          <GlassCard className="p-6 text-center">
            <div className="text-gray-400 italic">No knowledge posts yet. Be the first to share knowledge!</div>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {knowledgePosts.map((post) => {
              const firstAnswer = post.answers?.[0];
              return (
                <GlassCard key={post.id} className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-4">{post.title}</h3>

                  {firstAnswer ? (
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${firstAnswer.answerType === "AI" ? "bg-indigo-500" : "bg-green-500"}`}></div>
                        <div>
                          <AnswerContent content={firstAnswer.content} maxLength={500} />
                          <div className="text-sm text-gray-500">{firstAnswer.answerType === "AI" ? `Generated in 0.8s` : `Trust Score: ${firstAnswer.trustScore ?? "N/A"} • 3 peer validations`}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic mb-4">No answers yet</div>
                  )}

                  {/* Metadata */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      👍 {post.likes || 0} • 💬 {post.comments || 0} • 🔄 {post.shares || 0}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        View Layers
                      </Button>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 rounded-full">
                        Earn TT
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
