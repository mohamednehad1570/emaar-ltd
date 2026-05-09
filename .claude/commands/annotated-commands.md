---
description: Load the Emaar annotation standard — rules for inline code comments on every component, hook, and utility in this project. Run this whenever writing or reviewing code that needs comments.
---

# Emaar International — Annotated Commands Standard

Every file in this project is annotated. Comments explain **why**, never what. A reader who can already read TypeScript and React doesn't need "maps over items" — they need "RTL flips gradient direction so text always reads from the natural reading edge."

---

## The Rule: Comment the Non-Obvious

Write a comment when:
- A value or calculation would take more than 3 seconds to understand cold
- A constraint comes from an external requirement (CLAUDE.md, browser quirk, design spec)
- A workaround exists for a specific bug or limitation
- An animation parameter was tuned deliberately (not guessed)
- A condition prevents a subtle bug that isn't obvious from the code alone

**Do not comment**:
- What a standard React hook does (`// state for open/closed`)
- What a Tailwind class does (`// makes it red`)
- What a function name already says (`// maps over items and returns JSX`)
- Boilerplate (`// return statement`, `// end of component`)

---

## Section Header Comments

Every major logical block in a component gets a single-line section header using the `──` delimiter pattern:

```tsx
{/* ── Background Slides ─────────────────────────────────── */}
{/* ── Overlay Layers ──────────────────────────────────────  */}
{/* ── Content ─────────────────────────────────────────────  */}
{/* ── Slide Indicators ────────────────────────────────────  */}
```

Keep the `──` prefix and the trailing `──────` filler to a consistent column (around 55 chars total). These headers are scannable in a 720-line file.

---

## Inline Constraint Comments

When a value is non-obvious, comment it on the same line or the line above:

```tsx
{/* pt-20 offsets the fixed 80px header so content sits in the visual centre */}
<div className="pt-20">

{/* dir=ltr preserves LTR digit order when parent is RTL */}
<span dir="ltr" className="tabular-nums">{PHONE_DISPLAY}</span>

{/* once: true — never re-triggers on scroll-up; amount: 0.2 fires early */}
viewport={{ once: true, amount: 0.2 }}

{/* staggerChildren cascades 'show' to child variants with 130ms gap */}
transition={{ staggerChildren: 0.13, delayChildren: 0.10 }}
```

---

## RTL Comments

Every RTL conditional must explain which axis/property it affects:

```tsx
{/* Gradient direction flips so the dark shoulder stays on the reading-start edge */}
className={isRTL
  ? 'bg-gradient-to-l from-brand-dark/85 via-brand-dark/55 to-brand-dark/10'
  : 'bg-gradient-to-r from-brand-dark/85 via-brand-dark/55 to-brand-dark/10'
}

{/* Scale origin flips so the line grows from the reading-start edge */}
className={`w-14 h-0.5 bg-brand-red ${isRTL ? 'origin-right' : 'origin-left'}`}

{/* Arrow rotates 180° in RTL — pointing left instead of right */}
className={isRTL ? 'rotate-180' : ''}
```

---

## Animation Comments

Explain deliberate timing choices:

```tsx
{/* 0.70s with [0.22, 1, 0.36, 1] — custom ease gives premium deceleration feel */}
transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}

{/* 6000ms — long enough for a reader to finish the headline before next slide */}
const SLIDE_MS = 6_000;

{/* bgScale up to 1.08 — outer wrapper is 10% larger so zoom never exposes edges */}
const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
```

---

## File-Level Doc Comment

Every component file over 80 lines gets a JSDoc block immediately after `'use client'`:

```tsx
'use client';

/**
 * components/home/HeroSection.tsx
 *
 * Full-viewport homepage hero with three animation layers:
 *  1. Entry stagger — each text element fades up in sequence on mount.
 *  2. Scroll-driven exit — content fades and lifts as hero scrolls off.
 *  3. Background slider — three images crossfade via AnimatePresence.
 *
 * Design rules enforced here:
 *   • Overlays use brand-dark tokens (never pure black)
 *   • RTL: gradient direction, line origin, and arrow all flip
 *   • Warm shadows only — rgba(45,41,38,x)
 */
```

Hook files get a one-liner:
```typescript
/** Drives bidirectional carousel auto-scroll; pauses on hover/touch. */
```

---

## What This Skill Loads

When invoked, annotate all code you write according to these rules. Before delivering, verify:
1. Every non-obvious value has a same-line or preceding comment
2. Every RTL conditional explains which property it affects
3. Every animation timing value explains the deliberate choice
4. Every major JSX block has a section header comment
5. No comments state the obvious — delete them if they do
