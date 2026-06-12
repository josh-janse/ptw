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
| `/chat` to `/conversation` + tuning | 1 below | todo |
| `/brainstorm` reveal page | 2 below | todo |
| Email tuning + Week 1 email | 3 below | todo |
| `/timeline` | 4 below | todo |
| `/in-app` invitation system | 5 below | todo |
| AI-approach page + colophon | 6 below | todo |

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

## Prompt 3: email tuning + the Week 1 first-step email

```
Read docs/design/02 and 03. Tune the email layer toward "a letter, not a campaign," and add the Week 1 first-step email that couples to the conversation.

Existing: emails/welcome-email.tsx, emails/reflection-prompt.tsx, emails/registry.tsx, emails/theme.ts; preview at /email and /email/[id].

Tasks:
1. Add a "first-step" (Week 1) email matching canonical example ① in docs/design/03: a warm letter, one salmon primary button ("Begin session one"), and beneath it ONE quiet secondary text link that deep-links into /conversation?q=... (the leader's pre-seeded message, e.g. "I'd like to talk through getting ready for my first session"). Register it in emails/registry.tsx with representative demo data.
2. Tune existing templates to the letter aesthetic: single ~600px column, warm off-white, regular weight, lots of whitespace, warmly signed, restraint over decoration. Keep emailTheme tokens in sync with globals.css.
3. Keep reflection-prompt aligned with the post-launch confidence-reflection moment.

Constraints: confidence before invitation (the Week 1 email does NOT ask them to invite members). One primary ask plus one quiet secondary. No em dashes. Name the conversation by action in the secondary link, never "chat with our AI."
Done when: the new email previews at /email/<id>, the secondary CTA points at /conversation?q=..., ultracite check passes.
```

---

## Prompt 4: /timeline

```
Read docs/design/01 (the 3-week arc and the two layers) and 00-delivery.md. Build /timeline: the deterministic layer made visible.

Show the touchpoints from signup to the group's first session across ~3 weeks, as a calm horizontal or vertical timeline. NO countdown and no pressure: it shows where touchpoints land, not time pressure. Mark the arc structure -> role -> disposition -> readiness (Week 1 to 3). Show which touchpoints are email (the heartbeat) vs in-app (the workspace), and note the adaptive leader-training drip (watch one, gently nudge the next; meet an unengaged leader kindly, no blast). Where useful, link a touchpoint to its artifact (/email/<id>, /conversation).

Aesthetic: warm, unhurried, regular weight, salmon accent, invitation-not-notification. Quiet back-to-menu link.
Done when: /timeline renders the touchpoints and arc with no countdown; ultracite check passes. Static demo data is fine (one fictional leader, start ~3 weeks out).
```

---

## Prompt 5: /in-app invitation system

```
Read docs/design/02 (the invitation system: one principle, three surfaces) and 01 (the confidence slider). Build /in-app: a small showcase of the in-app invitation surfaces.

Show the three surfaces governed by one principle (invitation, not notification: singular, placed, calm, no badges/alarms):
1. Inline invitation card (the everyday "next right step" / trailhead marker).
2. Centered arrival moment (a threshold pause; you may reuse components/pause.tsx patterns).
3. Corner invitation (an ambient, low-stakes nudge).
Plus the confidence slider: a post-launch reflection ("How are you feeling about leading, now that you've begun?"), one warm slider, one gentle affirmation in response, NO number shown back to the leader.

Aesthetic: tokens from globals.css, calm fade/rise motion, generous whitespace.
Done when: /in-app demonstrates the three surfaces and the slider; ultracite check passes.
```

---

## Prompt 6: AI-approach page + colophon

```
Read docs/design/00-delivery.md ("Planned: an AI approach page") and 04 (the anti-dependency stance). Build a short MDX page articulating the place of AI in this experience, and add an honest attribution colophon.

Tasks:
1. Add content/thinking-adjacent MDX (e.g. content/ai-approach.mdx) and a route to view it (e.g. /ai-approach, or fold it under the Rationale thinking layer). Keep it short and clear: AI here is an agentic tool named by action, never personified; bounded in scope; anti-dependency by design (points outward to people); used to get closer to the real need, not to replace formation or human relationship. Note what was deliberately left out (vector DB / knowledge grounding) and why.
2. Reference it from somewhere sensible: a small link from the Rationale section or the menu.
3. Add a small, unobtrusive colophon in the menu footer (alongside Branding and Brainstorming): "Prepared by Joshua Janse van Rensburg in collaboration with Claude (Anthropic)." The fuller, honest version of this lives on the AI-approach page: state plainly that AI helped prepare the submission, which is consistent with the stance the page argues for.

Constraints: calm, honest, first-person where natural, no em dashes, invitation-not-notification.
Done when: the AI-approach page renders and is linked; the menu colophon is present; ultracite check passes.
```
