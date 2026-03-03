import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST() {
  const { text } = await generateText({
    model: openai("gemma3:4b"),
    prompt: "Explain what LLMs do in 5 lines",
  });

  return Response.json({ text });
}
