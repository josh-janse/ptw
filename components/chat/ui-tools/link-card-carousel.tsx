"use client";

import { ExternalLinkIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { LinkCardData } from "@/lib/chat-tools";

const WWW_PREFIX_RE = /^www\./;

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(WWW_PREFIX_RE, "");
  } catch {
    return url;
  }
}

function LinkCard({ link }: { link: LinkCardData }) {
  const domain = domainOf(link.url);
  const title = link.title ?? domain;

  return (
    <a
      className="group/card flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-sm"
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {/* biome-ignore lint/performance/noImgElement: link preview images come from arbitrary external domains — next/image remotePatterns can't enumerate them all */}
          {/* biome-ignore lint/correctness/useImageSize: fills its aspect-ratio container via CSS; intrinsic size is unknown for arbitrary preview images */}
          <img
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            src={link.image}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-muted-foreground text-xs">{domain}</span>
        <h4 className="line-clamp-2 font-semibold text-sm leading-snug">
          {title}
        </h4>
        {link.description && (
          <p className="line-clamp-3 flex-1 text-muted-foreground text-xs leading-relaxed">
            {link.description}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1 text-muted-foreground text-xs transition-colors group-hover/card:text-foreground">
          Visit page
          <ExternalLinkIcon className="size-3" />
        </span>
      </div>
    </a>
  );
}

export function LinkCardCarousel({ links }: { links: LinkCardData[] }) {
  if (links.length === 0) {
    return null;
  }

  if (links.length === 1) {
    const link = links[0];
    if (!link) {
      return null;
    }
    return (
      <div className="w-64">
        <LinkCard link={link} />
      </div>
    );
  }

  return (
    <Carousel opts={{ align: "start" }}>
      {/* py-1 gives the softened hover shadow room to not clip against the
          viewport's overflow-hidden, without adding visible slack. */}
      <CarouselContent className="-ml-3 py-1">
        {links.map((link) => (
          <CarouselItem className="basis-[260px] pl-3" key={link.url}>
            <LinkCard link={link} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-3 flex items-center gap-2 overflow-visible">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}
