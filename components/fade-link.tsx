"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface FadeLinkProps {
  children: React.ReactNode;
  className?: string;
  // The background to fade the screen to before navigating. Match the
  // destination's pause background so the two screens feel continuous.
  fadeTo: string;
  href: string;
}

const FADE_MS = 650;

// A link that fades the current screen out to a color before navigating, so
// arriving at a pause feels like one continuous breath: the screen settles to
// the pause's background, then the pause's words rise in on the far side.
export function FadeLink({ href, fadeTo, className, children }: FadeLinkProps) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigated = useRef(false);

  const finish = useCallback(() => {
    if (navigated.current) {
      return;
    }
    navigated.current = true;
    router.push(href);
  }, [href, router]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Let modified clicks (new tab, etc.) behave as a normal link.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        router.push(href);
        return;
      }

      router.prefetch(href);
      setLeaving(true);
    },
    [href, router]
  );

  // Flip to visible on the next frame so the curtain transitions in rather than
  // appearing instantly. A timeout backstops onTransitionEnd in case it misses.
  useEffect(() => {
    if (!leaving) {
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    const fallback = setTimeout(finish, FADE_MS + 150);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [leaving, finish]);

  return (
    <>
      <Link className={className} href={href} onClick={handleClick}>
        {children}
      </Link>
      {leaving && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[60] transition-opacity ease-out"
          onTransitionEnd={finish}
          style={{
            background: fadeTo,
            opacity: visible ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      )}
    </>
  );
}
