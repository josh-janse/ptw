import type { MDXComponents } from "mdx/types";

// Global MDX styling. The thinking pages are a presentational retelling, so the
// type reads like a calm editorial journal: regular-weight headings, warm
// off-white surface, a single salmon accent, generous vertical rhythm.
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-2 mb-3 max-w-[20ch] font-normal text-4xl text-foreground leading-tight sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-14 mb-4 font-normal text-2xl text-foreground leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 mb-3 font-medium text-foreground text-lg leading-snug">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-foreground/85 text-lg leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 flex list-none flex-col gap-2.5 text-foreground/85 text-lg leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 flex list-decimal flex-col gap-2.5 pl-5 text-foreground/85 text-lg leading-relaxed marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-primary/60 before:content-[''] [ol_&]:pl-1 [ol_&]:before:hidden">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-primary/40 border-l-2 pl-5 text-foreground/70 text-xl italic leading-relaxed">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-foreground/75 italic">{children}</em>
  ),
  hr: () => <hr className="my-12 border-border" />,
  a: ({ children, href }) => (
    <a
      className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
      href={href}
    >
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
