import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const SUGGESTED_PROMPTS = [
  "Recommend food under ₹200",
  "Show vegetarian options",
  "What should I eat for dinner?",
  "How do I place an order?",
];

const WELCOME_MESSAGE =
  "Hi! I'm FreshBites AI. Ask me about our menu, prices, recommendations, ordering, or your order status (when you're logged in).";

export default function FoodChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { token: reduxToken } = useSelector((state) => state.auth);
  const token = reduxToken || localStorage.getItem("token");

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    const historyForApi = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/api/chatbot/message`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to reach the AI assistant."
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.message ||
            "AI assistant is temporarily unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 sm:bottom-6 sm:right-6"
          aria-label="Open FreshBites AI chat"
        >
          <FaComments className="text-xl" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 z-[100] flex h-[min(100dvh,720px)] w-full flex-col border border-white/10 bg-[#101722] text-white shadow-2xl sm:bottom-6 sm:right-6 sm:h-[min(78vh,640px)] sm:w-[min(420px,calc(100vw-2rem))] sm:rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#080d16] px-4 py-3 sm:rounded-t-2xl">
            <div>
              <p className="text-sm font-semibold text-white">
                FreshBites AI
              </p>
              <p className="text-xs text-gray-400">
                Menu, orders & recommendations
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={`${msg.role}-${index}`}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "rounded-br-md bg-red-600 text-white"
                        : "rounded-bl-md border border-white/10 bg-[#080d16] text-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-white/10 bg-[#080d16] px-3 py-2 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-red-500" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 px-3 py-3 sm:px-4">
            <div className="mb-2 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 bg-[#080d16] px-2.5 py-1 text-xs text-gray-200 transition hover:border-red-500/40 hover:text-white disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about food, prices, or orders..."
                maxLength={2000}
                className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-white/10 bg-[#080d16] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
