"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, User, MessageSquare, Loader2 } from "lucide-react";

interface Message {
  id: string;
  question: string;
  answer: string;
  type: "AI" | "EXPERT";
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export function MainContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch — you’ll replace this with an actual API call
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/knowledge-posts");
        console.log("response:", res);
        if (res.ok) {
          const data = await res.json();
          console.log("fetched posts:", data);
          setMessages(data);
        } else {
          // fallback: static example
          setMessages([
            {
              id: "1",
              question: "How does caching work with Redis in Node.js?",
              answer: "Redis works as an in-memory key-value store that allows quick retrieval of frequently accessed data. You can integrate it using the `ioredis` or `redis` package.",
              type: "AI",
              createdAt: new Date().toISOString(),
              user: { name: "AI Engine" },
            },
            {
              id: "2",
              question: "How does caching work with Redis in Node.js?",
              answer: "In production, you should always add cache invalidation rules — otherwise, you’ll end up serving stale data.",
              type: "EXPERT",
              createdAt: new Date().toISOString(),
              user: { name: "Dev_Rohan" },
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      {/* Knowledge Feed Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">📚 Knowledge Feed</h2>
        <Badge variant="outline" className="text-gray-300">
          AI + Expert Discussions
        </Badge>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading posts...
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-400 italic">No knowledge posts yet. Ask something from the header to start.</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <GlassCard key={msg.id} className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl">
              {/* Title */}
              {index === 0 || msg.question !== messages[index - 1].question ? <h3 className="text-lg font-semibold text-white mb-3">{msg.question}</h3> : null}

              {/* Message Bubble */}
              <div className={`flex items-start gap-3 ${msg.type === "AI" ? "justify-start" : "justify-end"}`}>
                {msg.type === "AI" && (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.type === "AI" ? "bg-gray-800 text-gray-200 rounded-bl-none" : "bg-indigo-600 text-white rounded-br-none"}`}>
                  <p className="text-sm leading-relaxed">{msg.answer}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                    <span>{msg.user?.name}</span>
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

                {msg.type === "EXPERT" && (
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="mt-3 flex items-center justify-between text-gray-500 text-xs">
                <div className="flex gap-3">
                  {msg.type === "AI" ? (
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Brain className="w-3 h-3" /> AI Summary
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-3 h-3" /> Expert Insight
                    </span>
                  )}
                </div>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-indigo-400 text-xs flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Reply
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </main>
  );
}
