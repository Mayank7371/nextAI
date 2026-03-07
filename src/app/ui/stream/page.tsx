"use client";
import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
    setInput,
    stop,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">nextAi</h1>
        <span className="text-sm text-neutral-400">Streaming Mode</span>
      </header>

      {/* Response Area */}
      <main className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-lg">
              {error.message}
            </div>
          )}

          {isLoading && !completion && (
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 animate-pulse text-neutral-400">
              Generating response...
            </div>
          )}

          {completion && (
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 shadow-lg whitespace-pre-wrap text-neutral-200 leading-relaxed">
              {completion}
            </div>
          )}

          {!completion && !isLoading && (
            <div className="text-neutral-500 text-sm">
              Ask something and the AI will stream the response here.
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-neutral-800 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput("");
            handleSubmit(e);
          }}
          className="max-w-3xl mx-auto flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-2 shadow-md"
        >
          <input
            placeholder="How can I help?"
            className="flex-1 bg-transparent px-4 py-3 outline-none text-neutral-200 placeholder:text-neutral-500"
            value={input}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <button
              onClick={stop}
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              stop
            </button>
          ) : (
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-50"
              disabled={isLoading}
            >
              Send
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}
