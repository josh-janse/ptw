"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// The 1920x960 canvas centers the lockup with empty bands on every side. Trim
// the top AND left bands (keeping full width so the wordmark isn't clipped) so
// the dots sit ~16 units from the box's top and left edges — equal, mild
// margins that read like a nav logo. Right stays open (it's just the wordmark).
const LOCKUP_VIEW_BOX = "250 205 1670 540";

// The full brand loop turns once per 100s, which reads as nearly frozen at
// logo size; speeding it up makes the rotation legible.
const PLAYBACK_SPEED = 1;

// The Practicing the Way lockup (orbiting circles + wordmark) from the brand
// Lottie. The wordmark renders as live Plus Jakarta; recoloring and the font
// override live in the `lottie-logo` rules in globals.css.
export function AnimatedLogo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hold the mark hidden until lottie has painted the SVG, then fade it in so
  // it never snaps into the corner once the chunk and JSON resolve.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let animation: AnimationItem | null = null;

    // Honor reduced-motion: show a still frame instead of the orbiting loop.
    const stillOnly = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // lottie-web touches `document`, so load it only in the browser.
    import("lottie-web").then(({ default: lottie }) => {
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: !stillOnly,
        autoplay: !stillOnly,
        path: "/animated-logo.json",
        rendererSettings: { viewBoxSize: LOCKUP_VIEW_BOX },
      });
      animation.addEventListener("DOMLoaded", () => {
        if (stillOnly) {
          animation?.goToAndStop(0, true);
        } else {
          animation?.setSpeed(PLAYBACK_SPEED);
        }
        setReady(true);
      });
    });

    return () => animation?.destroy();
  }, []);

  return (
    <div
      aria-label="Practicing the Way"
      className={cn(
        "lottie-logo aspect-[1670/540] transition-opacity duration-500",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
      ref={containerRef}
      role="img"
    />
  );
}
