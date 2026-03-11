import { generateText } from "ai";
import { google } from "@ai-sdk/google";

//api route handler of POST request
export async function POST(req: Request) {
  const { prompt } = await req.json();
  // 1. Call the AI model
  // 2. Return the generated text
  // 3. Handle errors safely
  try {
    const { text } = await generateText({
      model: google("gemini-3.1-flash-lite-preview"),
      prompt: prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text", error);

    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
