export interface Scan {
  // Plain-language note on what the page wandered through.
  blurb: string;
  // File lives in public/files/brainstorm/.
  file: string;
  // URL segment for the in-app viewer.
  slug: string;
  title: string;
}

export const scans: Scan[] = [
  {
    title: "The Need",
    blurb: "Where it started: the problem worth solving, written by hand.",
    file: "The Need.pdf",
    slug: "the-need",
  },
  {
    title: "Copy & Content",
    blurb: "Early voice and wording, before the language found its calm.",
    file: "Copy & Content.pdf",
    slug: "copy-and-content",
  },
  {
    title: "Visual & Timeline",
    blurb: "Loose sketches of look and pacing, on the way to the prototypes.",
    file: "Visual & Timeline.pdf",
    slug: "visual-and-timeline",
  },
  {
    title: "Key Areas",
    blurb: "The shape of the work, broken into the parts that mattered most.",
    file: "Key Areas.pdf",
    slug: "key-areas",
  },
];

export function getScan(slug: string): Scan | undefined {
  return scans.find((scan) => scan.slug === slug);
}

// Encoded public path for a scan, safe for href/src (spaces, ampersands).
export function scanUrl(scan: Scan): string {
  return `/files/brainstorm/${encodeURIComponent(scan.file)}`;
}
