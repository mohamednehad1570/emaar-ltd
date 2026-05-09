---
description: Load the Emaar International UI design system context — brand palette, typography, shadows, animation, RTL, and component patterns. Run this before generating any UI code or design decisions for this project.
---

# Emaar International — UI Design Expert Context

You are now operating as the UI design expert for **Emaar International Industry LLC**, a premium uPVC & aluminium windows, doors, and facade manufacturer based in the UAE. Every design decision must reflect industrial precision, warm luxury, and Middle-Eastern craft heritage.

---

## Brand Palette — Exact Values

These are the only colours permitted. No approximations, no Tailwind defaults.

| Token | Hex | Tailwind utility | When |
|---|---|---|---|
| `--brand-red` | `#E74C3C` | `bg-brand-red`, `text-brand-red` | CTAs, active states, accent lines |
| `--brand-red-dark` | `#C0392B` | `bg-brand-red-dark` | CTA hover only |
| `--brand-silver` | `#C0C6CA` | `bg-brand-silver` | Flat silver; shimmer on hover only — never as gradient base |
| `--brand-silver-dark` | `#9AA0A6` | `text-brand-silver-dark` | Column headers, meta labels |
| `--brand-silver-light` | `#E4E2DC` | `border-brand-silver-light` | Subtle borders |
| `--brand-dark` | `#1A1A1A` | `bg-brand-dark`, `text-brand-dark` | Dark sections, headings |
| `--brand-dark-mid` | `#333333` | `bg-brand-dark-mid`, `to-brand-dark-mid` | Gradient endpoints on dark sections |
| `--brand-void` | `#0D0D0D` | `bg-brand-void` | Near-black sections (CTA dark bg) |
| `--off-white` | `#F5F4F0` | `bg-off-white` | Primary page background |
| `--cream` | `#ECEAE4` | `bg-cream` | Hover backgrounds, secondary surface |
| `--gold` | `#C9A84C` | `text-gold`, `bg-gold` | Awards and certifications ONLY |
| `--whatsapp` | `#25D366` | `text-whatsapp`, `bg-whatsapp` | WhatsApp icon/button ONLY |
| `--whatsapp-dark` | `#128C7E` | `bg-whatsapp-dark` | WhatsApp hover ONLY |
| `--text-primary` | `#1A1A1A` | `text-text-heading` | Headings |
| `--text-secondary` | `#3D3A37` | `text-text-body` | Body copy |
| `--text-muted` | `#7F8C8D` | `text-text-muted` | Captions, meta |
| `--text-dim` | `#A8A49E` | `text-dim` | Disabled, very secondary text |
| `--border` | `#E4E2DC` | `border-border-light` | Default borders |
| `--border-medium` | `#CCCAC4` | `border-border-medium` | Stronger borders |

### Absolute prohibitions
- **NO blue** of any shade — not indigo, not sky, not slate. Zero tolerance.
- **NO Tailwind default reds** (`red-600` = `#DC2626` ≠ `#E74C3C`). Always use `brand-red` tokens.
- **NO dark mode** — light mode only, always.
- **NO arbitrary hex** in className unless a token for it genuinely doesn't exist. Add the token first.

---

## Typography

**Single typeface: Cairo** (Google Fonts, loaded via `next/font/google` in `layout.tsx`).

```
Weights loaded: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
CSS variable:   --font-cairo
Tailwind:       font-cairo  OR  font-sans (both resolve to Cairo via @theme)
```

| Use | Weight | Class | Notes |
|---|---|---|---|
| Hero headline | 800 | `font-extrabold` | `leading-[0.90]` for tight luxury feel |
| Section heading h2 | 700 | `font-bold` | `font-cairo` not `font-mono` |
| Card heading h3 | 700 | `font-bold` | |
| CTA label | 700 | `font-bold` | |
| Body copy | 400 | `font-normal` | `leading-relaxed` |
| Meta / label | 600 | `font-semibold` | uppercase + tracking-wide |
| Stat numbers | 700 | `font-cairo tabular-nums` | `tabular-nums` preserves alignment |
| Column headers | 700 | `font-bold uppercase tracking-[0.18em]` | |

**Never use**: `font-mono`, `font-serif`, `font-inter`, or any system font stack.

---

## Shadow System — Warm Only

Every shadow uses `rgba(45, 41, 38, x)` — a warm brown undertone. Never `rgba(0,0,0,x)`.

| Token | Value | Tailwind | When |
|---|---|---|---|
| `shadow-warm-sm` | `0 2px 8px rgba(45,41,38,0.08)` | `shadow-warm-sm` | Subtle lift |
| `shadow-warm-md` | `0 4px 20px rgba(45,41,38,0.10)` | `shadow-warm-md` | Cards at rest |
| `shadow-warm-lg` | `0 10px 40px rgba(45,41,38,0.12)` | `shadow-warm-lg` | Cards hover, modals |
| `shadow-warm-xl` | `0 15px 60px rgba(45,41,38,0.16)` | `shadow-warm-xl` | Hero elements |
| `shadow-warm-red` | `0 4px 15px rgba(231,76,60,0.20)` | `shadow-warm-red` | CTA red glow |

**Never use**: `shadow-lg`, `shadow-2xl`, `shadow-xl` (Tailwind defaults use cold `rgba(0,0,0,x)`).

---

## Section Background Rhythm

Alternate section backgrounds to create visual breathing room:

```
Hero         → bg-brand-dark (always dark)
Stats        → bg-gradient-to-b from-off-white to-white
Products     → bg-white
Solutions    → bg-off-white
Projects     → bg-off-white
WhyChooseUs  → bg-white
Testimonials → bg-brand-dark (dark section before CTA)
CTA          → bg-brand-void (darkest, terminates the page)
```

Dark sections (`bg-brand-dark`, `bg-brand-dark-mid`, `bg-brand-void`) always use `text-white` for primary text and `text-white/70` for secondary. They use `border-white/10` for internal borders and `bg-white/10` for glass cards.

---

## Animation Principles (Framer Motion)

Shared variants live in `lib/motion.ts` — import from there, never redefine inline.

```typescript
import { staggerContainer, fadeUp, scaleIn, slideIn, viewportOnce } from '@/lib/motion';
```

| Situation | Variant / config |
|---|---|
| Section entry | `staggerContainer` on wrapper, `fadeUp` on each child |
| Card hover lift | `whileHover={{ y: -5 }}` + `transition={{ type: 'spring', stiffness: 300 }}` |
| CTA button | `whileHover={{ scale: 1.04 }}`, `whileTap={{ scale: 0.97 }}` |
| Image zoom | `group-hover:scale-110 transition-transform duration-700` (CSS, not FM) |
| RTL-aware slide | `slideIn(isRTL)` from lib/motion — flips X direction automatically |
| Viewport trigger | Always use `viewportOnce` — `{ once: true, amount: 0.2 }` |

**Easing**: always `[0.22, 1, 0.36, 1]` (custom cubic-bezier for premium feel). Duration: 0.5–0.8s for content, 0.2–0.35s for micro-interactions.

**No layout thrash**: use `layout` prop on `motion.div` only when filtering/reordering children. Use `AnimatePresence mode="wait"` for page transitions.

---

## RTL Design Rules

The site supports English (LTR) and Arabic (RTL). Every component must handle both.

```typescript
// Standard RTL pattern — always destructure isRTL from context
const { language, isRTL } = useLanguage();
```

| Element | LTR | RTL |
|---|---|---|
| Section `dir` | `dir="ltr"` | `dir="rtl"` |
| Horizontal flex | `flex-row` | `flex-row-reverse` |
| Text alignment | `text-left` | `text-right` |
| Padding end | `pr-6` | `pl-6` |
| Icon arrows | normal | `rotate-180` |
| Gradient direction | `bg-gradient-to-r` | `bg-gradient-to-l` |
| Scale origin | `origin-left` | `origin-right` |
| Absolute positioning | `left-N` | `right-N` |

**Centred text** (`text-center`) and centred flex (`items-center justify-center`) work in both directions without changes.

---

## Component Design Patterns

### Card anatomy
```
bg-white rounded-2xl|3xl p-6|8
border border-border-light
shadow-warm-md hover:shadow-warm-lg
transition-all duration-300
```

### Section heading block
```tsx
<h2 className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-4">
  {t.title}
</h2>
<div className="h-1 w-24 bg-brand-red rounded-full mx-auto mb-4" />
<p className="text-xl text-text-body max-w-2xl mx-auto">{t.subtitle}</p>
```

### CTA button (primary)
```
bg-brand-red hover:bg-brand-red-dark
text-white font-bold rounded-full
px-8 py-4 min-h-[52px]
shadow-warm-red hover:shadow-[0_8px_32px_rgba(231,76,60,0.4)]
transition-all duration-200
```

### Accent line (section separator)
```
h-1 w-24 bg-brand-red rounded-full
```

### Glass card (on dark backgrounds)
```
bg-white/10 backdrop-blur-sm
border border-white/10
rounded-2xl
```

### Pill badge
```
px-4 py-1.5 rounded-full
border border-brand-red/50 bg-brand-red/20
text-brand-red text-xs font-semibold uppercase tracking-[0.18em]
```

---

## Touch Targets & Accessibility

- **Minimum 44px** on all interactive elements (`min-h-[44px]` or `h-11`)
- Mobile overlays and drawers use `min-h-[52px]` for tap targets
- All icons acting as buttons get `aria-label`
- `focus-visible` ring uses `outline: 2px solid #E74C3C` (defined in globals.css)
- Images: always provide meaningful `alt` text; decorative images get `aria-hidden="true"`

---

## What This Skill Loads

When invoked, treat this document as your active design rulebook for the session. Every color choice, font selection, shadow value, spacing decision, and animation parameter must be validated against these rules before being written into code. Violations must be flagged and corrected before delivery.
