import type { ReactNode } from "react";

// Pins the chat to the viewport height so the conversation scrolls internally
// and the composer stays docked at the bottom.
export default function ChatLayout({ children }: { children: ReactNode }) {
  return <div className="flex h-dvh flex-col">{children}</div>;
}
