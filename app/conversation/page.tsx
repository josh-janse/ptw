import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/chat-interface";

export const metadata: Metadata = {
  title: "Conversation · Practicing the Way",
  description: "A calm place to prepare to lead.",
};

const MAX_QUERY_LENGTH = 2000;

// Prime the conversation from a ?q= deep-link. Strip HTML and cap the length so
// a shared link can't inject markup or an unbounded payload.
function sanitizeQuery(
  value: string | string[] | undefined
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return;
  }
  const cleaned = raw
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, MAX_QUERY_LENGTH);
  return cleaned || undefined;
}

export default async function ConversationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  return <ChatInterface initialQuery={sanitizeQuery(q)} />;
}
