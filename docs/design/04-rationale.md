# 4. Rationale

> Brief explanation of the thinking behind the experience.

## Why we designed it this way

The full reasoning lives in Sections 1 to 3. The thesis: the onboarding is a
**counterweight to overwhelm.** One next step, never many. Confidence before connection.
Invitation, not notification. The experience is named by action, never personified.

The piece worth stating plainly here is that **the two layers serve different purposes**:

- **The deterministic layer is our best guess** of what the leader needs, delivered on a
  predetermined, trigger-driven cadence.
- **The non-deterministic layer (the conversation) serves a dual purpose:**
  1. **Indirect UX research**, it surfaces what leaders actually need and where the gaps
     are, across many conversations.
  2. **Better-informed offering**, it gets us closer to the real need before we offer
     anything, so the next thing we surface is grounded in understanding, not inference.

Together: the deterministic layer moves; the conversation tells us whether the guess was
right and quietly corrects it.

## The anti-dependency stance (a deliberate ethical choice)

The conversational tool must make the leader **more self-sufficient and more surrendered,
not more reliant on software.** Concretely:

- It has a **known, bounded scope** (legible via named skills).
- At the edge of its purview, its instinct is to point **outward to people** (pastor,
  coordinator) and to durable resources, not inward to itself.
- It does **not do the formation work for the leader** (no generated session plans, no
  materials that replace engaging the course or guide).
- It is **never personified** and never branded as "an AI."

This is both an ethical position and a signal of product judgment.

## What we learned from the facilitator training videos

Honest scope: I watched a few videos in the **group leader training** category, not all
of them, and will keep watching to deepen this.

**What I noticed:**

- There is meaningful **overlap between the coordinator training and the group leader
  training** content.
- The group leader training **arcs deliberately:** an overview first (this is the
  framework you are inside of), across the first two videos, then a move toward *you do
  not need to have all the answers* (disposition), then toward *handling difficulties in
  a group.* This arc directly informed our Week 1 to Week 3 shape (structure to role to
  disposition).
- **My own first reaction was mild overwhelm** in the first video, partly because I felt
  pressure to get through all of them. I am not sure this perfectly mirrors a real
  leader's experience, but it is plausible, and it is the origin of the whole
  overwhelm-counterweight thesis.
- **I eased in once I had the lay of the land.** Understanding the overall framework made
  me calmer and more comfortable with the parts I did not yet know. This validates
  designing for *orientation first*, then steps.
- **My first instinct was to look for the Companion Guide,** which was not immediately
  obvious but turned out to be easy to find later. Design implication: **surface the
  Companion Guide clearly and early**, do not make leaders hunt for it.
- **The example schedule felt a little complex at first**, almost like too much was
  happening at once, though that may be unfamiliarity. Design implication: **do not dump
  the full schedule**, reveal structure progressively, consistent with one-next-step.

**A note on domain resonance:** there is a lot of overlap between how Practicing the Way
talks about groups and leaders and the work at my current employer, Project Exodus, which
makes addiction-recovery resources more accessible by training recovery-group
facilitators and helping them launch groups. The shared posture: listening, facilitating,
not having all the answers, not being there to fix or rescue, handling challenges in a
group. That overlap gave me genuine empathy for what this leader is being invited into.

**What the leader is being invited into:** a posture of **quiet confidence.**

## What a new group leader most needs at this moment

**Confidence in not having all the answers.** Steadiness over preparedness-as-tasks. The
freedom to begin before everything is known or done.

## What we chose not to include

Separating two kinds of omission:

**Design decisions (we would not do these, by intent):**
- A brand-new-group **recruitment** path (we assume an existing group).
- A **countdown / timer** (manufactures pressure).
- **Capturing** the opening reflective question (we invite reflection, we do not extract).
- Any **AI persona / personification**.
- **Summarizing each training video** one by one (the brief explicitly discourages this).
- **Notification-style** badges, dots, or alerts.
- The tool **building session plans or materials** for the leader.
- **Dripping training videos to an unengaged leader.** The pattern is nudge, then a
  watch-trigger reveals the next video. It meets the leader where they are rather than
  pushing content at someone who is not ready.

**Delivery constraints (we would do these in production, but not in this exercise):**
- A **vector DB / knowledge-grounding** tool for the conversation (not executable within
  the time constraint). The prototype relies on a strong system prompt and a few skills.
- Real accounts, backend, and signal plumbing (prototype data is static).

## How we would know whether it is working

- **Self-reported confidence** after the first session (the slider). Success defined in
  the same terms as the design intent.
- **Healthy signal movement** (session one watched, invite language used, members
  invited) **without pressure being the cause.**
- **Conversation quality:** leaders leave the conversation with one concrete next step or
  a delivered resource, not more confusion.
- **Outward hand-offs:** a healthy and rising share of conversations end by pointing the
  leader to real people or durable resources, evidence the tool helps without creating
  dependency.
- **Qualitative research prompts / member feedback** gathered lightly, soon after launch.
