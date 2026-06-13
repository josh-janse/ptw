// The four thinking layers, presented to a reviewer. This is the single source
// of truth for titles, ordering, and the contemplative "pause" shown before
// each section. Backgrounds are intentionally per-section so each pause can be
// tuned independently (soft, dim, regular-weight, modeled on PtW's prayer screen).

export interface ThinkingSection {
  // A one-line orientation shown on the menu.
  blurb: string;
  // The single key thought surfaced on the pause before this section.
  keyThought: string;
  pause: {
    // Full CSS background for the pause layer. Tune per section.
    background: string;
    // Text + control color sitting on that background.
    foreground: string;
  };
  slug: string;
  title: string;
}

export const thinkingSections: ThinkingSection[] = [
  {
    slug: "experience-overview",
    title: "Experience Overview",
    blurb: "The shape of the first three weeks, one step at a time.",
    keyThought: "One next step. Never many.",
    pause: {
      background:
        "radial-gradient(120% 120% at 50% 0%, #3d2a23 0%, #2a1d18 55%, #1c1411 100%)",
      foreground: "#f6f3f3",
    },
  },
  {
    slug: "visual-design",
    title: "Visual Design",
    blurb: "What calm looks like: surfaces, type, and the invitation system.",
    keyThought: "An invitation, not a notification.",
    pause: {
      background:
        "radial-gradient(120% 120% at 50% 10%, #34473e 0%, #25332d 55%, #18211d 100%)",
      foreground: "#f1f4f1",
    },
  },
  {
    slug: "copy-content",
    title: "Copy + Content",
    blurb: "How it speaks: warm, plain, one ask at a time.",
    keyThought: "Calm, quiet confidence, even when not everything is known.",
    pause: {
      background:
        "radial-gradient(120% 120% at 50% 0%, #3a4855 0%, #2b353f 55%, #1d242b 100%)",
      foreground: "#eef1f3",
    },
  },
  {
    slug: "rationale",
    title: "Rationale",
    blurb: "Why it's built this way, and how we'd know it works.",
    keyThought: "Our best guess, made better by listening.",
    pause: {
      background:
        "radial-gradient(120% 120% at 50% 5%, #4a352c 0%, #36261f 55%, #241915 100%)",
      foreground: "#f4efec",
    },
  },
];

export function getThinkingSection(slug: string): ThinkingSection | undefined {
  return thinkingSections.find((section) => section.slug === slug);
}
