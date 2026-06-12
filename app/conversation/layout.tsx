import type { ReactNode } from "react";

// Pins the conversation to the viewport height so it scrolls internally and the
// composer stays docked at the bottom.
export default function ConversationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex h-dvh flex-col">{children}</div>;
}
