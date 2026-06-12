"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let animation: {
      destroy: () => void;
      setSpeed: (n: number) => void;
    } | null = null;

    // lottie-web touches `document`, so load it only in the browser.
    import("lottie-web").then(({ default: lottie }) => {
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animated-logo.json",
        rendererSettings: { viewBoxSize: LOCKUP_VIEW_BOX },
      });
      animation.setSpeed(PLAYBACK_SPEED);
    });

    return () => animation?.destroy();
  }, []);

  return (
    <div
      aria-label="Practicing the Way"
      className={cn("lottie-logo aspect-[1670/540]", className)}
      ref={containerRef}
      role="img"
    />
  );
}
