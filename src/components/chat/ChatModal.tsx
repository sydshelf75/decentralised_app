"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  userId: string;
}

export default function ChatModal({ isOpen, onClose, question, userId }: ChatModalProps) {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (question.trim()) handleAsk(question);
  }, [question]);

  const handleAsk = async (q: string) => {
    const userMsg = { sender: "user" as const, text: q };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, userId }),
      });

      const data = await res.json();
      const aiText = data?.content || "⚠️ No response from AI. Try again.";
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "ai", text: "❌ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-gray-900 text-gray-100 w-full max-w-md rounded-2xl shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-indigo-400">Gemini Chat</h2>
              <Button onClick={onClose}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
              </Button>
            </div>

            {/* Chat area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-700 text-gray-200 rounded-bl-none"}`}>{m.text}</div>
                </div>
              ))}
              {loading && <div className="text-sm text-gray-400 italic">AI is typing...</div>}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-800 text-center text-xs text-gray-500">Powered by Gemini AI</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
