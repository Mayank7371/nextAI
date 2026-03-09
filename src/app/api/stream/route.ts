import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { log } from "node:console";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gemma3:4b"),
      prompt: prompt,
    });
    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens, //tokens we sent
        outputTokens: usage.outputTokens, // token the model generated
        totalTokens: usage.totalTokens, //total inp + out tokens
      });
    });
    return result.toUIMessageStreamResponse(); //this method creates an http response that streams the data in a format that UI can understand
  } catch (error) {
    console.error("Error streaming text: ", error);
    return new Response("Failed to stream text..", { status: 500 });
  }
}
