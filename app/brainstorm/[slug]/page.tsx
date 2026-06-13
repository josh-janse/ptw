import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      <header className="relative flex items-center justify-center border-border border-b bg-card px-1.5 py-4">
        <Button
          asChild
          className="absolute left-1.5 text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Link href="/brainstorm">
            <ArrowLeft />
            Brainstorming
          </Link>
        </Button>
        <span className="max-w-[55%] truncate text-muted-foreground text-xs">
          {scan.title}
        </span>
      </header>

      {/* Inline embed for larger screens, where browsers render PDFs reliably. */}
      <object
        aria-label={`${scan.title}, hand-drawn brainstorm scan`}
        className="hidden min-h-0 flex-1 sm:block"
        data={url}
        type="application/pdf"
      >
        {/* Fallback for desktop browsers that decline to embed a PDF. */}
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

      {/* Mobile browsers don't reliably embed PDFs, so offer a direct open. */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-6 text-center sm:hidden">
        <p className="max-w-prose text-base text-muted-foreground leading-relaxed">
          {scan.blurb}
        </p>
        <Button asChild>
          <a href={url} rel="noopener" target="_blank">
            Open scan
            <ArrowUpRight />
          </a>
        </Button>
        <p className="text-muted-foreground text-xs">
          Opens the PDF in a new tab.
        </p>
      </div>
    </main>
  );
}
