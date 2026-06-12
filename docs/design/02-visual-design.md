# 2. Visual Design

> Visual design for the key parts of the experience, enough to convey aesthetic and
> UI skill. The brief asks for at least one key touchpoint; we prioritise a coupled
> email→conversation flow, with in-app surfaces as support.

## Aesthetic foundation

Straight from the brand work (already encoded in our design tokens):

- **Type:** Plus Jakarta Sans standing in for Satoshi, humanist geometric sans.
  **Regular weight (400) even for headings.** No bold headings, no uppercase transforms.
- **Surfaces:** warm off-white `#f6f3f3` as the page (never pure white), near-black
  `#1a1a1a` text, white cards with soft diffuse shadows.
- **Accent:** a **single** salmon/terracotta `#ac715c`. No second accent in a context.
- **Form:** rounded app radii (~12-24px), generous whitespace, calm motion (fade + slight
  rise), no saturated color, no hard shadows.
- **Voice of the surface:** premium editorial spiritual journal, not a tech product,
  not a church website.

## The invitation system (one principle, three surfaces)

We are not choosing one placement, we are defining a system. One governing principle,
three intensities.

### Principle: invitation, not notification
- **Singular**, one element, one action; nothing competes, nothing stacks.
- **Placed, not alarming**, no badges, no red dots, no "unread" counts, no urgency.
- **Calm in motion**, fades/rises gently, never snaps in.
- What makes it read as an *invitation* is the **restraint, placement, and copy**, not
  a recurring brand mark. (Explicitly: do *not* stamp a logo/rays mark on every prompt;
  that is itself noise.)

### The three surfaces, ceremony / path / ambient
| Surface | When | Feel |
|---|---|---|
| **Centered arrival** | Threshold moments, the very first visit ("here's what we'll do"); the post-launch confidence reflection | A moment worth pausing for |
| **Inline card** | The everyday "next right step" on home/workspace, the default trailhead marker | Part of the room |
| **Corner invitation** | Ambient, low-stakes nudges, "the next Q&A is Thursday," a gentle return | The lightest touch |

## Artifacts to design (in priority order)

### 1. Email → pre-seeded conversation (the core)
The email and the conversation are **one coupled demo**, because the email's secondary
invitation deep-links into a pre-seeded conversation. Building this one flow demonstrates:
email aesthetic, the primary/secondary invitation structure, the email→chat tandem, and
the live conversational layer, four things from one build. It is also the hardest part
to fake, so the most worth making real.

**The email, a letter, not a campaign:**
- Single ~600px column on warm off-white.
- Regular-weight headline; two or three short paragraphs.
- **One** salmon primary button (the one next step).
- Beneath it, **one quiet text link**, the secondary invitation that opens the
  pre-seeded conversation.
- Warmly signed. The restraint *is* the aesthetic.

**The conversation, not a chatbot:**
- No avatar, no robot glyph, no "AI is typing," never labelled "AI Chat."
- Calm full-width reading column; messages as warm typography with breathing room.
- The leader's input is a quiet single field.
- **Suggested next actions as cards/chips** (cards / ask-user tool).
- **Resource deliveries shown as inline cards** ("Companion Guide, sent to your inbox").
- Titled by the **action** ("Prepare for your first session"), never by the technology.

### 2. In-app: invitation card + confidence slider (support)
- The **inline invitation card**, the everyday next-right-step.
- The **confidence slider**, a *ceremony* surface, post-launch only, framed as
  reflection: *"How are you feeling about leading after that?"* One warm slider, one
  gentle affirmation in response, **no number shown back** to the leader.

### 3. Second conversation flow (only if time remains)
e.g. "Think through who to invite."

## Language rule (carries into Section 3)
Name the experience by its **function**, never personify it, never brand it as "an AI."
The container is *a conversation*; the entry point is *the action*. The model is plumbing
the leader never needs to think about. No "assistant," no "bot," no robot iconography.

## Delivery note
The email may be rendered as a styled visual/preview rather than a literally-sent
message; if the conversation's send-resource tool is wired, Resend is available. Prototype
data is static (one fictional leader, an existing group, start ~3 weeks out).
