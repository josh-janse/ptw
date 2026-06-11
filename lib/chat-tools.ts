import { type ToolSet, tool } from "ai";
import { z } from "zod";
import type { ResolvedSkill } from "@/lib/skills";

// ---------------------------------------------------------------------------
// Tool input schemas - shared by the server tool factory and the client
// renderers so the UI and the model agree on shape.
// ---------------------------------------------------------------------------

export const askUserSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The question to ask the person."),
        type: z
          .enum(["single_select", "multi_select"])
          .describe(
            "single_select for a one-choice question, multi_select to let them pick several."
          ),
        options: z
          .array(z.string())
          .min(2)
          .describe(
            "The selectable answers. They can always add their own via an 'Other' field."
          ),
      })
    )
    .min(1)
    .max(5)
    .describe("One to five multiple-choice questions."),
});

export type AskUserInput = z.infer<typeof askUserSchema>;
export type AskUserQuestion = AskUserInput["questions"][number];

export const showLinksSchema = z.object({
  links: z
    .array(
      z.object({
        url: z.string().describe("The full URL to link to."),
        title: z.string().nullish().describe("A short title for the card."),
        description: z
          .string()
          .nullish()
          .describe("A one or two sentence summary of the page."),
        image: z
          .string()
          .nullish()
          .describe("An optional preview/thumbnail image URL."),
      })
    )
    .min(1)
    .max(6)
    .describe("One to six pages to surface as link cards."),
});

export type ShowLinksInput = z.infer<typeof showLinksSchema>;
export type LinkCardData = ShowLinksInput["links"][number];

// ---------------------------------------------------------------------------
// Tool factory. ask_user and show_links are "echo" tools - they produce no
// server-side effect; their input is echoed back so the client can render an
// interactive surface. loadSkill returns a skill's full instruction body.
// ---------------------------------------------------------------------------

export function buildChatTools(skills: ResolvedSkill[]): ToolSet {
  const contentBySlug = new Map(
    skills.map((skill) => [skill.slug, skill.content])
  );

  const tools: ToolSet = {
    ask_user: tool({
      description:
        "Ask the person one or more multiple-choice questions to clarify their needs before answering. " +
        "Use this when the request is ambiguous or you need to narrow down options. " +
        "After calling this tool, do not write any further text - stop and wait for the answer, which arrives as their next message.",
      inputSchema: askUserSchema,
      execute: (input) => Promise.resolve(input),
    }),
    show_links: tool({
      description:
        "Present one or more relevant pages to the person as rich link cards. " +
        "Use this when pointing them to specific pages so they appear as tappable cards rather than plain URLs. " +
        "Provide a title and short description for each link; include an image URL when you have one.",
      inputSchema: showLinksSchema,
      execute: (input) => Promise.resolve(input),
    }),
  };

  if (skills.length > 0) {
    tools.loadSkill = tool({
      description:
        "Load the detailed instructions for one of your available skills by its slug. " +
        "Call this before helping with a task a skill covers, then follow the instructions it returns.",
      inputSchema: z.object({
        skill: z.string().describe("The slug of the skill to load."),
      }),
      execute: ({ skill }) =>
        Promise.resolve(
          contentBySlug.get(skill) ??
            `No skill named "${skill}" exists. Available skills: ${[...contentBySlug.keys()].join(", ")}.`
        ),
    });
  }

  return tools;
}
