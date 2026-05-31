---
name: Emaar International Industry
description: Premium uPVC & aluminium fenestration systems — UAE
---

# Design System

## 1. Creative direction
"The Aluminum Extrusion" — the visual language takes its logic from
the product. Extruded profiles have a direction: horizontal or vertical,
never diagonal. Corners are sharp because the extrusion die doesn't round.
Silver is not decorative — it is the material.

Three-tier surface: void (#0D0D0D) → off-white (#F5F4F0) → white (#FFFFFF).
Red CTA is the anodized accent stripe — singular, deliberate, unmistakable.
Warmth comes from photography, not UI. The frame holds the view; it does
not compete with it.

## 2. Colors

### Tokens
| Token | Hex | Use |
|---|---|---|
| cta-red | #E74C3C | CTA buttons, active nav, progress indicator |
| cta-red-deep | #C0392B | Hover state of cta-red only |
| surface-white | #FFFFFF | Cards, modals, sections on off-white bg |
| surface-off-white | #F5F4F0| Primary page background |
| surface-cream | #ECEAE4 | Hover on list items, active chips, accordion |
| silver-material | #C0C6CA | Borders on hover, dividers, structural lines |
| silver-dark | #9AA0A6 | Secondary icon states, disabled field text |
| silver-light | #E4E2DC | Default card and section borders at rest |
| ink-heading | #1A1A1A | All heading text, active nav, logo |
| ink-body | #3D3A37 | Body copy, form labels |
| ink-muted | #7F8C8D | Captions, metadata, stat labels |
| ink-dim | #A8A49E | Disabled states, lowest-priority text |
| border-light | #E4E2DC | Default borders at rest |
| border-medium | #CCCAC4 | Emphasized borders, input focus |
| gold-award | #C9A84C | Certification icons and award badges ONLY |
| void | #0D0D0D | Full-bleed dark sections (CTA, hero overlay) |
| whatsapp | #25D366 | WhatsApp button ONLY — nowhere else |

### Hard rules
- Brand red ≤10% of any screen surface — one CTA per viewport
- Blue forbidden — zero tolerance, no derivatives, no blue shadows
- Gold only for certs and awards — never as general accent
- Warmth from photography — no warm UI tints or amber glows
- Silver is the material — never substitute generic CSS gray

## 3. Typography

Font: Cairo only. Weights: 300, 400, 600, 700, 800.
No second typeface — Cairo handles Arabic and Latin equally.

| Role | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|
| Display | 800 | clamp(2.75rem,5vw,5rem) | 0.90 | -0.02em |
| Headline | 700 | clamp(1.75rem,3.5vw,3rem) | 1.1 | -0.01em |
| Title | 600 | clamp(1.125rem,1.5vw,1.375rem) | 1.3 | — |
| Body | 400 | 1rem | 1.6 | — |
| Label | 600 | 0.6875rem | 1.2 | 0.22em uppercase |

Display tight leading (0.90) is intentional — stacked lines read as
a single visual mass. Never "fix" it to 1.2.
Apply text-wrap: balance on h1–h3.
Numerals in RTL: force dir="ltr" so digits stay left-to-right.

## 4. Elevation

Surfaces are flat at rest. Shadows are state-responsive only.
All shadows use rgba(45,41,38,x) — never rgba(0,0,0,x).

| Name | Value | Use |
|---|---|---|
| warm-sm | 0 2px 8px rgba(45,41,38,0.08) | Hover on small elements |
| warm-md | 0 4px 20px rgba(45,41,38,0.10) | Scrolled header |
| warm-lg | 0 10px 40px rgba(45,41,38,0.12) | Card hover |
| warm-xl | 0 15px 60px rgba(45,41,38,0.16) | Modals, mega panels |
| cta-glow | 0 4px 15px rgba(231,76,60,0.20) | CTA button rest |
| cta-glow-hover | 0 8px 32px rgba(231,76,60,0.40) | CTA button hover |

Cards: flat at rest, translateY(-4px) + warm-lg on hover.
Never shadow a card at rest.

## 5. Components

### Buttons
- 0px radius — always sharp
- Primary: bg cta-red → cta-red-deep hover, text white, 700 weight,
  padding 14px 28px, cta-glow shadow, scale(1.03) hover, scale(0.97) tap
- Ghost (dark bg only): rgba(255,255,255,0.10) bg, white border 25% opacity,
  backdrop-blur-sm. Hover: bg 17%, border 45%
- Nav CTA: same red fill, 36px height, px-16, no resting shadow
- Language toggle: bg-surface-cream active, sharp, no shadow
- Focus: outline 2px cta-red, offset 2px on :focus-visible

### Cards
- 2px radius (prevents subpixel artifact on pure 0px)
- White bg on off-white field
- border-border-light at rest → border-silver-material on hover
- No shadow at rest → warm-lg + translateY(-4px) on hover
- Padding 32px standard, 20px dense
- Never nest a card inside a card

### Navigation
- Header: 56px tall, white at rest
- Scroll >20px: rgba(255,255,255,0.95) + backdrop-blur-md + border-silver-material
- Framer Motion transition: duration 0.3, ease easeOut
- Nav links: 600 weight, 14px, ink-body → ink-heading on hover/active
- Active underline: 2px cta-red, scaleX 0→1, origin-left LTR / origin-right RTL
  easing cubic-bezier(0.22,1,0.36,1)
- Dropdowns: fit-content width, min 200px max 280px, warm-xl shadow,
  0px radius, positioned below trigger item
- Dropdown items: 44px height, px-20, hover bg-surface-cream
- Mobile overlay: spring physics stiffness 300 damping 30

### Forms
- Input height: 48px
- 0px radius
- Label always above — never floating
- Border border-light at rest → border-silver-material focus
- Error: border-cta-red + red message below field
- RTL: labels right-aligned, inputs text-right

### Stats
- Number: Cairo 700, 48px, tabular-nums, dir="ltr" forced
- Red rule above number: 8px × 2px, bg-brand-red, mb-20px
- Label: Label style, uppercase, tracking 0.18em, ink-muted

### Section dividers
- White bar, border-y border-border-light
- Hairlines: h-px bg-border-light on each side of centered label
- Label: 12px, 600, uppercase, tracking 0.25em, ink-muted

### CTA section (void bg)
- Background: void (#0D0D0D)
- One red glow: opacity 0.10 behind content
- One h-1 red-to-transparent top edge stripe
- Heading: white, Display scale
- Subtext: ink-muted, weight 300

## 6. Do's and Don'ts

DO:
- 0px radius on all buttons, inputs, tags
- Warm shadows rgba(45,41,38,x) always
- Brand red ≤10% surface — one CTA per viewport
- dir="ltr" on numerals inside RTL context
- text-wrap: balance on h1–h3
- Gold only on certs and award badges
- Test every component LTR and RTL before shipping
- prefers-reduced-motion: disable all animations when set

DON'T:
- Blue or any blue derivative — not one pixel
- rgba(0,0,0,x) in any box-shadow
- Round button corners — not even 4px
- Ornamental Arabic calligraphy or geometric Islamic patterns
- Generic UAE construction aesthetic (blue-gold, stock renders)
- Gradient text (background-clip: text)
- Decorative border-left/right wider than 1px on cards or list items
- Shadow on cards at rest
- Gold as general accent or hover color
- Second typeface
- Diagonal lines or rotated decorative shapes
