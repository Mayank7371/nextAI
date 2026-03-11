import Link from "next/link";

const demos = [
  {
    href: "/ui/chat",
    title: "Chat",
    subtitle: "Multi-turn conversation",
    description:
      "A full back-and-forth chat that remembers every message. Powered by the useChat hook — the closest thing to building your own ChatGPT.",
    icon: "💬",
    badge: "useChat",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    href: "/ui/stream",
    title: "Stream",
    subtitle: "Single prompt, word-by-word",
    description:
      "Type a prompt and watch the response appear in real time as it's generated. Uses the useCompletion hook with a stop button to cancel mid-stream.",
    icon: "⚡",
    badge: "useCompletion",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    href: "/ui/completion",
    title: "Completion",
    subtitle: "One-shot, wait for full answer",
    description:
      "The simplest approach — send a prompt, wait for the complete response, then display it. Built with plain React state and a manual fetch() call.",
    icon: "🔁",
    badge: "fetch API",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-xl font-semibold tracking-tight">nextAI</span>
        <span className="text-sm text-neutral-500">Vercel AI SDK · Gemini</span>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14 text-center">
        <div className="inline-flex items-center gap-2 bg-neutral-800/60 border border-neutral-700 rounded-full px-4 py-1.5 text-sm text-neutral-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Powered by Gemini 3.1 Flash-Lite
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
          next<span className="text-neutral-400">AI</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          A playground exploring three different ways to integrate AI into a
          Next.js app — from a simple fetch to a full streaming chat.
        </p>
      </section>

      {/* Demo Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group flex flex-col bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-lg hover:border-neutral-600 hover:bg-neutral-800/60 transition-all duration-200"
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{demo.icon}</span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${demo.badgeColor}`}
                >
                  {demo.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-neutral-100 transition-colors">
                {demo.title}
              </h2>
              <p className="text-xs text-neutral-500 mb-3">{demo.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                {demo.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-1.5 text-sm text-neutral-500 group-hover:text-white transition-colors">
                <span>Open demo</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-neutral-600">
          <span>nextAI — learning project</span>
          <span>Next.js · Tailwind · Vercel AI SDK</span>
        </div>
      </footer>
    </div>
  );
}
