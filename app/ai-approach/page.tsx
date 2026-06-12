import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Content from "@/content/ai-approach.mdx";

export const metadata: Metadata = {
  title: "The place of AI",
};

// Thinking-adjacent: it shares the calm editorial column of the four thinking
// layers, but without a pause. It is reached from the Rationale section and the
// menu footer, so the stance on AI is stated rather than implied.
export default function AiApproachPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <Link
        className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="/menu"
      >
        <ArrowLeft className="size-4" />
        Menu
      </Link>

      <p className="mt-12 font-medium text-primary text-sm">
        Alongside the rationale
      </p>

      <article className="ptw-rise" style={{ animationDelay: "120ms" }}>
        <Content />
      </article>
    </main>
  );
}
