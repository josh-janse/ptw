import { stepCountIs, ToolLoopAgent } from "ai";
import { buildChatTools } from "@/lib/chat-tools";
import { loadSkills } from "@/lib/skills";
import { buildSystemPrompt } from "@/lib/system-prompt";

// The default model - Claude Sonnet (latest), addressed as a plain
// "provider/model" string resolved through the Vercel AI Gateway. Change the id
// here to swap models. Requires AI_GATEWAY_API_KEY (or Vercel OIDC) in the env.
export const DEFAULT_MODEL = "anthropic/claude-sonnet-4.6";

// Build the chat agent for a request. Skills are read from /skills, injected
// into the system prompt, and exposed via the loadSkill tool.
export async function createChatAgent(): Promise<ToolLoopAgent> {
  const skills = await loadSkills();

  return new ToolLoopAgent({
    model: DEFAULT_MODEL,
    instructions: buildSystemPrompt(skills),
    tools: buildChatTools(skills),
    // Allow a few tool round-trips (e.g. loadSkill → answer) per turn.
    stopWhen: stepCountIs(5),
  });
}
