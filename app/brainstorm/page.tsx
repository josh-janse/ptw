import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { scans } from "./scans";

export const metadata: Metadata = {
  title: "Brainstorming",
  description:
    "The original hand-drawn notes behind the curated thinking, offered for the curious.",
};

export default function Brainstorm() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-16 sm:py-24">
      <Link
        className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="/menu"
      >
        <ArrowLeft className="size-4" />
        Menu
      </Link>

      <header className="ptw-rise mt-12" style={{ animationDelay: "0ms" }}>
        <p className="font-medium text-primary text-sm">Brainstorming</p>
        <h1 className="mt-3 font-normal text-3xl leading-tight sm:text-4xl">
          The raw thinking, before it was curated
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground leading-relaxed">
          These are the original hand-drawn scans behind the designed sections.
          Not a polished artifact, just the working notes, offered for anyone
          curious about how the ideas first took shape.
        </p>
      </header>

      <ul
        className="ptw-rise mt-12 flex flex-col"
        style={{ animationDelay: "160ms" }}
      >
        {scans.map((scan) => (
          <li key={scan.slug}>
            <Link
              className="group flex items-baseline justify-between gap-4 border-border border-b py-5 transition-colors hover:border-primary/40"
              href={`/brainstorm/${scan.slug}`}
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-normal text-foreground text-xl leading-snug">
                  {scan.title}
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                </span>
                <span className="mt-1 block text-base text-muted-foreground leading-relaxed">
                  {scan.blurb}
                </span>
              </span>
              <span className="shrink-0 text-muted-foreground text-sm transition-colors group-hover:text-primary">
                View
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <footer
        className="ptw-rise mt-auto pt-20 text-muted-foreground text-sm"
        style={{ animationDelay: "320ms" }}
      >
        <Link
          className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          href="/menu"
        >
          <ArrowLeft className="size-4" />
          Back to the menu
        </Link>
      </footer>
    </main>
  );
}
