import type { ReactNode } from "react";

// A small app-shell "stage" borrowed from the /brand shell, so each invitation
// reads as placed in a room rather than floating in a void. Pure presentation,
// no client state, so both the server page and the client surfaces can use it.
export function WorkspaceFrame({
  children,
  minHeight = "20rem",
}: {
  children: ReactNode;
  minHeight?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-[0px_30px_60px_-30px_#00000022]">
      <div className="flex items-center gap-2.5 border-border border-b bg-card px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#684037] font-medium text-white text-xs">
          PW
        </span>
        <span className="font-medium text-foreground text-sm">
          Practicing the Way
        </span>
        <span className="text-muted-foreground text-xs">Leader workspace</span>
      </div>
      <div className="relative p-6 sm:p-8" style={{ minHeight }}>
        {children}
      </div>
    </div>
  );
}

// A faint, calm backdrop of "workspace" so an ambient or threshold surface has
// a quiet room to appear over. Intentionally low-contrast and inert.
export function WorkspaceBackdrop() {
  return (
    <div aria-hidden="true" className="select-none">
      <div className="h-3 w-40 rounded-full bg-muted" />
      <div className="mt-3 h-3 w-64 rounded-full bg-muted/70" />
      <div className="mt-8 h-24 w-full max-w-md rounded-2xl border border-border bg-card/60" />
      <div className="mt-4 h-3 w-52 rounded-full bg-muted/60" />
    </div>
  );
}

// One labelled specimen: an intensity eyebrow (ceremony / path / ambient), a
// regular-weight title, a short note on the principle, then the surface itself.
export function Specimen({
  intensity,
  title,
  note,
  delay,
  children,
}: {
  intensity: string;
  title: string;
  note: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <section className="ptw-rise" style={{ animationDelay: `${delay}ms` }}>
      <p className="font-medium text-primary text-sm">{intensity}</p>
      <h2 className="mt-1 font-normal text-2xl text-foreground leading-snug">
        {title}
      </h2>
      <p className="mt-2 max-w-prose text-base text-muted-foreground leading-relaxed">
        {note}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
