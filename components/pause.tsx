"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PauseProps {
  // Full CSS background for the pause layer (per-section, see sections.ts).
  background: string;
  children: React.ReactNode;
  // Text + control color sitting on that background.
  foreground: string;
  keyThought: string;
}

type Stage = "holding" | "leaving" | "done";

// A full-screen contemplative interstitial shown before a thinking section.
// Soft, dim, centered, regular-weight: it surfaces one key thought, then a
// quiet "Continue" that fades the pause away to reveal the section beneath.
export function Pause({
  keyThought,
  background,
  foreground,
  children,
}: PauseProps) {
  const [stage, setStage] = useState<Stage>("holding");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    setStage((current) => (current === "holding" ? "leaving" : current));
  }, []);

  // Lock scroll and settle focus on the quiet control while the pause holds.
  useEffect(() => {
    if (stage === "done") {
      return;
    }
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [stage]);

  // Allow Escape to continue, in keeping with the unhurried, low-friction feel.
  useEffect(() => {
    if (stage !== "holding") {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, dismiss]);

  return (
    <>
      {children}
      {stage !== "done" && (
        <div
          aria-label="A moment to pause"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ease-out"
          onTransitionEnd={() => {
            if (stage === "leaving") {
              setStage("done");
            }
          }}
          role="dialog"
          style={{
            background,
            color: foreground,
            opacity: stage === "leaving" ? 0 : 1,
          }}
        >
          <p
            className="ptw-rise max-w-[22ch] font-normal text-2xl leading-relaxed sm:text-3xl"
            style={{ animationDelay: "200ms", animationDuration: "1.2s" }}
          >
            {keyThought}
          </p>
          <button
            className="ptw-rise mt-14 rounded-full bg-white/92 px-7 py-2.5 font-medium text-[#1a1a1a] text-sm shadow-sm outline-none transition-transform duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white/70 active:translate-y-px"
            onClick={dismiss}
            ref={buttonRef}
            style={{ animationDelay: "700ms", animationDuration: "1.2s" }}
            type="button"
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
}
