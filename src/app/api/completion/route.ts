import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  //api route handler of POST request
  try {
    const { text } = await generateText({
      model: openai("gemma3:4b"),
      prompt: prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text", error);

    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
