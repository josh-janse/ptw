import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Skills are plain markdown files in /skills, each with YAML-ish frontmatter:
//
//   ---
//   name: practice-guide          # the slug (kebab-case, 1–64 chars)
//   description: One line the model reads to decide when the skill applies.
//   ---
//   <full instructions in the body>
//
// To add a skill, drop a new `.md` file in /skills — no DB, no rebuild config.
// The agent sees only each skill's name + description up front, then calls the
// `loadSkill` tool to pull a skill's full body on demand.

// A skill with its instruction body resolved — used by the agent runtime.
export interface ResolvedSkill {
  content: string;
  description: string;
  name: string;
  slug: string;
}

interface ParsedSkill {
  body: string;
  description: string;
  name: string;
  slug: string;
}

const SKILLS_DIR = join(process.cwd(), "skills");

const FM_REGEX = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)/;
const NAME_REGEX = /^name:\s*(.+)$/m;
const DESC_REGEX = /^description:\s*(.+)$/m;
const SLUG_REGEX = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

function stripQuotes(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

// Derive a display name from a slug: "practice-guide" → "Practice Guide".
function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseSkillMd(raw: string): ParsedSkill | null {
  const fm = raw.match(FM_REGEX);
  if (!fm) {
    return null;
  }
  const [, frontmatter, rest] = fm;
  const body = rest.trim();
  const nameMatch = frontmatter.match(NAME_REGEX);
  const descMatch = frontmatter.match(DESC_REGEX);
  if (!(nameMatch && descMatch && body)) {
    return null;
  }
  const slug = stripQuotes(nameMatch[1]);
  if (!SLUG_REGEX.test(slug) || slug.length > 64) {
    return null;
  }
  return {
    slug,
    name: titleCase(slug),
    description: stripQuotes(descMatch[1]),
    body,
  };
}

// Read and parse every skill in /skills. Cached for the lifetime of the server
// process in production; in development the cache is skipped so adding or
// editing a skill `.md` shows up on the next request without a restart.
let cache: ResolvedSkill[] | null = null;
const useCache = process.env.NODE_ENV === "production";

export async function loadSkills(): Promise<ResolvedSkill[]> {
  if (useCache && cache) {
    return cache;
  }
  let files: string[];
  try {
    files = await readdir(SKILLS_DIR);
  } catch {
    cache = [];
    return cache;
  }
  const skills: ResolvedSkill[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }
    const raw = await readFile(join(SKILLS_DIR, file), "utf8");
    const parsed = parseSkillMd(raw);
    if (parsed) {
      skills.push({ ...parsed, content: parsed.body });
    }
  }
  skills.sort((a, b) => a.slug.localeCompare(b.slug));
  cache = skills;
  return skills;
}
