# 0. Delivery Layer (build map)

> How the thinking in 01-04 becomes the app. The submission is itself an experience:
> reviewer-framed, housing the designed artifacts as live prototypes. Prototype data is
> static (one fictional leader, an existing group, start ~3 weeks out).

## Voice of the shell
Reviewer-framed: it speaks to the PtW team ("Hi PtW team!") and lets them *move through*
the thinking and *experience* the prototypes, rather than reading a PDF.

## Routes

| Route | Status | Delivers |
|---|---|---|
| `/` | exists (placeholder) | **Home greeting**, "Hi PtW team!" + one way forward to `/menu` |
| `/menu` | new | **Menu**, the four thinking layers + the three prototypes, plus two small footer links |
| `/thinking/[section]` | new | The four sections as a **tighter, presentational retelling** (not the raw working notes) |
| `/conversation` | rename from `/chat` | **Live conversation**, `?q=` pre-seed, action-titled, never "chat/AI" |
| `/email`, `/email/[id]` | exists | **Email visuals**, letter-not-campaign; secondary CTA deep-links to `/conversation?q=…` |
| `/timeline` | new | The **3-week deterministic timeline**, touchpoints, no countdown |
| `/in-app` | new (if time) | The **invitation system**, inline card + confidence slider |
| `/brand` | exists | Brand showcase (linked small from menu footer) |
| `/brainstorm` | new | Reveals the original hand-drawn notes in `public/files/brainstorm/` (linked small from menu footer) |

## The four additions (this round)

1. **The pause.** Between the menu and each `/thinking/[section]`, a full-screen
   contemplative interstitial (modeled on PtW's prayer/loading screen) that surfaces
   **one key thought** from that section, then a quiet "Continue." Slows the reviewer
   down and models the contemplative pace the design argues for. Pauses apply to the
   **thinking sections only**, not the prototypes.

   Draft key-thoughts (one per section):
   - Experience Overview → *"One next step. Never many."*
   - Visual Design → *"An invitation, not a notification."*
   - Copy + Content → *"Calm, quiet confidence, even when not everything is known."*
   - Rationale → *"Our best guess, made better by listening."*

2. **Menu footer links** (small, unobtrusive, bottom of `/menu`):
   - **Branding** → `/brand` (exists).
   - **Brainstorming** → reveals the four original PDFs in `public/files/brainstorm/`.

3. **Rename `/chat` → `/conversation`.** Consistent with "name by function, never call it
   chat or AI." Keep the `?q=` pre-seed + sanitization. (API route can stay internal.)

4. **Presentational `/thinking`.** The four sections are re-authored for the reviewer as
   curated MDX/pages. `docs/design/*.md` remain the working notes behind them.

## Planned: an "AI approach" page
A short MDX page that articulates the thinking around **the place of AI** in this
experience: it is an agentic tool named by action (never personified), bounded in scope,
anti-dependency by design (points outward to people), and used to get closer to the real
need rather than to replace formation or human relationship. Referenced from somewhere
sensible (likely the Rationale thinking layer or the menu), so the stance on AI is explicit
rather than implied.

## Tuning the existing surfaces
- **Conversation:** confirm it reads as a calm reading column (no avatar/robot, no "AI is
  typing"), suggested actions as cards, resource hand-offs as inline cards, action title.
  Verify the agent's scope/skills match the anti-dependency stance.
- **Email:** tune toward the letter aesthetic; ensure the **first-step (Week 1) email**
  exists matching canonical example ①, with a primary button + one quiet secondary that
  deep-links into `/conversation?q=…`. Current templates: `welcome`, `reflection-prompt`.

## Proposed build order
1. **Shell + navigation:** `/` greeting → `/menu` (with footer links) → routing.
2. **The pause** interstitial component + the four presentational `/thinking` pages.
3. **`/brainstorm`** reveal page.
4. **Rename** `/chat` → `/conversation`; tune the conversation surface.
5. **Email** tuning + the Week 1 first-step email coupled to the conversation.
6. **`/timeline`.**
7. **`/in-app`** (invitation card + confidence slider) if time remains.

## Build-time note
Per `AGENTS.md`, this Next.js may differ from training defaults, consult
`node_modules/next/dist/docs/` before writing route/MDX/config code.
