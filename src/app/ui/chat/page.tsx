"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">nextAi</h1>
        <span className="text-sm text-neutral-400">Chat Mode</span>
      </header>

      {/* Chat messages */}
      <main className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-lg">
              {error.message}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl border border-neutral-800 p-5 shadow-lg ${
                message.role === "user"
                  ? "bg-neutral-800/70"
                  : "bg-neutral-900/70"
              }`}
            >
              <div className="text-sm text-neutral-400 mb-2">
                {message.role === "user" ? "You" : "AI"}
              </div>

              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <div
                      key={`${message.id}-${index}`}
                      className="whitespace-pre-wrap text-neutral-200 leading-relaxed"
                    >
                      {part.text}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {(status === "submitted" || status === "streaming") && (
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 text-neutral-400 animate-pulse">
              AI is thinking...
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <footer className="border-t border-neutral-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-2 shadow-md"
        >
          <input
            className="flex-1 bg-transparent px-4 py-3 outline-none text-neutral-200 placeholder:text-neutral-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help?"
          />

          {status === "submitted" || status === "streaming" ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={status !== "ready"}
              className="px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-50"
            >
              Send
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}
