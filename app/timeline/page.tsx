import { AppWindow, ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "The three-week deterministic heartbeat of touchpoints, where they land, no countdown.",
};

// The deterministic layer made visible. A single fictional leader (Sarah, an
// existing group, first session about three weeks out) walks from signup to her
// group's first gathering. The page shows WHERE each touchpoint lands, never how
// much time is left: weeks and arc, not a clock.

type Layer = "email" | "in-app";

interface TouchpointRow {
  // Adaptive touchpoints are conditional, not scheduled: they arrive only when
  // the leader's pace asks for them, so they read as dashed, not fixed.
  adaptive?: boolean;
  // The deep-link to the rendered artifact. Email slugs resolve once the real
  // 3-week email sequence is authored; in-app points at the surfaces prototype.
  artifact?: { href: string; label: string };
  body: string;
  // The email's quiet secondary invitation: a pre-seeded conversation, written
  // as the leader's own words, opened via ?q=.
  conversation?: string;
  id: string;
  kind: "touchpoint";
  layer: Layer;
  title: string;
}

interface PhaseRow {
  adaptive?: boolean;
  arc: string;
  id: string;
  kind: "phase";
  week: string;
}

interface MilestoneRow {
  id: string;
  kind: "milestone";
  label: string;
  note: string;
}

type Row = TouchpointRow | PhaseRow | MilestoneRow;

const conversationHref = (seed: string): string =>
  `/conversation?q=${encodeURIComponent(seed)}`;

// One ordered list of stations on a single rail. Phase rows are the arc labels
// (structure -> role -> disposition -> readiness); touchpoints hang off them.
const ROWS: Row[] = [
  {
    kind: "phase",
    id: "week-1",
    week: "Week 1",
    arc: "Structure and your role",
  },
  {
    kind: "touchpoint",
    id: "begin",
    layer: "email",
    title: "A calm place to begin",
    body: "One warm welcome and one small thing to do first: watch session one of the leader training, about twenty minutes, so the shape of what is ahead feels familiar.",
    artifact: { href: "/email/week1-begin", label: "Read the email" },
    conversation: "I'm not sure what I'm walking into. Can we talk it through?",
  },
  {
    kind: "touchpoint",
    id: "first-visit",
    layer: "in-app",
    title: "Your first visit",
    body: "Arriving in the workspace: a centered welcome that sets expectations plainly. We begin with you, then your group, one step at a time, never all at once.",
    artifact: { href: "/in-app", label: "Open the surface" },
  },
  {
    kind: "touchpoint",
    id: "invite",
    layer: "email",
    title: "A few honest ways to invite",
    body: "The language to invite people who already know you. Not a send button, just kinder ways to say I'd love you to do this with me.",
    artifact: { href: "/email/invite-language", label: "Read the email" },
    conversation: "Help me think through who to invite and how to ask.",
  },
  {
    kind: "phase",
    id: "adaptive",
    week: "As your pace asks",
    arc: "The heartbeat adapts",
    adaptive: true,
  },
  {
    kind: "touchpoint",
    id: "drip",
    layer: "email",
    adaptive: true,
    title: "Watched one? Here is the next",
    body: "Each finished session gently surfaces the one after it. Nothing arrives until you have watched the session before, so a leader who is moving is never pushed.",
  },
  {
    kind: "touchpoint",
    id: "gentle",
    layer: "email",
    adaptive: true,
    title: "No rush",
    body: "If things go quiet, one kind note names the silence without guilt. The course is here whenever you are ready, and your first session is the only date that matters.",
    artifact: { href: "/email/gentle-nudge", label: "Read the email" },
  },
  { kind: "phase", id: "week-2", week: "Week 2", arc: "Disposition" },
  {
    kind: "touchpoint",
    id: "facilitator",
    layer: "email",
    title: "A facilitator, not the answer",
    body: "Settling into the posture that carries a group well: listening, holding space, and trusting that you do not need to have every answer to lead a good conversation.",
    artifact: { href: "/email/week2-disposition", label: "Read the email" },
    conversation:
      "I want to facilitate well, not feel like I need every answer.",
  },
  { kind: "phase", id: "week-3", week: "Week 3", arc: "Readiness" },
  {
    kind: "touchpoint",
    id: "readiness",
    layer: "email",
    title: "Getting ready for session one",
    body: "Calm and concrete: the last small preparations for your first gathering with your group. You are more ready than you think.",
    artifact: { href: "/email/week3-readiness", label: "Read the email" },
    conversation:
      "I'd like to talk through getting ready for my first session.",
  },
  {
    kind: "milestone",
    id: "first-session",
    label: "The group's first session",
    note: "The one date that matters. Everything before it is preparation, gently paced.",
  },
  {
    kind: "touchpoint",
    id: "reflection",
    layer: "in-app",
    title: "How are you feeling now?",
    body: "Once the group has met, one warm reflection on a slider. It carries a feeling, never a number, and answers gently in return. This is the clearest sign the design is working.",
    artifact: { href: "/in-app", label: "Open the surface" },
  },
];

const LAYER_LABEL: Record<Layer, string> = {
  email: "Email",
  "in-app": "In-app",
};

function LayerChip({ layer }: { layer: Layer }) {
  const Icon = layer === "email" ? Mail : AppWindow;
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
      <Icon className="size-3.5 text-primary" />
      {LAYER_LABEL[layer]}
    </span>
  );
}

// The rail node for each row. Distinguished by shape and weight, never by a
// second accent colour: adaptive nodes are hollow and dashed; the milestone is
// a ringed dot; phases are small; touchpoints are solid.
function RailNode({ row }: { row: Row }) {
  if (row.kind === "milestone") {
    return (
      <span className="size-3.5 rounded-full bg-primary ring-4 ring-primary/15" />
    );
  }
  if (row.kind === "phase") {
    return row.adaptive ? (
      <span className="size-2.5 rounded-full border border-primary border-dashed bg-card" />
    ) : (
      <span className="size-2.5 rounded-full bg-primary" />
    );
  }
  return row.adaptive ? (
    <span className="size-3 rounded-full border border-primary border-dashed bg-card" />
  ) : (
    <span className="size-3 rounded-full bg-primary" />
  );
}

function PhaseContent({ row }: { row: PhaseRow }) {
  const weekClass = row.adaptive
    ? "font-medium text-muted-foreground text-sm"
    : "font-medium text-primary text-sm";
  return (
    <div className="pt-0.5">
      <p className={weekClass}>{row.week}</p>
      <h2 className="mt-0.5 font-normal text-foreground text-xl leading-snug">
        {row.arc}
      </h2>
    </div>
  );
}

function MilestoneContent({ row }: { row: MilestoneRow }) {
  return (
    <div className="pt-0.5">
      <h2 className="font-normal text-foreground text-xl leading-snug">
        {row.label}
      </h2>
      <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
        {row.note}
      </p>
    </div>
  );
}

function TouchpointContent({ row }: { row: TouchpointRow }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <LayerChip layer={row.layer} />
        {row.adaptive ? (
          <span className="rounded-full border border-border border-dashed px-2 py-0.5 text-muted-foreground text-xs">
            Adaptive
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-normal text-foreground text-lg leading-snug">
        {row.title}
      </h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{row.body}</p>
      {row.artifact || row.conversation ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {row.artifact ? (
            <Link
              className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              href={row.artifact.href}
            >
              {row.artifact.label}
            </Link>
          ) : null}
          {row.conversation ? (
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href={conversationHref(row.conversation)}
            >
              Talk it through
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function RowContent({ row }: { row: Row }) {
  if (row.kind === "phase") {
    return <PhaseContent row={row} />;
  }
  if (row.kind === "milestone") {
    return <MilestoneContent row={row} />;
  }
  return <TouchpointContent row={row} />;
}

function TimelineRow({
  row,
  isFirst,
  isLast,
}: {
  row: Row;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-9 last:pb-0">
      <div className="relative flex w-7 flex-col items-center">
        {isFirst ? null : (
          <span className="absolute top-0 left-1/2 h-3.5 w-px -translate-x-1/2 bg-border" />
        )}
        {isLast ? null : (
          <span className="absolute top-3.5 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
        )}
        <span className="relative z-10 flex h-7 w-7 items-center justify-center">
          <RailNode row={row} />
        </span>
      </div>
      <RowContent row={row} />
    </li>
  );
}

export default function TimelinePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <Link
        className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="/menu"
      >
        <ArrowLeft className="size-4" />
        Menu
      </Link>

      <header className="ptw-rise mt-12" style={{ animationDelay: "0ms" }}>
        <p className="font-medium text-primary text-sm">
          The deterministic layer
        </p>
        <h1 className="mt-3 font-normal text-3xl leading-tight sm:text-4xl">
          Three weeks, one steady heartbeat
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground leading-relaxed">
          From the day Sarah says yes to leading, to her group's first session,
          here is where each touchpoint lands. No countdown and no pressure,
          just the next right step arriving when it helps.
        </p>
      </header>

      <section
        className="ptw-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground text-sm leading-relaxed"
        style={{ animationDelay: "120ms" }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Mail className="size-4 text-primary" />
          Email, the heartbeat that reaches her
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AppWindow className="size-4 text-primary" />
          In-app, the workspace she returns to
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border border-primary border-dashed" />
          Adaptive, only when her pace asks
        </span>
      </section>

      <ol
        className="ptw-rise mt-14 list-none"
        style={{ animationDelay: "240ms" }}
      >
        {ROWS.map((row, index) => (
          <TimelineRow
            isFirst={index === 0}
            isLast={index === ROWS.length - 1}
            key={row.id}
            row={row}
          />
        ))}
      </ol>

      <footer
        className="ptw-rise mt-16 border-border border-t pt-8 text-muted-foreground text-sm leading-relaxed"
        style={{ animationDelay: "360ms" }}
      >
        Static demo data: one fictional leader, an existing group, first session
        about three weeks out. The conversation links carry the leader's own
        words into a pre-seeded conversation.
      </footer>
    </main>
  );
}
