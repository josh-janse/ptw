PTW Website:

# Practicing the Way — Brand Guide

---

## 1. Brand Identity & Mission

**Name:** Practicing the Way
**Tagline:** "A pathway for apprenticeship to Jesus"
**Mission:** To help individuals and communities be with Jesus, become like him, and do as he did — through free spiritual formation resources.
**Positioning:** A crowdfunded ministry providing free discipleship resources to churches worldwide. Not a church itself — a resource hub.
**Tone of Voice:** Calm, contemplative, inviting. Minimally directive. Spiritually warm but modern and design-forward. Uses simple, direct sentences with theological depth. Never rushed or flashy. Lowercase-feeling even when capitalized. Avoids "sales-y" copy.

---

## 2. Logo

The logo consists of two elements used together:

- **Icon:** A circular arrangement of small dots/dashes that form a loose, abstract clock/sun motif. Lines (dashes) radiate at various positions around the circle. It is rendered in white (on dark/photo backgrounds) or in brand green (#405a50) on light backgrounds.
- **Wordmark:** "Practicing / the Way" stacked in two lines. Uses the same Satoshi typeface as body text. Font weight is medium/regular (400–500). All title case. Tight tracking.

The logo sits in the upper-left corner of the nav, consistently. On hero images the logo is white. On light backgrounds it shifts to dark.

---

## 3. Color Palette

All color values come directly from the site's CSS design tokens.

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Brand Green** | `#405a50` | Primary CTA buttons (bg + border), brand accents, footer wordmark, icon fills |
| **Cream** | `#fffaee` | Hero headline text, nav button labels, CTA button text on brand bg, secondary button bg |
| **Off-Black** | `#1a1a1a` | Deep dark text contexts |
| **Dark 900** | `#1f1d1e` | Darkest background panels |

### Background / Surface Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Off-White / Page Background** | `#e8e4e1` ≈ `color(srgb 0.98 0.97 0.97)` | Transitional soft page bg |
| **Light 100** | `white` | White page sections |
| **Light 200** | `#ebebeb` | Subtle light grey surfaces |
| **Pastor Light** | `#e6e1d9` | Light beige/warm white sections |
| **Section Off-White** | `rgb(233, 227, 224)` | Content section backgrounds |
| **Stats/Community Blue-Grey** | `rgb(67, 86, 99)` | Dark accent section bg (used for the "Start your journey in community" section) — text becomes Cream |

### Practice Colors (each spiritual practice has its own accent)
| Practice | Name | Hex |
|----------|------|-----|
| 1 — Sabbath | `--swatch--one-sabbath` | `#cad7cc` (muted sage green) |
| 2 — Prayer | `--swatch--two-prayer` | `#9dadb3` (muted blue-grey) |
| 3 — Fasting | `--swatch--three-fasting` | `#435663` (deep slate blue) |
| 4 — Solitude | `--swatch--four-solitude` | `#405a50` (brand green) |
| 5 — Scripture | `--swatch--five-scripture` | `#b8b0ab` (warm grey) |
| 6 — Community | `--swatch--six-community` | `#733624` (deep terracotta) |
| 7 — Service | `--swatch--seven-service` | `#e9e3e0` (pale warm off-white) |
| 8 — Generosity | `--swatch--eight-generosity` | `#a97955` (warm tan/brown) |
| 9 — Witness | `--swatch--nine-witness` | `#ac715c` (muted rust) |

### Semantic / Utility Colors
| Name | Hex | Usage |
|------|-----|-------|
| Error text | `#f23d3d` | Form validation |
| Error bg | `#fed9db` | Error state backgrounds |
| Case Study Dark | `#3a4134` | Dark olive for case study contexts |
| Pastor Dark | `#3b3b1c` | Dark olive-brown for pastor-specific pages |

---

## 4. Typography

### Typeface
**Primary (and only) font:** `Satoshi` — fallbacks: `Arial, sans-serif`
No serif fonts are used. The brand is exclusively sans-serif, which gives it a modern, approachable feel while still reading as contemplative.

### Type Scale (fluid/responsive, using CSS clamp)

| Role | CSS Variable | Min → Max |
|------|-------------|-----------|
| **Display** | `--_typography---font-size--display` | `4rem → 7rem` (64px → 112px) |
| **H1** | `--_typography---font-size--h1` | `2.25rem → 4.5rem` (36px → 72px) |
| **H2** | `--_typography---font-size--h2` | `1.875rem → 3.125rem` (30px → 50px) |
| **H3** | `--_typography---font-size--h3` | `1.5rem → 2rem` (24px → 32px) |
| **Body / Text Main** | `--_typography---font-size--text-main` | `1.125rem → 1.25rem` (18px → 20px) |

### Font Weights
| Weight | CSS Variable |
|--------|-------------|
| Regular | `400` (`--_typography---font--primary-regular`) |
| Medium | `500` (`--_typography---font--primary-medium`) |
| Bold | `700` (`--_typography---font--primary-bold`) |

Headings predominantly use **weight 400 (regular)** — this is critical to the brand's calm, unforced aesthetic. It avoids the heavy-handed feel of bold headers.

### Line Heights
- `1.0` — tightest (display, decorative)
- `1.3` — headings
- `1.5` — body text (standard)

### Letter Spacing
- **Body text:** `0em` (no extra tracking)
- **Buttons / UI labels:** `0.15em` — all-caps small labels use tracked spacing
- **Footer navigation links:** `2.1px` tracked, `text-transform: uppercase`, font-size `14px`, weight `500`

---

## 5. Button & CTA Styles

### Primary Button (Solid Brand Green)
```
Background: #405a50
Color: #fffaee (Cream)
Border: 1px solid #405a50
Border-radius: 5px
Padding: ~20px 17.6px
Font: Satoshi, 400 weight
Letter-spacing: 0.15em
Text-transform: UPPERCASE
```
Used for: Primary action CTAs on dark/photo backgrounds ("RUN COURSE", "RUN PRACTICE", "SUBSCRIBE")

### Secondary Button (Cream Solid)
```
Background: #fffaee (Cream)
Color: #405a50 (Brand Green)
Border: 1px solid #fffaee
Border-radius: 5px
Padding: ~20px 17.6px
Font: Satoshi, 400 weight
Letter-spacing: 0.15em
Text-transform: UPPERCASE
```
Used for: Main hero CTA over photo backgrounds ("EXPLORE RESOURCES")

### Outline / Ghost Button (on light bg)
```
Background: transparent
Color: #405a50
Border: 1px solid #405a50
Border-radius: 5px
Padding: ~20px 17.6px
Letter-spacing: 0.15em
Text-transform: UPPERCASE
```
Used for: CTAs sitting on cream/white section backgrounds

### Nav Utility Buttons ("Give", "Login", "Menu")
```
Background: transparent
Color: #fffaee (white on hero)
Border: 1px solid rgba(255,250,238,0.5) (semi-transparent cream)
Border-radius: 5px
Padding: 16px 17.6px
```
"Menu" button includes a 3×3 dot grid icon to its right.

---

## 6. Navigation

- **Position:** Fixed top, transparent overlay over hero images
- **Layout:** Logo at far left; "Give", "Login", "Menu" buttons at far right
- **Logo color on photo backgrounds:** White (`#fffaee`)
- **Logo on light page sections:** Transitions to dark (brand green or off-black)
- **Nav style:** Minimal, no visible navigation links in the header bar — all navigation is hidden behind the "Menu" hamburger/grid button which opens a full-screen or dropdown menu
- The nav itself has no visible background — it floats transparently over hero content

---

## 7. Layout & Grid

- **Max site width:** `112rem` (`--site--width: 112rem`)
- **Column system:** 12-column grid (`--site--column-count: 12`)
- **Column gutter:** `2.25rem` (`--site--gutter`)
- **Horizontal page margin (responsive):** `clamp(1.25rem, 0.5rem + 3.75vw, 5rem)`
- **Default border-radius:** `0rem` (flat/square edges) — this is important; cards and sections are mostly square-cornered
- **Small border-radius:** `1rem` (for rounded UI elements)
- **Tiny border-radius:** `0.5rem`
- **Button/nav border-radius:** `5px`

### Section Spacing (vertical padding between sections)
| Scale | Clamp Range |
|-------|------------|
| None | 0px |
| Small | `3rem → 5rem` |
| Main | `4rem → 7rem` |
| Large | `5.5rem → 10rem` |
| Page Top (hero pad) | `7rem → 14rem` |
| XLarge | `18rem → 20rem` |

### Common Layout Patterns
- **Full-bleed hero images** with text overlay at bottom-left; CTA button at bottom-right
- **Two-column split sections** — text on one side, image or color block on the other (50/50 split, full-height)
- **Single-column content** for body copy, max ~65 characters wide for readability
- **Horizontal carousels** with left/right arrow navigation (circular ghost buttons) for featured resources
- **Numbered step lists** using large ordinals (01, 02, 03) in light text as visual anchors

---

## 8. Imagery Style

- **Photography:** High quality, editorial-grade. Warm and natural light. Muted, desaturated-leaning tones (soft greens, warm greys, warm terracottas, linen textures)
- **Subjects:** People in community settings (homes, around tables), hands, quiet domestic scenes, nature (overcast skies, misty grey), physical books and journals, architectural/interior spaces with minimalist decor
- **Mood:** Contemplative, warm, unhurried, intimate. Never stock-photo-feeling. No bright, saturated colors in photography.
- **Hero images:** Full-bleed, full-viewport. Architecture and landscape images have a grey-green-beige tonality. Portrait-style subject images use warm amber/terracotta backgrounds.
- **Practice icons:** Each practice has a unique abstract line icon (the Sabbath icon is a clockface made from line segments/dashes arranged in a circle — minimal, hand-drawn feel)

---

## 9. Iconography

- **Logo mark:** Circular dot/dash motif — abstract radiating lines suggesting time, rhythm, practice
- **Practice icons:** Unique abstract line illustrations per practice — minimal, geometric, single-weight strokes
- **UI icons:** Simple line icons; arrow chevrons for carousels; 3×3 dot grid for the menu button
- **Icon style:** Thin stroke, monochromatic, minimal — never filled/solid icon style

---

## 10. Motion & Animation

- Text and section content animate in with a **fade + slight vertical rise** on scroll (content appears as user scrolls down)
- Hero imagery loads before text overlays appear
- Carousels slide horizontally with smooth transitions
- **Overall feel:** Nothing snappy or energetic — all motion is slow and graceful, reinforcing the "slow" and "intentional" brand values

---

## 11. Voice & Content Patterns

- **Headlines:** Sentence case, normal weight (not bold), often a single declarative phrase. Example: "A pathway for apprenticeship to Jesus", "What to Expect", "Stay in touch."
- **Body text:** First-person plural ("we've created", "our resources"). Conversational but substantive. Uses em-dashes for parenthetical thoughts.
- **CTA labels:** ALL-CAPS, short imperatives, wide letter-spacing. Example: "EXPLORE RESOURCES", "RUN COURSE", "GET STARTED", "LEARN MORE"
- **Navigation labels:** ALL-CAPS, sparse. Example: "RESOURCES", "GETTING STARTED", "FOR PASTORS"
- **Statistics display:** Large numbers (`167 Countries`, `3,300+ Monthly givers`, `23,600+ Churches`) with small label text below — used in a dark-bg section as social proof

---

## 12. Key CSS Variables Reference

```css
/* Colors */
--swatch--brand: #405a50;
--swatch--cream: #fffaee;
--swatch--off-black: #1a1a1a;
--swatch--dark-900: #1f1d1e;
--swatch--white: white;
--swatch--black: black;

/* Font */
--_typography---font--primary-family: Satoshi, Arial, sans-serif;
--_typography---font--primary-regular: 400;
--_typography---font--primary-medium: 500;
--_typography---font--primary-bold: 700;

/* Font Sizes (fluid) */
--_typography---font-size--display: clamp(4rem, 3.4rem + 3vw, 7rem);
--_typography---font-size--h1: clamp(2.25rem, 1.8rem + 2.25vw, 4.5rem);
--_typography---font-size--h2: clamp(1.875rem, 1.625rem + 1.25vw, 3.125rem);
--_typography---font-size--h3: clamp(1.5rem, 1.4rem + 0.5vw, 2rem);
--_typography---font-size--text-main: clamp(1.125rem, 1.1rem + 0.125vw, 1.25rem);

/* Border Radius */
--radius--main: 0rem;    /* Default: square */
--radius--small: 1rem;
--radius--tiny: 0.5rem;
--radius--round: 100vw;

/* Buttons */
--_button-style---letter-spacing: 0.15em;
--_theme---button-primary--background: var(--swatch--brand);
--_theme---button-primary--text: var(--swatch--cream);

/* Layout */
--site--width: 112rem;
--site--column-count: 12;
--site--gutter: 2.25rem;
--site--margin: clamp(1.25rem, 0.5rem + 3.75vw, 5rem);

/* Section Spacing */
--_spacing---section-space--main: clamp(4rem, 3.4rem + 3vw, 7rem);
--_spacing---section-space--large: clamp(5.5rem, 4.6rem + 4.5vw, 10rem);
```

---

## Summary: The "Feel" in a Sentence

> Practicing the Way is **Satoshi at 400 weight**, on a **warm off-white or desaturated photo background**, with **plenty of whitespace**, **muted sage green CTAs**, and a calm, **contemplative pace** — it looks like a premium editorial spiritual journal, not a tech product or traditional church website.

---

PTW App:

# Practicing the Way — Brand Guide

*Extracted from `launch.practicingtheway.org` — Reference document for UX replication tasks*

---

## 1. Brand Identity & Tone

**Name:** Practicing the Way
**Tagline:** "A simple, beautiful way to integrate spiritual formation into your church or group."
**Voice:** Quiet, contemplative, warm. Invitational rather than directive. Spiritually grounded but accessible. Uses unhurried, reflective language — e.g., "Make space every few months to prayerfully reflect on your apprenticeship to Jesus." Sentences are measured and meditative.

**App Purpose:** A spiritual formation platform for churches and small groups — centered around Courses, Practices, a Rule of Life, and Spiritual Health Reflection.

---

## 2. Color System

The app uses a fully custom Tailwind color palette with named tokens. Colors are earthy, muted, and warm — drawn from nature and monastic aesthetics.

### Core Brand Colors

| Token Name | Hex | RGB | Usage |
|---|---|---|---|
| `witness-100` | `#AC715C` | rgb(172, 113, 92) | Primary brand/accent — CTA buttons, active nav, links |
| `ptw-salmon` | `#AC715C` | rgb(172, 113, 92) | Alias for primary color |
| `bright-white` | `#F6F3F3` | rgb(246, 243, 243) | App background (body) — off-white with warm pink tint |
| `eerie-black` | `#1A1A1A` | rgb(26, 26, 26) | Primary text color |
| `downy-fluff` | `#EDE7E4` | rgb(237, 231, 228) | Hover state backgrounds, borders |
| `creamy` | `#E9E3E0` | rgb(233, 227, 224) | Subtle borders, card borders |
| `froth` | `#C5B6AE` | rgb(197, 182, 174) | Muted/subdued text, placeholder states |
| `dark-mud` | `#684037` | rgb(104, 64, 55) | Avatar background, dark accent |
| `ptw-mud` | `#733624` | rgb(115, 54, 36) | Deep rust brown accent |

### Structural / Surface Colors

| Token | RGB | Usage |
|---|---|---|
| `service-20` | rgb(250, 248, 248) | Very light surface |
| `service-40` | rgb(246, 243, 243) | Same as bright-white |
| `service-60` | rgb(242, 236, 232) | Light warm surface, card backgrounds |
| `service-80` | rgb(237, 231, 228) | Same as downy-fluff |
| `service-100` | rgb(233, 227, 224) | Same as creamy |
| `service-120` | rgb(223, 214, 210) | Slightly darker warm tone |
| `service-140` | ~rgb(212, 200, 195) | Darkest service shade |

### Practice / Feature Colors

| Token | RGB | Visual | Practice Association |
|---|---|---|---|
| `be-with-jesus` | rgb(159, 178, 182) | Muted blue-grey | Prayer, Contemplation |
| `ptw-cold-blue` | rgb(157, 173, 179) | Cool slate-blue | Prayer features |
| `ptw-navy` / `dark-slate` | rgb(67, 86, 99) | Deep navy | Groups, darker features |
| `solitude-100` / `ptw-dark-green` / `patio-green` | rgb(64, 90, 80) | Forest green | Solitude, Reflection |
| `ptw-mint` | rgb(202, 215, 204) | Soft sage green | Sabbath |
| `community-100` / `ptw-mud` | rgb(115, 54, 36) | Deep rust | Community |
| `become-like-jesus` | rgb(210, 158, 68) | Warm amber/gold | Formation concepts |
| `do-as-jesus-did` | rgb(203, 109, 63) | Burnt orange | Active discipleship |
| `ptw-brown` | rgb(196, 186, 181) | Warm mushroom | Neutral warm |
| `ptw-pale-lily` | rgb(242, 236, 232) | Blush-cream | Light accent |
| `neutrals-light` | rgb(255, 250, 238) | Cream/parchment | Warm neutral |

### Text Colors in Context

- **Body text:** `rgba(26, 26, 26, 1)` — near-black
- **Muted/secondary text:** `rgba(26, 26, 26, 0.65)` — 65% opacity eerie-black
- **Active nav / accent text:** `rgb(172, 113, 92)` — witness-100/salmon
- **White text on dark bg:** `rgb(255, 255, 255)` — used on colored hero cards
- **Froth (subtle label):** `rgb(197, 182, 174)`

---

## 3. Typography

### Font Family

**Primary (and only) typeface:** `Satoshi`, fallback `"Helvetica Neue"`, `sans-serif`

Satoshi is a modern geometric sans-serif with humanist warmth. It is used across all type — headings, body, buttons, navigation.

### Type Scale

| Style | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display / H1 | ~40px (clamp) | 400 (Regular) | ~125% | Page titles ("Welcome to Practicing the Way") |
| H2 | 34–40px | 400 | ~125% | Section headings |
| H3 / Section | ~24px | 400–500 | ~130% | Sub-section headers |
| Body Large | ~19px | 400 | ~150% | Lead paragraphs, hero subtitles |
| Body | 16px | 400 | 24px (150%) | General body text |
| Nav Item | 16px | 500 | 24px | Primary nav links |
| Nav Sub-item | 12px | 500 | 16px | Secondary nav items |
| Button | 16px | 500 | 24px | All CTA buttons |
| Label/XS | 12px | 400–500 | ~16px | Tags, labels, small indicators |

**Key characteristics:**
- Headings use **regular weight (400)** — never bold. This creates the calm, unhurried aesthetic.
- Body text is also regular weight.
- Medium weight (500) is reserved for UI elements: buttons, nav links, labels.
- No uppercase transforms anywhere.
- No decorative or display fonts. Single typeface throughout.

---

## 4. Layout & Spacing

### App Shell

- **Body background:** `#F6F3F3` (bright-white) — covers the entire viewport
- **Layout type:** Sidebar + main content — classic two-column app shell
- **Left sidebar width:** `232px`, sticky (`sticky top-0 h-dvh`)
- **Sidebar background:** transparent (inherits body `#F6F3F3`)
- **Sidebar padding:** 16–24px horizontal
- **Main content area:** flex-auto, scrollable, `max-w-7xl` content constraint, padding `p-5` to `p-8`
- **Mobile nav:** Fixed bottom bar, `h-16`, 5-column grid (bottom tab bar pattern)

### Grid & Spacing

- Base spacing unit: 4px (Tailwind default)
- Common spacings used: `p-1.5` (6px), `p-2` (8px), `p-4` (16px), `p-5` (20px), `p-6` (24px), `p-8` (32px)
- Gap utilities: `gap-1` through `gap-6`
- Section-to-section vertical rhythm: 16–40px (`mb-5` to `xl:mb-10`)
- Content max-width: `max-w-7xl` (1280px)

---

## 5. UI Components

### Buttons

**Primary CTA Button:**
- Background: `#AC715C` (witness-100/salmon)
- Text: `#FFFFFF`
- Border radius: `0.75rem` (12px) — using `.radius-button` class
- Padding: `16px 20px` (py-4 px-5)
- Font: Satoshi 500, 16px
- No border
- Example: "Create a group", "Add Focus Area", "Start a Course or Practice"

**Secondary / Outline Button:**
- Background: transparent
- Text: `#AC715C` (witness-100)
- Border: `1px solid rgb(233, 227, 224)` (creamy) — sometimes `rgb(172, 113, 92)` (salmon)
- Border radius: `0.75rem` (12px) or `rounded-lg` (8px)
- Padding: `8px 12px` (px-3 py-2)
- Font: Satoshi 500, 16px
- Examples: "Preview Resources", "Preview Course", "View / Edit", "Print"

**Ghost / Utility Button (Give, Help):**
- Background: transparent
- Text: `rgba(26, 26, 26, 0.65)`
- Border: `1px solid rgb(233, 227, 224)`
- Border radius: `rounded-lg` (8px)
- Padding: `8px 12px`

**Light Button on Dark Background:**
- Background: `#FFFFFF`
- Text: `rgb(20, 20, 19)` (near-black)
- Border radius: `radius-button` (12px)
- Padding: `16px 24px`
- Example: "Start Your Reflection", "Begin Reflection" on the slate-blue hero

### Cards / Panels

**Main Content Card:**
- Background: `#FFFFFF`
- Border radius: `radius-md` = `clamp(1rem, 0.77rem + 0.76vw, 1.5rem)` (~16–24px, fluid)
- Box shadow: `shadow-md` = `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`
- No border
- Padding: `p-5` to `p-8` (20–32px)

**Hero / Feature Card (colored):**
- Border radius: `radius-md` (same as above)
- Background: practice-specific colors (blue-grey, dark green, etc.)
- White text on top of colored backgrounds
- Has subtle animated/illustrated elements (geometric patterns, abstract marks)
- Overflow hidden

**Rule of Life / Practice Item Card:**
- Background: `#FFFFFF`
- Border radius: `rounded-[24px]` (24px)
- Shadow: `shadow-[0px_30px_40px_-20px_#00000026]` — large diffuse shadow
- Padding: `p-4` or `p-5`

**Active Nav Item Highlight:**
- The active nav item uses a `::before` pseudo-element with `bg-downy-fluff` (rgb 237, 231, 228) or `bg-white` as a pill-shaped background
- Border radius: `rounded-xl` (12px)
- The active icon + text becomes `text-witness-100` (#AC715C)

### Navigation

**Left Sidebar (Desktop):**
- Width: 232px, sticky
- User profile at top: initials avatar (dark-mud bg `#684037`, white text), name, chevron dropdown
- Primary links (with icons): Home, Groups, Rule of Life, Reflection — icon size `size-9` (36px), `mr-1.5`
- Secondary links (text only): Courses + Practices, Leader Training, Teaching Materials, Giving
- Bottom utilities: Give button, Help button
- Nav item padding: `p-1.5` (6px)
- Item hover: `before:bg-downy-fluff` pill highlight at `rounded-xl`

**Mobile Bottom Bar:**
- Fixed, `h-16`, 5-column grid
- Border-top: `1px` border with downy-fluff color
- Background: bright-white (`#F6F3F3`)

### Icons

- All icons are custom inline SVGs
- Style: stroke-based (line icons), `stroke-width: 1.5`, `stroke: currentColor`
- ViewBox: `0 0 24 24`
- Size in nav: `1em × 1em` rendered at 36px container
- Class: `icon-stroke`
- Icon set appears to be a custom set similar to Phosphor or Heroicons style
- Icon descriptions:
  - **Home:** House/roof shape outline
  - **Groups:** Dashed circle with orbit dots (circular/community motif)
  - **Rule of Life:** Grid/layout icon (four squares)
  - **Reflection:** Concentric arcs (radial waves motif)

### Avatar / User Badge

- Shape: `rounded-full` circle
- Background: `dark-mud` — `rgb(104, 64, 55)` (deep brown)
- Text: White, initials (2–4 chars), font-weight 500
- Size: ~40px diameter

### Practice Thumbnail Tiles

- Square tiles with abstract geometric SVG marks (tally marks, circles, lines — representing each practice symbolically)
- Corner radius: `rounded-xl` or `rounded-[24px]`
- Each practice has a unique assigned color:
  - Sabbath → Sage green (`ptw-mint`, `#CAD7CC`)
  - Prayer → Muted blue-grey (`be-with-jesus`, `#9FB2B6`)
  - Fasting → Navy (`dark-slate`, `#435663`)
  - Solitude → Forest green (`solitude-100`, `#405A50`)
  - Generosity → Warm mushroom (`ptw-brown`, ~`#C4BAB5`)
  - Community → Deep rust (`community-100`, `#733624`)
  - The Practicing the Way Course → Pale blush (`ptw-pale-lily`, `#F2ECE8`)

### Tags / Badges

- "Weekly" badge on rule-of-life activity cards
- Background: `solitude-100` (dark green) or similar
- Text: white
- Border radius: `rounded-full` or `rounded-[6px]`
- Font: Satoshi 12px, 500
- Padding: `px-2 py-0.5`

---

## 6. Border Radius System

The app uses a fluid, custom radius scale:

| Class | Value | Typical Use |
|---|---|---|
| `radius-xs` | `clamp(0.375rem, ~0.76vw, 0.5rem)` | Tiny elements |
| `radius-sm` | `clamp(0.75rem, 0.64rem + 0.38vw, 1rem)` | Small cards |
| `radius-button` | `0.75rem` (12px) | All buttons |
| `radius-md` | `clamp(1rem, 0.77rem + 0.76vw, 1.5rem)` | Main cards / panels |
| `radius-lg` | `clamp(1.5rem, 1.27rem + 0.76vw, 2rem)` | Large feature cards |
| `rounded-xl` | `12px` | Nav item hover pills, thumbnails |
| `rounded-lg` | `8px` | Small utility buttons |
| `rounded-full` | `9999px` | Avatar, pill badges |

---

## 7. Shadow System

| Tailwind Class | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Icon bg, small elevations |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Standard cards |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Hero feature cards |
| `shadow-[0px_30px_40px_-20px_#00000026]` | Custom diffuse shadow | Practice activity cards |

---

## 8. Visual Language & Imagery

**Overall Aesthetic:** Contemplative, analog, artisanal. The design evokes monastic simplicity — materials feel like paper, linen, stone, and earth.

**Hero/Feature Cards:** Use abstract animated SVG illustrations — orbital rings with glowing spheres (representing planets or spiritual luminaries), abstract geometric marks. No photography used in cards; all illustrative.

**Practice Tiles:** Small abstract marks — tally lines, circles, brackets — loosely representing a practice's essence in a minimal, almost hand-drawn way. These are purely abstract, not literal icons.

**Photography:** Used sparingly. Where used (e.g., video thumbnail on home), it features real people in natural/neutral environments, with warm but desaturated toning. The background colors of the app are clearly warm-neutral (not clinical white).

**Intro/Loading Prayer Screen:** Full-screen dark grey-blue overlay with white centered text — a liturgical prayer quote displayed before entering the app. Uses a blurred abstract background image.

**No decorative illustrations** beyond the abstract tile marks and orbital motifs. Clean, restrained.

---

## 9. Motion & Interaction

- Transitions are subtle: `transition-opacity` on nav highlights
- Hover states: pill background appears behind nav items with `rounded-xl` radius
- No bold animations — the brand aesthetic discourages excitement in favor of stillness
- Hover on cards: `group-hover:bg-downy-fluff` (very subtle warmth shift)

---

## 10. Key Tailwind Config Summary (for Dev Reference)

```js
// Tailwind extended colors (brand tokens)
colors: {
  'bright-white':      '#F6F3F3',  // app background
  'eerie-black':       '#1A1A1A',  // primary text
  'witness-100':       '#AC715C',  // PRIMARY accent (salmon/terracotta)
  'witness-90':        '#B17965',  // lighter witness
  'downy-fluff':       '#EDE7E4',  // hover bg
  'creamy':            '#E9E3E0',  // borders
  'froth':             '#C5B6AE',  // muted text
  'dark-mud':          '#684037',  // avatar bg
  'ptw-mud':           '#733624',  // deep rust
  'ptw-salmon':        '#AC715C',  // alias witness
  'ptw-navy':          '#435663',  // dark navy
  'dark-slate':        '#435663',  // alias navy
  'ptw-dark-green':    '#405A50',  // forest green
  'solitude-100':      '#405A50',  // alias dark green
  'patio-green':       '#405A50',  // alias dark green
  'ptw-mint':          '#CAD7CC',  // sage green
  'ptw-cold-blue':     '#9DADB3',  // cool blue-grey
  'be-with-jesus':     '#9FB2B6',  // muted sky blue
  'ptw-brown':         '#C4BAB5',  // warm mushroom
  'ptw-pale-lily':     '#F2ECE8',  // blush pale
  'ptw-creamy':        '#E9E3E0',  // alias creamy
  'ptw-off-white':     '#ECECEC',  // near white
  'neutrals-light':    '#FFFAEE',  // parchment cream
  'community-100':     '#733624',  // alias mud
  'become-like-jesus': '#D29E44',  // amber gold
  'do-as-jesus-did':   '#CB6D3F',  // burnt orange
  'error-tint':        '#FEF2F2',  // error surface
  'service-20':  '#FAF8F8',
  'service-40':  '#F6F3F3',
  'service-60':  '#F2ECE8',
  'service-80':  '#EDE7E4',
  'service-100': '#E9E3E0',
  'service-120': '#DFD6D2',
}

// Custom border radius (fluid clamp values)
borderRadius: {
  'button': '0.75rem',
  'md': 'clamp(1rem, 0.77rem + 0.76vw, 1.5rem)',
  'lg-custom': 'clamp(1.5rem, 1.27rem + 0.76vw, 2rem)',
  'sm': 'clamp(0.75rem, 0.64rem + 0.38vw, 1rem)',
}

// Font
fontFamily: {
  sans: ['Satoshi', '"Helvetica Neue"', 'sans-serif'],
}
```

---

## 11. Do's and Don'ts

**Do:**
- Use Satoshi at regular weight (400) for all headings
- Keep the palette warm and earthy — no cool grays or pure whites
- Use `#F6F3F3` (not `#FFFFFF`) as the base background
- Soft, rounded corners everywhere (minimum 8px)
- Let whitespace breathe — generous padding and spacing
- Use the salmon/terracotta (`#AC715C`) as the single accent color
- Keep copy calm and reflective in tone

**Don't:**
- Don't use bold headings — the brand is "regular weight everything"
- Don't use vibrant saturated colors — keep tones muted and earthy
- Don't use hard shadows or dramatic depth
- Don't use uppercase type transforms
- Don't use multiple accent colors in a single context
- Don't crowd elements — maintain spacious, monastery-like layouts