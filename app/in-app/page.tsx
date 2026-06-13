import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Specimen, WorkspaceFrame } from "./frame";
import {
  CenteredArrivalDemo,
  ConfidenceSlider,
  CornerInvitationDemo,
} from "./surfaces";

export const metadata: Metadata = {
  title: "In-app surfaces",
  description:
    "One principle, three surfaces. How the workspace invites the next step without ever notifying, alarming, or stacking.",
};

const principles = [
  {
    id: "singular",
    text: "Singular. One element, one action. Nothing competes, nothing stacks.",
  },
  {
    id: "placed",
    text: "Placed, not alarming. No badges, no red dots, no unread counts, no urgency.",
  },
  {
    id: "calm",
    text: "Calm in motion. It fades and rises gently, never snaps in.",
  },
];

// The everyday trailhead marker, shown inside the workspace it lives in. Static,
// so it stays a server component: one present next step, primary plus a quieter
// alternate on-ramp, no countdown anywhere near it.
function InlineInvitationCard() {
  return (
    <WorkspaceFrame minHeight="18rem">
      <p className="text-foreground text-lg leading-relaxed">
        Good to see you.
      </p>
      <p className="mt-1 text-muted-foreground text-sm">
        You're in Week 1: structure and your role.
      </p>

      <div className="mt-8 max-w-md rounded-2xl border border-border bg-card p-6 shadow-[0px_20px_40px_-24px_#00000026]">
        <p className="font-medium text-primary text-sm">Your next step</p>
        <h3 className="mt-1.5 font-normal text-foreground text-xl leading-snug">
          Watch session one of leader training
        </h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          About six minutes. One finishable thing, and the steadiest place to
          begin.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button>Begin session one</Button>
          <Link
            className="text-muted-foreground text-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            href="/conversation"
          >
            Or open the Companion Guide
          </Link>
        </div>
      </div>
    </WorkspaceFrame>
  );
}

export default function InApp() {
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
        <p className="font-medium text-primary text-sm">In-app surfaces</p>
        <h1 className="mt-3 font-normal text-3xl leading-tight sm:text-4xl">
          Invitation, not notification
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground leading-relaxed">
          The workspace never pings, badges, or stacks. It offers one present
          step and quiet awareness of where you are. The same principle wears
          three intensities, ceremony, path, and ambient, shown here one at a
          time, because in the room you only ever meet one.
        </p>
      </header>

      <ul
        className="ptw-rise mt-10 flex flex-col gap-3 border-border border-y py-6"
        style={{ animationDelay: "120ms" }}
      >
        {principles.map((principle) => (
          <li
            className="flex gap-3 text-base text-foreground leading-relaxed"
            key={principle.id}
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{principle.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-col gap-20">
        <Specimen
          delay={200}
          intensity="Path"
          note="The everyday next right step on the home workspace. It is part of the room, one present action with no countdown and no badge."
          title="Inline invitation card"
        >
          <InlineInvitationCard />
        </Specimen>

        <Specimen
          delay={260}
          intensity="Ceremony"
          note="Threshold moments worth pausing for, like the very first visit. The room quiets, one thought is held, and a single quiet step carries you in."
          title="Centered arrival moment"
        >
          <CenteredArrivalDemo />
        </Specimen>

        <Specimen
          delay={320}
          intensity="Ambient"
          note="The lightest touch. A peripheral, low-stakes nudge, a gentle return rather than a demand. It can be dismissed and it stays gone."
          title="Corner invitation"
        >
          <CornerInvitationDemo />
        </Specimen>

        <Specimen
          delay={380}
          intensity="Ceremony, post-launch"
          note="Not a pre-launch step. After the group's first real session, one low-friction reflection. A formation moment and the clearest success signal, kept warm and free of scoring."
          title="The confidence reflection"
        >
          <ConfidenceSlider />
        </Specimen>
      </div>

      <footer
        className="ptw-rise mt-24 text-muted-foreground text-sm leading-relaxed"
        style={{ animationDelay: "440ms" }}
      >
        The reflection feeds the conversation layer with truth instead of
        inference, and the leader is shown a feeling in return, never a number.
      </footer>
    </main>
  );
}
