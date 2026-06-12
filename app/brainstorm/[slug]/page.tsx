import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScan, scans, scanUrl } from "../scans";

export const dynamicParams = false;

export function generateStaticParams() {
  return scans.map((scan) => ({ slug: scan.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scan = getScan(slug);
  return { title: scan ? `${scan.title} · Brainstorming` : "Brainstorming" };
}

export default async function ScanViewer({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scan = getScan(slug);

  if (!scan) {
    notFound();
  }

  const url = scanUrl(scan);

  return (
    <main className="flex h-dvh w-full flex-col bg-background">
      <header className="flex items-center gap-4 border-border border-b px-5 py-4 sm:px-8">
        <Link
          className="inline-flex shrink-0 items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/brainstorm"
        >
          <ArrowLeft className="size-4" />
          Brainstorming
        </Link>
        <p className="min-w-0 truncate font-normal text-foreground text-sm">
          {scan.title}
        </p>
      </header>

      <object
        aria-label={`${scan.title}, hand-drawn brainstorm scan`}
        className="min-h-0 flex-1"
        data={url}
        type="application/pdf"
      >
        {/* Fallback for browsers (often mobile) that will not embed a PDF. */}
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-prose text-base text-muted-foreground leading-relaxed">
            Your browser can't preview this scan inline.
          </p>
          <a
            className="inline-flex items-center gap-1.5 text-primary text-sm transition-colors hover:text-foreground"
            href={url}
            rel="noopener"
            target="_blank"
          >
            Open {scan.title}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </object>
    </main>
  );
}
