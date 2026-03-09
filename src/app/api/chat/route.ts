import { UIMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const ollama = createOpenAI({
  baseURL: "http://localhost:11434/v1",
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: ollama("gemma3:4b"),
      messages: messages.map((m) => ({
        role: m.role,
        content: m.parts
          .filter((p) => p.type === "text")
          .map((p: any) => p.text)
          .join(""),
      })),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
