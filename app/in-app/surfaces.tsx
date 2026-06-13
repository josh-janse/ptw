"use client";

import { CalendarDays, X } from "lucide-react";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { WorkspaceBackdrop, WorkspaceFrame } from "./frame";

type OverlayStage = "idle" | "holding" | "leaving";

// Ceremony: a threshold pause. Reuses the components/pause.tsx pattern (a calm
// layer that fades in over the room, holds one thought, then fades away on a
// quiet Continue), scoped to the frame so it stays a showcase rather than
// taking the whole screen.
export function CenteredArrivalDemo() {
  const [stage, setStage] = useState<OverlayStage>("idle");
  const continueRef = useRef<HTMLButtonElement>(null);

  const enter = useCallback(() => setStage("holding"), []);
  const leave = useCallback(() => {
    setStage((current) => (current === "holding" ? "leaving" : current));
  }, []);

  useEffect(() => {
    if (stage === "holding") {
      continueRef.current?.focus();
    }
  }, [stage]);

  return (
    <WorkspaceFrame>
      <WorkspaceBackdrop />
      {stage === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button onClick={enter} type="button" variant="outline">
            Enter the moment
          </Button>
        </div>
      )}
      {stage !== "idle" && (
        <div
          aria-label="A moment to pause"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out"
          onTransitionEnd={() => {
            if (stage === "leaving") {
              setStage("idle");
            }
          }}
          role="dialog"
          style={{
            background: "var(--solitude)",
            color: "var(--background)",
            opacity: stage === "leaving" ? 0 : 1,
          }}
        >
          <span
            className="ptw-rise font-medium text-sm text-white/70"
            style={{ animationDelay: "120ms", animationDuration: "1.1s" }}
          >
            Welcome
          </span>
          <p
            className="ptw-rise mt-4 max-w-[24ch] font-normal text-2xl leading-relaxed sm:text-3xl"
            style={{ animationDelay: "260ms", animationDuration: "1.2s" }}
          >
            Over the next few weeks, we'll get you ready. One step at a time.
          </p>
          <button
            className="ptw-rise mt-10 rounded-full bg-white/92 px-7 py-2.5 font-medium text-[#1a1a1a] text-sm shadow-sm outline-none transition-transform duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white/70 active:translate-y-px"
            onClick={leave}
            ref={continueRef}
            style={{ animationDelay: "760ms", animationDuration: "1.2s" }}
            type="button"
          >
            Continue
          </button>
        </div>
      )}
    </WorkspaceFrame>
  );
}

// Ambient: a low-stakes, peripheral nudge anchored in a corner. It fades in,
// can be dismissed, and stays gone. A quiet replay lets a reviewer see it again.
export function CornerInvitationDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <WorkspaceFrame minHeight="16rem">
      <WorkspaceBackdrop />
      {visible ? (
        <aside
          aria-label="A gentle nudge"
          className="ptw-rise absolute right-4 bottom-4 w-64 rounded-2xl border border-border bg-card p-4 shadow-[0px_20px_40px_-20px_#00000033]"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <CalendarDays className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-foreground text-sm leading-snug">
                The next live Q&amp;A is Thursday at 7pm.
              </p>
              <button
                className="mt-2 text-primary text-sm transition-opacity hover:opacity-80"
                onClick={() => setVisible(false)}
                type="button"
              >
                Add a quiet reminder
              </button>
            </div>
            <button
              aria-label="Dismiss"
              className="-mt-1 -mr-1 shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setVisible(false)}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </aside>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={() => setVisible(true)}
            type="button"
            variant="ghost"
          >
            Show it again
          </Button>
        </div>
      )}
    </WorkspaceFrame>
  );
}

const SLIDER_ID = "confidence-reflection";
const SLIDER_MAX = 100;
const STEADY_FLOOR = 34;
const READY_FLOOR = 67;

// The affirmation adapts gently by band, but a number is never shown back to
// the leader. The slider's own value is qualitative (aria-valuetext), not
// numeric, so assistive tech hears the feeling, not a score.
function affirmationFor(value: number): string {
  if (value < STEADY_FLOOR) {
    return "That honesty is its own kind of readiness. You don't need to have the answers, only to keep showing up.";
  }
  if (value < READY_FLOOR) {
    return "Steady. You're finding your footing, and that is exactly where a facilitator stands.";
  }
  return "That settledness will carry the room. Trust it. You're ready for the people who said yes.";
}

function valueTextFor(value: number): string {
  if (value < STEADY_FLOOR) {
    return "still finding my footing";
  }
  if (value < READY_FLOOR) {
    return "steadying";
  }
  return "steady and ready";
}

// Ceremony: a post-launch reflection. One warm slider, one gentle affirmation
// that appears once the leader has touched it. No number, ever.
export function ConfidenceSlider() {
  const [value, setValue] = useState(50);
  const [touched, setTouched] = useState(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    setTouched(true);
  }, []);

  const fill = `${(value / SLIDER_MAX) * 100}%`;

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-[0px_30px_60px_-30px_#00000022] sm:p-12">
      <p className="font-medium text-muted-foreground text-sm">
        After your first session
      </p>
      <h2 className="mt-2 max-w-prose font-normal text-2xl text-foreground leading-snug">
        How are you feeling about leading, now that you've begun?
      </h2>

      <div className="mt-10">
        <label className="sr-only" htmlFor={SLIDER_ID}>
          How are you feeling about leading, now that you've begun?
        </label>
        <input
          aria-valuetext={valueTextFor(value)}
          className="ptw-slider w-full"
          id={SLIDER_ID}
          max={SLIDER_MAX}
          min={0}
          onChange={onChange}
          style={{ "--ptw-fill": fill } as React.CSSProperties}
          type="range"
          value={value}
        />
        <div className="mt-3 flex justify-between text-muted-foreground text-sm">
          <span>Still finding my footing</span>
          <span>Steady and ready</span>
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-10 min-h-[3rem] max-w-prose text-foreground text-lg leading-relaxed"
      >
        {touched && (
          <span className="ptw-rise inline-block" key={valueTextFor(value)}>
            {affirmationFor(value)}
          </span>
        )}
      </p>
    </div>
  );
}
