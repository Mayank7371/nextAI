import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gemma3:4b"),
      prompt: prompt,
    });
    return result.toUIMessageStreamResponse(); //this method creates an http response that streams the data in a format that UI can understand
  } catch (error) {
    console.error("Error streaming text: ", error);
    return new Response("Failed to stream text..", { status: 500 });
  }
}
