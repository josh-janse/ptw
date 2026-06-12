import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeLink } from "@/components/fade-link";
import { Pause } from "@/components/pause";
import { getThinkingSection, thinkingSections } from "../sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return thinkingSections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const found = getThinkingSection(section);
  return { title: found ? found.title : "The thinking" };
}

export default async function ThinkingSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const found = getThinkingSection(section);

  if (!found) {
    notFound();
  }

  const { default: Content } = await import(
    `@/content/thinking/${section}.mdx`
  );

  const index = thinkingSections.findIndex((item) => item.slug === section);
  const next = thinkingSections[index + 1];

  return (
    <Pause
      background={found.pause.background}
      foreground={found.pause.foreground}
      keyThought={found.keyThought}
    >
      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <Link
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/menu"
        >
          <ArrowLeft className="size-4" />
          Menu
        </Link>

        <p className="mt-12 font-medium text-primary text-sm">The thinking</p>

        <article className="ptw-rise" style={{ animationDelay: "120ms" }}>
          <Content />
        </article>

        <footer className="mt-20 border-border border-t pt-8">
          {next ? (
            <FadeLink
              className="group flex items-center justify-between gap-4"
              fadeTo={next.pause.background}
              href={`/thinking/${next.slug}`}
            >
              <span>
                <span className="block text-muted-foreground text-sm">
                  Next
                </span>
                <span className="mt-0.5 block font-normal text-foreground text-xl">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </FadeLink>
          ) : (
            <Link
              className="group flex items-center justify-between gap-4"
              href="/menu"
            >
              <span>
                <span className="block text-muted-foreground text-sm">
                  That is the thinking
                </span>
                <span className="mt-0.5 block font-normal text-foreground text-xl">
                  Back to the menu
                </span>
              </span>
              <ArrowLeft className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-x-0.5 group-hover:text-primary" />
            </Link>
          )}
        </footer>
      </main>
    </Pause>
  );
}
