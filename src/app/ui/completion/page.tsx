"use client";
import { log } from "console";
import { useState } from "react";
import { setErrorMap } from "zod/v3";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState("");
  const [completion, setcompletion] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsloading(true);
    setPrompt("");
    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }
      setcompletion(data.text);
    } catch (error) {
      console.error("Error: ", error);
      setError(
        error instanceof Error
          ? error.message
          : "seomthing went wrong please try again",
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">nextAi</h1>
        <span className="text-sm text-neutral-400">How's it going?</span>
      </header>

      {/* Response Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* AI Response Card */}
          <div className="bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-xl p-6 shadow-lg min-h-35">
            {isloading ? (
              <p className="text-neutral-400 animate-pulse">
                Generating response...
              </p>
            ) : completion ? (
              <p className="whitespace-pre-wrap text-neutral-200 leading-relaxed">
                {completion}
              </p>
            ) : (
              <p className="text-neutral-500">
                Ask something and the AI will respond here.
              </p>
            )}
          </div>

          {/* Error UI */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-neutral-800 p-4">
        <form
          onSubmit={complete}
          className="max-w-3xl mx-auto flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-2 shadow-md"
        >
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 bg-transparent px-4 py-3 outline-none text-neutral-200 placeholder:text-neutral-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-50"
            disabled={isloading}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
