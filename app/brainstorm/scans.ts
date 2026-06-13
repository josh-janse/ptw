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
    blurb: "A rough mind map tracing questions and key system data points.",
    file: "The Need.pdf",
    slug: "the-need",
  },
  {
    title: "Copy & Content",
    blurb:
      "Unpacking system triggers and what I felt might be important for content direction.",
    file: "Copy & Content.pdf",
    slug: "copy-and-content",
  },
  {
    title: "Visual & Timeline",
    blurb:
      "Inital (incomplete) loose sketches and thoughts of what the experience and timeline could be.",
    file: "Visual & Timeline.pdf",
    slug: "visual-and-timeline",
  },
];

export function getScan(slug: string): Scan | undefined {
  return scans.find((scan) => scan.slug === slug);
}

// Encoded public path for a scan, safe for href/src (spaces, ampersands).
export function scanUrl(scan: Scan): string {
  return `/files/brainstorm/${encodeURIComponent(scan.file)}`;
}
