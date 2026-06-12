// Three softly bouncing dots shown while a response is being prepared. Pure CSS
// (Tailwind's animate-bounce + staggered delays) so it needs no animation lib.
const DOTS = [0, 150, 300] as const;

export function TypingIndicator() {
  return (
    <div
      aria-label="Preparing a response"
      className="flex items-center gap-1 px-1 pt-1.5 pb-0.5"
      role="status"
    >
      {DOTS.map((delay) => (
        <span
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          key={delay}
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
