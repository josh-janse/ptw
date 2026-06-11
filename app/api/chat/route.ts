import { createAgentUIStreamResponse, smoothStream } from "ai";
import { createChatAgent } from "@/lib/agent";

// Reads from the filesystem (skills) and streams a model response, so run on
// the Node.js runtime and never cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const agent = await createChatAgent();

  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
    // Release text word-by-word on a gentle timer so the stream reads calmly
    // rather than arriving in bursty model chunks.
    experimental_transform: smoothStream({ delayInMs: 20, chunking: "word" }),
  });
}
