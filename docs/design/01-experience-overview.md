# 1. Experience Overview

> The overall shape of the onboarding for a new group leader who has just signed
> up and plans to begin the Practicing the Way Course with **their group in ~3 weeks.**

## The thesis

The first leader-training video can leave a new leader feeling **overwhelmed.** So
the whole onboarding is a counterweight to overwhelm. Two principles carry it:

1. **One next step, not many.** Reduce every moment to the single next right thing.
2. **Confidence leads; connection follows.** Steady the *leader* before opening the
   *circle*, because being responsible for other people before you feel steady
   yourself is what produces the overwhelm.

The emotional target is named precisely: **calm, prepared, surrendered, confident**, 
the disposition of *"I don't need to have the answer. I'm a facilitator."*

## What happens first

- A beat of **encouragement**, genuine, unhurried, not hype.
- **Expectations set up front**, a plain *"here's what we'll do together over the
  next few weeks."* The leader should never wonder what this experience is or where
  it's going.
- An **open question, posed not captured**, *"What do you hope to see come of this
  group?"* It invites reflection; the system does not store or echo it. (If anything
  remembers it, it's the leader, not the software. This is in keeping with a
  contemplative voice that *invites* rather than *extracts.*)
- **One finishable next step:** watch **session 1** of leader training (~20 min). One
  small, completable thing produces outsized steadiness.

## What the leader is invited to do next

The primary invitation is to **build confidence before inviting members.** Two doors,
one room:

- **Primary:** start the leader training, *just session 1.* Not "watch all 7."
- **Secondary / lighter:** the **Companion Guide** as an alternate on-ramp.

Confidence is the opener. The **invite language** rides in close behind, because the
3-week clock won't wait, but felt-confidence, not a date, is what surfaces the invite
step.

## How it prepares them over three weeks

A gentle arc that maps to what a leader needs, in order:

| Week | Focus | What it builds |
|------|-------|----------------|
| **Week 1** | **Structure** + your **role** | Steady footing: session 1, then the *language* to invite an existing group well, not "hit send," but how to start those conversations. |
| **Week 2** | **Disposition** | Listening; *"I'm a facilitator, not the answer."* Handling the people who said yes. This is where *surrendered* is built. |
| **Week 3** | **Readiness** | Prepare for session one specifically. Calm, concrete, *"you're ready."* |

### The training drip is adaptive, not a fixed blast
Not every session needs its own nudge. **If one is watched, gently nudge the next, and
repeat**, plus one initial prompt to begin within the 3-week window. The leader who is
moving doesn't get pushed; the leader who stalls gets a soft hand. (Confidence category.)

### No signal, no movement, handled kindly
If the leader does nothing, the drip still moves *gently* and the email/chat can **name
the silence without guilt.** Inaction is itself a signal worth a calm response. A
**time-aware floor** keeps things from stalling out entirely, but never pushes.

## What belongs in the platform vs. other channels

> **Email decides *when*. In-app is *where*. Chat figures out *what*.**

- **Email, the heartbeat.** Time/trigger-based. Reaches the leader even when they
  don't log in. Carries **one** primary next step + a secondary link into a
  conversation. Async.
- **In-app, the workspace, not a dashboard.** *No countdown*, a countdown
  manufactures the exact pressure we're designing against. Instead, a **trailhead
  marker**: one present next step and quiet awareness of where you are on the track.
  That step can itself be an action-framed entry into the conversation.
- **Chat, the conversation.** Adapts across both; personalizes; named by *action*,
  never as a persona or "an AI."

### In-app also serves two smaller jobs
- **A reflective confidence check (post-launch).** After the group's first real
  session, a single low-friction reflection, *"How are you feeling about leading
  after that?"*, on a slider. **Not a pre-launch step.** It is both a formation
  moment and the clearest **success signal** (see below), and it feeds the
  conversation layer with truth instead of inference. There's a natural extension to
  *execution* once confidence is felt.
- **Targeted qualitative research prompts.** Soon after course launch, in-app prompts
  can ask a segment of leaders one question with one or two follow-ups. Primarily a
  **research tool** for the team, kept light and infrequent.

## The two layers

### Deterministic, the predetermined heartbeat
Trigger-driven / drip / just-in-time email + in-app delivery. Surfaces the immediate
next step for key concerns and carries the confidence-building sequence (leader
training). Predetermined by the system; reactive to known signals (course created,
group created, members invited, sessions watched, guide accessed, reflection done).

### Non-deterministic, the conversation
A conversational layer with real dynamism. **Premise:** we have a lot of data to *guess*
the next right step, but it is still a guess, the conversation gets us **closer to the
real need.** It is an agentic tool, used as such:

- **Skills** that scope its competence and make it legible, e.g. `debrief_group_leader`,
  `prepare_for_first_session`, and a hand-off skill like `connect_to_coordinator`.
- A **send-resource (email) tool** to deliver the right resource when it becomes
  relevant in conversation.
- A **global analysis layer** that looks across conversations for common needs and gaps
, informing what the deterministic layer delivers, and when.

**Scope boundaries (the anti-dependency principle):**
- It must **not build dependency.** Its instinct at the edge of its purview is to point
  *outward to people* (pastor / coordinator), not inward to itself.
- It is **named by action, never personified**, not "your guide," not "our AI." The
  invitation is about the thing the leader is doing: *"Think through who to invite,"*
  *"Prepare for your first session,"* *"Talk through what's on your mind."*
- It **promotes connection**, e.g. it can surface the next live Q&A in the schedule
  when it's close enough.
- It does **not do the formation work for the leader**, it won't generate their session
  plan or produce materials that replace engaging with the course or guide. It helps
  them prepare *themselves.*

### The two layers work in tandem
Every email carries a **primary invitation** (the one next step) and a **secondary
invitation**, a link into a **pre-seeded conversation**, so the email never has to
carry nuance it can't, and the conversation starts warm instead of from a blank box.

## Delivery scope (honest caveats)
- The designed prototype **will not include a vector DB**, which would meaningfully
  improve the agent's grounding via a knowledge-source tool. The prototype relies on a
  strong **system prompt**, a few **skills**, and possibly an **ask-user / cards** tool.
- Audience framing: the submission is **reviewer-framed** (it speaks to the PtW team)
  and houses the designed artifacts as live prototypes. Prototype data is **static**, 
  one fictional leader, an existing group, a start date ~3 weeks out.

## Assumption (stated deliberately)

> **This leader has an existing group** they're already connected to. The connection
> work is therefore *how to invite well*, language and framing for people who already
> know them, not *finding* people. A brand-new-group path (gathering, recruiting, more
> hand-holding) is a deliberate **future expansion** of the sequence, not built here.

The brief supports this: the leader plans to begin with *"their group"*, an existing
circle, not recruitment from zero.

## How we'd know it's working
- **Self-reported confidence** after the first session (the slider), success defined in
  the same terms as the design intent.
- **Movement on the signals** the deterministic layer watches (session 1 watched, invite
  language used, members invited), without pressure being the cause.
- **Conversation quality**, leaders reaching the conversation when stuck, and being
  handed *outward* rather than kept *dependent.*
