---
name: Emaar International Industry
description: Premium uPVC & aluminium fenestration systems — UAE
colors:
  cta-red: "#E74C3C"
  cta-red-deep: "#C0392B"
  surface-white: "#FFFFFF"
  surface-off-white: "#F5F4F0"
  surface-cream: "#ECEAE4"
  silver-material: "#C0C6CA"
  silver-dark: "#9AA0A6"
  silver-light: "#E4E2DC"
  ink-heading: "#1A1A1A"
  ink-body: "#3D3A37"
  ink-muted: "#7F8C8D"
  ink-dim: "#A8A49E"
  border-light: "#E4E2DC"
  border-medium: "#CCCAC4"
  gold-award: "#C9A84C"
  void: "#0D0D0D"
typography:
  display:
    fontFamily: "'Cairo', sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Cairo', sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Cairo', sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Cairo', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Cairo', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  none: "0px"
  minimal: "2px"
  soft: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.cta-red}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.cta-red-deep}"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,0.17)"
  nav-cta:
    backgroundColor: "{colors.cta-red}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.none}"
    height: "36px"
    padding: "0 16px"
  nav-cta-hover:
    backgroundColor: "{colors.cta-red-deep}"
  card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.minimal}"
    padding: "32px"
  card-hover:
    backgroundColor: "{colors.surface-white}"
---

# Design System: Emaar International Industry

## 1. Overview

**Creative North Star: "The Aluminum Extrusion"**

The visual system takes its logic from the product itself. Extruded aluminum profiles have a direction: horizontal or vertical, never diagonal. Their tolerances are tight. Their corners are sharp because the extrusion die doesn't round. The silver is not a decorative choice — it is the material. This is a design system that behaves the way the product is made.

The three-tier surface structure (void → off-white → white) mirrors the product's own material logic: raw dark substrate, treated surface, finished face. The silver system carries the material's identity. The red CTA is the anodized accent stripe on an otherwise bare metal surface — singular, deliberate, unmistakable. Use it sparingly; its power is its rarity.

Warmth in this system does not come from the UI. It comes from the interior photography: sunlight through glazing, timber floors seen through large-format windows, the glow of a lit residence at dusk. The UI is the frame. The photography is the view. Wherever the interface meets an image, it steps back. No overlapping decorative elements. No tinted overlays layered on top of photography for aesthetic effect. The frame's job is to hold the view, not compete with it.

**Key Characteristics:**
- Sharp corners throughout — `border-radius: 0px` on all interactive elements; `2px` on cards as minimum structural rounding only
- Two-axis discipline — lines, dividers, and layout rules run horizontally or vertically; no diagonal accents, no rotated decorative shapes
- One accent color — brand red (#E74C3C) on ≤10% of any screen surface; its rarity is the point
- Silver as material — the neutral system reads as the metal itself, not as gray
- Typography in a single family — Cairo carries both Arabic and Latin; weight and scale create all hierarchy
- Motion serves the frame — transitions reveal content; they do not animate the frame itself

## 2. Colors: The Material Palette

A narrow, disciplined palette derived from the physical materials. Off-white and silver are the working surfaces. Red is the single functional accent. Gold is sequestered to certification and award contexts only.

### Primary
- **Anodized Red** (#E74C3C / oklch(58% 0.227 26)): The sole CTA color. Buttons, links on dark fields, active state underlines in navigation, and the slide-progress indicator. Used on ≤10% of any screen. Never as a background tint across large surface areas.
- **Anodized Red Deep** (#C0392B / oklch(51% 0.209 26)): Hover state of Anodized Red only. Never used as a primary color in its own right.

### Secondary
- **Raw Silver** (#C0C6CA / oklch(79% 0.008 220)): The material itself. Flat at rest; shimmer on hover via a scanned-light animation only. Used for borders on interactive silver elements, secondary icon color, and the trust-strip divider lines.
- **Silver Dark** (#9AA0A6 / oklch(67% 0.008 220)): Darker silver for contrast situations — secondary icon states, disabled field text on light backgrounds.
- **Silver Light** (#E4E2DC / oklch(91% 0.005 70)): Light-end of the border system. The default border value on cards, dividers, and section separators.

### Tertiary
- **Award Gold** (#C9A84C / oklch(73% 0.14 78)): Reserved exclusively for certification icons and award/badge contexts as defined in CLAUDE.md. Never used as a background, button color, or decorative accent.
- **WhatsApp Green** (#25D366): The WhatsApp brand color. Used only on the WhatsApp icon element in the header. Never reused for any other green treatment anywhere on the site.

### Neutral
- **Void** (#0D0D0D / oklch(8% 0.002 220)): Full-bleed dark sections — the bottom CTA section and hero overlay base. The deepest surface in the three-tier stack.
- **Ink Heading** (#1A1A1A / oklch(14% 0.003 220)): All heading text. Also the brand-dark token used for the logo, nav text at active state, and dark container backgrounds.
- **Ink Body** (#3D3A37 / oklch(28% 0.006 60)): All body copy and form label text. Never on a background darker than off-white.
- **Ink Muted** (#7F8C8D / oklch(58% 0.01 200)): Captions, metadata, stat labels, and certification dates. Contrast-checked at 4.5:1 against white and off-white.
- **Ink Dim** (#A8A49E / oklch(69% 0.007 70)): Disabled states and the lowest-priority text tier. Never used for body copy.
- **Surface White** (#FFFFFF): Interactive card backgrounds, modal overlays, and sections that contrast against the off-white body.
- **Surface Off-White** (#F5F4F0): The primary page background. The treated aluminum surface.
- **Surface Cream** (#ECEAE4): Hover state of list items and mobile accordion rows. Active chips. One tone below off-white.
- **Border Light** (#E4E2DC): Default card and section borders at rest.
- **Border Medium** (#CCCAC4): Emphasized borders on hover, input strokes.

### Named Rules

**The One Voice Rule.** Brand red (#E74C3C) occupies ≤10% of any given screen surface at any time. Its rarity is the point. If more than one element on a screen is red, one of them is wrong.

**The No-Warmth-In-UI Rule.** Warmth is a photography responsibility, not a UI responsibility. Do not add tinted warm overlays, amber glows, or warm-hued gradients to UI elements. The surfaces are industrial neutrals. The photographs are warm. They do each other's job.

**The Material Rule.** Silver (#C0C6CA) is the material, not a gray default. It is used where the product itself would be visible: borders, structural dividers, secondary icon states. Never use a generic CSS gray (`#808080`, `#999999`) as a substitute; reach for a named silver token.

## 3. Typography

**Display / Body Font:** Cairo (Google Fonts) — weights 300, 400, 600, 700, 800 loaded.
**No second family.** Cairo carries both Arabic and Latin with identical weight and rendering. A second font family would break the Arabic-English parity this site requires.

**Character:** Cairo at weight 800 is authoritative and direct — it doesn't lean toward the ornamental Arabic calligraphy tradition and it doesn't default to the cold geometric sans of European industrial design. It occupies a middle register: modern, Arabic-native, legible at large display sizes in both scripts. Weight contrast (800 → 400) creates all hierarchy without needing a second typeface.

### Hierarchy

- **Display** (800, `clamp(2.75rem, 5vw, 5rem)`, leading 0.90, tracking −0.02em): Hero headlines only. The extreme tight leading is intentional — stacked lines read as a single visual mass, like a stamped nameplate. Apply `text-wrap: balance` to prevent ragged wrapping. Never exceed 6rem / ~96px as the computed max.
- **Headline** (700, `clamp(1.75rem, 3.5vw, 3rem)`, leading 1.1, tracking −0.01em): Section headers and page titles. The step down from display; still commanding, not ornamental.
- **Title** (600, `clamp(1.125rem, 1.5vw, 1.375rem)`, leading 1.3): Card headers, feature names, sub-section labels. Semibold keeps it distinct from body without the heaviness of bold.
- **Body** (400, `1rem`, leading 1.6): All running prose. Max line length 65–75ch. Cairo Regular in Arabic and Latin reads cleanly at this size; do not drop below 1rem for body copy.
- **Label** (600, `0.6875rem` / `11px`, leading 1.2, tracking 0.22em, uppercase): Section eyebrow dividers, stat labels, certification dates, navigation metadata. Strictly for ≤4-word short identifiers. Never for body sentences.

### Named Rules

**The Single Family Rule.** Cairo is the only typeface on this site. Adding a second family — for display, for mono, for "visual interest" — breaks the Arabic-Latin parity that gives the site its coherence. Weight and scale contrast create all hierarchy.

**The Tight Display Rule.** Display headings use `line-height: 0.90`. This is intentional. The visual mass of a tight stacked headline is the design. Do not "fix" it to 1.2.

## 4. Elevation

This system uses a **frame-and-view philosophy**, not a layering philosophy. The UI is a structural aluminum frame; surfaces are flat at rest. Shadows are state-responsive, not decorative: they appear only when an element is interactive and hovered, or when a floating layer (modal, dropdown) is rendered above the document flow.

All shadows use warm values (`rgba(45, 41, 38, x)`) — never `rgba(0, 0, 0, x)`. The warm base softens the shadow so it reads as part of the material system, not as a generic CSS default.

### Shadow Vocabulary

- **Warm SM** (`0 2px 8px rgba(45, 41, 38, 0.08)`): Subtle lift for hover states on small interactive elements (language toggle, mega panel icon boxes on hover).
- **Warm MD** (`0 4px 20px rgba(45, 41, 38, 0.10)`): Scrolled header state. Applied by Framer Motion when `scrollY > 20`.
- **Warm LG** (`0 10px 40px rgba(45, 41, 38, 0.12)`): Card hover elevation. The card lifts on hover; this is the only time a card has a shadow.
- **Warm XL** (`0 15px 60px rgba(45, 41, 38, 0.16)`): Modal and mega-panel ambient shadow. Structural floating elements only.
- **CTA Red Glow** (`0 4px 15px rgba(231, 76, 60, 0.20)`): The red button's resting shadow. Reinforces the CTA as an active, pressable object against a neutral field. Deepens to `0 8px 32px rgba(231, 76, 60, 0.40)` on hover.

### Named Rules

**The Frame Rule.** Surfaces are flat. The UI is the frame; shadows are not the default. Never add a shadow to a card at rest — only on hover, as a response to user intent. The hover shadow is the signal that the card is interactive; resting shadows are visual noise.

**The Warm Shadow Rule.** All `box-shadow` values use `rgba(45, 41, 38, x)` as the shadow color. The value `rgba(0, 0, 0, x)` is banned. A cold black shadow reads as a UI framework default; the warm shadow reads as part of the material.

## 5. Components

### Buttons

Sharp, decisive, and physically pressable. No radius. The CTA button is the red accent stripe — singular on any screen.

- **Shape:** 0px radius (`border-radius: 0`). Buttons have the geometry of an extruded aluminum profile end-section.
- **Primary:** Background `#E74C3C` → `#C0392B` on hover. Text white, weight 700. Padding `14px 28px`. Resting shadow: CTA Red Glow. Hover shadow deepens. `scale(1.03–1.04)` on hover via Framer Motion `whileHover`; `scale(0.97)` on tap.
- **Ghost (on dark):** `rgba(255,255,255,0.10)` background, `border: 1px solid rgba(255,255,255,0.25)`, `backdrop-filter: blur(8px)`. Text white. Hover: background → `rgba(255,255,255,0.17)`, border → `rgba(255,255,255,0.45)`. Used on the hero field only — never on light backgrounds.
- **Nav CTA (header):** Same red fill as primary but 36px height (`h-9`) and horizontal padding `16px`. No shadow at rest; `:hover` color deepens.
- **Language Toggle:** Background `surface-cream`, text `ink-heading`, weight 700. Hover to `border-light`. Fully sharp. No shadow, no border.
- **Focus:** All buttons use `outline: 2px solid #E74C3C; outline-offset: 2px` on `:focus-visible`. This matches the global `:focus-visible` rule.

### Cards / Containers

The card is a finished panel on the aluminum frame. Sharp corners; border at rest, never shadow.

- **Corner Style:** `border-radius: 2px` — the minimum that prevents the subpixel rendering artifact on pure 0px corners.
- **Background:** Surface white (#FFFFFF) on an off-white page field.
- **Shadow Strategy:** Flat at rest. On hover: `translateY(-4px)` + Warm LG shadow appears.
- **Border:** `1px solid #E4E2DC` at rest → `1px solid #C0C6CA` (Raw Silver) on hover.
- **Internal Padding:** `2rem` (32px) standard. Dense data contexts: `1.25rem` (20px).
- **Nesting:** Never nest a card inside a card.

### Navigation

The header is 52px tall, white at rest, `rgba(255,255,255,0.95)` with `backdrop-filter: blur(12px)` when `scrollY > 20`. The Framer Motion transition is `duration: 0.3, ease: 'easeOut'`.

- **Desktop nav links:** `text-sm font-semibold`, `#3D3A37` at rest → `#1A1A1A` on hover and active. A `2px` red underline scales from 0 to 1 on hover (`origin-left` in LTR, `origin-right` in RTL) using `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Mega panel:** Full-width, `bg-white border-b border-border-light`. Hover items: `bg-off-white` icon box → `bg-cream` on hover. No shadow.
- **Mobile overlay:** Slides from the off-screen edge. Active items: `text-brand-red bg-cream`. Sub-nav indent: `2px brand-red/20` left or right border. Pinned bottom bar holds the primary CTA.

### Stat Display

Raw numerals on a flat white field. No cards, no containers, no borders.

- **Number:** Cairo Bold (700), `3rem` (48px), `tabular-nums`, `dir="ltr"` forced so digits are always left-to-right.
- **Rule:** `8px × 2px` brand-red bar above the number. `margin-bottom: 20px`.
- **Label:** Label style — uppercase, tracking 0.18em, `ink-muted`.

### Certifications / Trust Band

A compact horizontal strip on white with `border-y border-border-light`. Deliberately understated — it reads as a divider, not a section.

- **Icon color:** `gold-award` (#C9A84C) only. This is the only permitted context for gold.
- **Label:** `text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted`. One-line centered heading above the items.

### Section Dividers

Horizontal rules with a centered uppercase label. `bg-white border-y border-border-light`, `h-px flex-1 bg-border-light` hairlines on each side of the label.

- **Label style:** `text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted`.
- **Anatomy:** The divider is a white bar; the hairlines and label sit inside it. On a non-white surrounding section, the white bar creates visible contrast.

### CTA Section (Full-bleed Dark)

The bottom conversion section uses the void background (`#0D0D0D`). One pulsing red glow at `opacity: 0.10` behind the content. One `h-1` red-to-transparent top edge stripe. No other decorative layers.

- **Heading:** White, Display scale.
- **Subheading:** `text-ink-muted`, weight 300, `font-light`.
- **CTA button:** Standard primary, 1.15× font size, `px-10 py-5`.

## 6. Do's and Don'ts

### Do:

- **Do** use `border-radius: 0px` on all buttons, inputs, and tags. The product's geometry is sharp.
- **Do** keep shadows warm: `rgba(45, 41, 38, x)`. Swap `rgba(0, 0, 0, x)` for the warm equivalent every time.
- **Do** keep brand red at ≤10% of any screen surface. One primary CTA per viewport.
- **Do** force `dir="ltr"` on numerals and codes rendered inside an Arabic (`dir="rtl"`) context so digit order is always left-to-right.
- **Do** let photography carry warmth. The UI surfaces are industrial neutrals (#F5F4F0, #FFFFFF, #ECEAE4); images provide the heat.
- **Do** apply `text-wrap: balance` on h1–h3 elements to prevent ragged line endings.
- **Do** use gold (#C9A84C) only on certification icons and award badges — precisely as stated in CLAUDE.md.
- **Do** use Cairo weight 800 for display and hero headings, and hold back on using it for smaller text where weight 600 or 700 is more appropriate.
- **Do** respect the bilingual contract: every component, animation, and layout decision must be tested in both LTR (English) and RTL (Arabic) before shipping.

### Don't:

- **Don't** add blue or any blue derivative to any element, shadow, or border. Not navy, not slate, not steel — not one pixel. This is a zero-tolerance rule.
- **Don't** use `rgba(0,0,0,x)` in any `box-shadow`. The warm shadow equivalent is `rgba(45,41,38,x)`.
- **Don't** round button corners. Not even 4px "for softness." Sharp corners are the brand's geometric language.
- **Don't** use ornamental Arabic calligraphic patterns, geometric Islamic tile patterns, or traditional decorative borders anywhere on the site. Emaar is a contemporary precision manufacturer, not a heritage brand.
- **Don't** default to the stock UAE construction company aesthetic: blue-and-gold palette, generic villa renders, low-contrast stock photography. Every visual decision should sit clearly above the category default.
- **Don't** apply gradient text (`background-clip: text`). A single solid color. Emphasis through weight or scale.
- **Don't** add decorative side-stripe `border-left` or `border-right` accents wider than 1px as styling on cards, list items, or callouts. The exception is the mobile sub-nav indent which is structural, not decorative, and uses `rgba(231,76,60,0.20)`.
- **Don't** put a shadow on a card at rest. Only hover reveals the shadow. Resting shadows on flat cards flatten the entire depth hierarchy.
- **Don't** use gold (#C9A84C) as a general accent, decorative highlight, or hover color. It exists only for certifications and awards. Reaching for it elsewhere is the first sign of scope creep into generic UAE luxury aesthetics.
- **Don't** introduce a second typeface. Not for mono, not for display accents, not for Arabic only. Cairo handles both scripts. A second family breaks parity.
- **Don't** add diagonal lines, rotated shapes, or angled decorative elements. The visual grammar is horizontal and vertical only — the same axes as the extrusion dies.
