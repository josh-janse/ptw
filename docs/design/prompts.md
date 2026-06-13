# Session prompts (build order)

Copy-pasteable prompts to run each build step in its own session. Each is
self-contained and names the files it owns, so parallel sessions do not collide.

House rules for every session: read `docs/design/00-delivery.md` and `01` to `04`
first, plus `brand/research/ptw-brand-investigation.md`. This Next.js is v16.2.9;
consult `node_modules/next/dist/docs/` before route/config/MDX code. Use the tokens
in `app/globals.css`. NEVER use em dashes (see `CLAUDE.md`). Finish with
`npm exec -- ultracite check` on changed files.

## Status

| Step | Prompt | Status |
|---|---|---|
| Agent: system prompt + skills | A (kicked off) | done |
| Shell: home, menu, pause, thinking MDX | B (kicked off) | done |
| `/chat` to `/conversation` + tuning | 1 below | done |
| `/brainstorm` reveal page | 2 below | done |
| Scope-down: 2 surfaces + 1 email + det.-layer thinking | 3 (revised) | todo |
| `/timeline` surface | dropped | descoped |
| `/in-app` surface | dropped | descoped |
| AI-approach page + colophon | 6 below | done |
| Full copy review (run last) | 7 below | todo |

What already exists to build on: `app/page.tsx` (home), `app/menu/page.tsx`,
`app/thinking/sections.ts`, `components/pause.tsx`, `content/thinking/*.mdx`,
`mdx-components.tsx`, `next.config.ts`; the agent in `lib/*` with skills in
`skills/`; the chat surface at `app/chat/*`, `app/api/chat/route.ts`,
`components/chat/*`; email at `app/email/*`, `emails/*`.

---

## Prompt 1: rename /chat to /conversation and tune the surface

```
Read docs/design/02 and 03. Rename the user-facing chat surface to /conversation and tune it to the "conversation, not chatbot" spec. Another session already refocused the agent (lib/*) and the empty-state component copy; do NOT redo that. Own only the route and presentation.

Tasks:
1. Move app/chat/* to app/conversation/* (page, layout). Keep the ?q= pre-seed and its sanitization intact. The menu already links to /conversation.
2. Fix the persona leftover: app/chat/page.tsx line 6 metadata description still says "A companion for apprenticeship to Jesus." Replace with action-framed, non-persona copy (e.g. "A calm place to prepare to lead.").
3. Optionally rename /api/chat to /api/conversation and update the client fetch; if lower risk, leave the API path and just note it.
4. Verify the surface reads as a calm reading column: no avatar, no robot glyph, no "AI is typing," titled by the action. Suggested actions render as cards/chips; resource hand-offs render as inline cards. Confirm the agent's show_links/ask_user UI tools still render.

Constraints: name by function, never personify, never say "AI/assistant/chat" in visible copy. Calm, no urgency. No em dashes.
Done when: /conversation loads, ?q= still seeds the first message, no "companion/AI" persona copy remains in the route, ultracite check passes. Do not edit lib/* or the agent skills.
```

---

## Prompt 2: /brainstorm reveal page

```
Read docs/design/00-delivery.md. Build /brainstorm: a calm page that reveals the original hand-drawn brainstorm scans, linked small from the menu footer (the link already exists).

The four PDFs live in public/files/brainstorm/: "The Need.pdf", "Key Areas.pdf", "Copy & Content.pdf", "Visual & Timeline.pdf". Present them as a small, unobtrusive gallery (titles + a way to open/preview each, e.g. an embed or a link that opens the PDF). Honest framing: these are the raw thinking behind the curated sections, offered for the curious, not a polished artifact.

Aesthetic: warm off-white, regular-weight headings, salmon accent, generous whitespace, invitation-not-notification. A quiet back-to-menu link.
Done when: /brainstorm lists all four scans and each opens; ultracite check passes.
```

---

## Prompt 3 (revised): scope down to two surfaces + one email + deterministic-layer thinking

Final deliverable, by deliberate scope tradeoff (time, and the brief rewards thinking
over a complete product): the four thinking layers + TWO surfaces, the conversation and
ONE example email. The /email index, /timeline, and /in-app surfaces and the extra email
templates become irrelevant. Do NOT delete them; just make them unreachable.

```
Read docs/design/01, 02, 03. Scope the app down to the four thinking layers plus two surfaces: the conversation and ONE example email. Own app/menu/page.tsx, emails/*, and content/thinking/experience-overview.mdx.

Tasks:
1. The one email = the FIRST touchpoint. Add a single first-step (Week 1) email matching canonical example ① in docs/design/03. It must illustrate three things: the comms voice (a calm letter, not a campaign); the system's best-guess next step (watch session one, confidence before inviting anyone); and an EXPLICIT link into the non-deterministic layer, one quiet secondary text link that deep-links to /conversation?q=... with the leader's pre-seeded message (e.g. "I'd like to talk through getting ready for my first session"). One salmon primary button ("Begin session one") plus that one secondary. Register it in emails/registry.tsx. This is the only email that needs to be good; it may sit alongside a small note of its name.
2. Menu (app/menu/page.tsx): surface ONLY the four thinking layers + Conversation + this one email. Remove the /email (index), /timeline, and /in-app entries. Point the email entry directly at /email/<the-id>, not the index. Keep the footer links (Branding, Brainstorming) and the AI-approach colophon.
3. De-link the rest: ensure nothing reachable points to /email (index), /timeline, /in-app, or the other templates. They can stay on disk but must be unreachable from the live flow. Grep app/ and content/ for "/timeline", "/in-app", and bare "/email" links and remove or repoint any that remain in reachable pages.
4. Deterministic-layer thinking: in content/thinking/experience-overview.mdx, add a CONCISE section that directly answers the brief's question, "how the experience prepares them over the next three weeks." Describe the deterministic drip and the 3-week arc (structure -> role -> disposition -> readiness) in words, framed as: the one email is the deterministic layer's first touchpoint; the conversation is the non-deterministic layer. Keep it tight. This replaces building an interactive /timeline.

Constraints: confidence before invitation. Name the conversation by action, never "AI/chat". No em dashes. Calm, no urgency.
Done when: /menu shows exactly the four layers + conversation + one email; the email previews and its secondary CTA opens /conversation?q=...; experience-overview answers the 3-week question concisely; no reachable links point to /timeline, /in-app, or the /email index; ultracite check and npm run build pass.
```

---

## Prompts 4 and 5: /timeline and /in-app surfaces, DROPPED (descoped)

Not built as interactive surfaces. The timeline / deterministic layer is described
concisely in the Experience Overview thinking page (Prompt 3, task 4); the in-app
invitation system is described in the Visual Design thinking page. The /timeline and
/in-app page files may stay on disk but must be unreachable (Prompt 3, task 3).

---

## Prompt 6: AI-approach page + colophon

```
Read docs/design/00-delivery.md ("Planned: an AI approach page") and 04 (the anti-dependency stance). Build a short MDX page articulating the place of AI in this experience, and add an honest attribution colophon.

Tasks:
1. Add content/thinking-adjacent MDX (e.g. content/ai-approach.mdx) and a route to view it (e.g. /ai-approach, or fold it under the Rationale thinking layer). Keep it short and clear: AI here is an agentic tool named by action, never personified; bounded in scope; anti-dependency by design (points outward to people); used to get closer to the real need, not to replace formation or human relationship. Note what was deliberately left out (vector DB / knowledge grounding) and why.
2. Reference it from somewhere sensible: a small link from the Rationale section or the menu.
3. Add a small, unobtrusive colophon in the menu footer (alongside Branding and Brainstorming): "Prepared by Joshua Janse van Rensburg in collaboration with Claude." The fuller, honest version of this lives on the AI-approach page: state plainly that AI helped prepare the submission, which is consistent with the stance the page argues for.

Constraints: calm, honest, first-person where natural, no em dashes, invitation-not-notification.
Done when: the AI-approach page renders and is linked; the menu colophon is present; ultracite check passes.
```

---

## Prompt 7: full copy review (run last, after email/timeline/in-app land)

```
Read docs/design/03 (voice filter, two hierarchies, the skeleton, the governing line, the canonical examples) and 01, 02, 04. Do a full copy review across every user-visible string in the app. This is a quality pass, not new features.

Apply the voice filter from docs/design/03 to every surface:
- Calm, warm, invitational, not directive. Plain sentences with quiet depth. First-person plural ("we"). Sentence case.
- Normalize not-knowing; leave room to champion (some moments should celebrate the leader, not only reassure).
- No hype, no urgency, no guilt, no jargon. One ask per moment. Name the action, never the AI (no "assistant/bot/chat/companion/guide").
- The governing line: "communication should promote calm, quiet confidence, even when not everything is known and not everything is done."
- NEVER an em dash (grep for them and fix any that slipped in).

Surfaces to review (read each, propose edits, then apply once approved):
- app/page.tsx (home greeting + CTA; confirm the "Pathways team" vs "Practicing the Way team" call with Joshua)
- app/menu/page.tsx (headings, item labels, footer links, colophon)
- content/thinking/*.mdx (the four presentational sections) and the four pause key-thoughts in app/thinking/sections.ts
- the conversation surface: empty-state copy + suggestions in components/chat/*, and metadata in app/conversation/*
- lib/system-prompt.ts and skills/*.md (the agent's voice; same rules apply, still no persona)
- emails/* (subjects, preview text, body, signoff)
- app/brainstorm/* blurbs, app/ai-approach + content/ai-approach.mdx, and /timeline + /in-app once built
- content/thinking and the canonical examples in docs/design/03 (give the "coloring" the second pass it was flagged for)

Also check term consistency across all surfaces: Practicing the Way, the Course, session one, the Companion Guide, leader training, coordinator/pastor, "the conversation."

Done when: every surface reads as one voice, no em dashes remain (verified by grep), terms are consistent, and ultracite check passes. Output a short summary of what changed per file.
```
