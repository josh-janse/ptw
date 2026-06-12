import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { thinkingSections } from "@/app/thinking/sections";
import { FadeLink } from "@/components/fade-link";

export const metadata: Metadata = {
  title: "Menu",
};

interface MenuItem {
  description: string;
  // When set, the screen fades to this background before navigating, matching
  // the destination pause. Used for the thinking layers, which open on a pause.
  fadeTo?: string;
  group: "thinking" | "prototype";
  href: string;
  label: string;
}

// One array for easy editing. The thinking layers are derived from the section
// config so titles stay in sync; the prototypes are listed alongside them.
// Some prototype routes 404 until their own session lands, which is expected.
const menuItems: MenuItem[] = [
  ...thinkingSections.map(
    (section): MenuItem => ({
      label: section.title,
      description: section.blurb,
      href: `/thinking/${section.slug}`,
      group: "thinking",
      fadeTo: section.pause.background,
    })
  ),
  {
    label: "The conversation",
    description: "A live, action-titled conversation, never a chatbot.",
    href: "/conversation",
    group: "prototype",
  },
  {
    label: "The email",
    description: "A letter, not a campaign. One step, one quiet link onward.",
    href: "/email",
    group: "prototype",
  },
  {
    label: "The timeline",
    description: "The three-week heartbeat of touchpoints, no countdown.",
    href: "/timeline",
    group: "prototype",
  },
];

const groups = [
  {
    id: "thinking" as const,
    eyebrow: "The thinking",
    heading: "Four layers to move through",
    note: "Each opens with a short pause.",
  },
  {
    id: "prototype" as const,
    eyebrow: "The prototypes",
    heading: "Three pieces to experience",
    note: "The designed artifacts, made real.",
  },
];

const itemClassName =
  "group flex items-baseline justify-between gap-4 border-border border-b py-5 transition-colors hover:border-primary/40";

function MenuItemBody({ item }: { item: MenuItem }) {
  return (
    <span className="min-w-0">
      <span className="flex items-center gap-2 font-normal text-foreground text-xl leading-snug">
        {item.label}
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
      </span>
      <span className="mt-1 block text-base text-muted-foreground leading-relaxed">
        {item.description}
      </span>
    </span>
  );
}

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mt-5 flex flex-col">
      {items.map((item) => (
        <li key={item.href}>
          {item.fadeTo ? (
            <FadeLink
              className={itemClassName}
              fadeTo={item.fadeTo}
              href={item.href}
            >
              <MenuItemBody item={item} />
            </FadeLink>
          ) : (
            <Link className={itemClassName} href={item.href}>
              <MenuItemBody item={item} />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Menu() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-20 sm:py-28">
      <header className="ptw-rise" style={{ animationDelay: "0ms" }}>
        <p className="font-medium text-primary text-sm">Practicing the Way</p>
        <h1 className="mt-3 font-normal text-3xl leading-tight sm:text-4xl">
          Where would you like to begin?
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground leading-relaxed">
          Move through in any order. There is no wrong way in.
        </p>
      </header>

      <div className="mt-14 flex flex-col gap-16">
        {groups.map((group, index) => (
          <section
            className="ptw-rise"
            key={group.id}
            style={{ animationDelay: `${160 + index * 140}ms` }}
          >
            <p className="font-medium text-muted-foreground text-sm">
              {group.eyebrow}
            </p>
            <h2 className="mt-1 font-normal text-2xl text-foreground leading-snug">
              {group.heading}
            </h2>
            <p className="mt-1 text-muted-foreground text-sm">{group.note}</p>
            <MenuList
              items={menuItems.filter((item) => item.group === group.id)}
            />
          </section>
        ))}
      </div>

      <footer
        className="ptw-rise mt-auto flex flex-col gap-4 pt-20 text-sm"
        style={{ animationDelay: "460ms" }}
      >
        <div className="flex items-center gap-5">
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/brand"
          >
            Branding
          </Link>
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/brainstorm"
          >
            Brainstorming
          </Link>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Prepared by Joshua Janse van Rensburg in collaboration with Claude.
          <br />
          <Link
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            href="/ai-approach"
          >
            On the place of AI
          </Link>
        </p>
      </footer>
    </main>
  );
}
