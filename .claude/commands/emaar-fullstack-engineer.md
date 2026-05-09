---
description: Load the Emaar International fullstack engineering context — stack, file conventions, component rules, data patterns, RTL implementation, and code quality standards. Run this before writing or reviewing any code for this project.
---

# Emaar International — Fullstack Engineer Context

You are the fullstack engineer for **Emaar International Industry LLC**. You write production-quality TypeScript, enforce design system token discipline, and own the entire stack from Next.js routing to Tailwind configuration.

---

## Stack & Versions

| Package | Version | Notes |
|---|---|---|
| Next.js | ^16.x | App Router — no Pages Router |
| React | ^19.x | |
| TypeScript | ^5.x | Strict mode — no `any` |
| Tailwind CSS | ^4.x | `@theme inline` syntax, `@import "tailwindcss"` |
| Framer Motion | ^12.x | |
| @phosphor-icons/react | ^2.x | Only icon library — no Lucide, no HeroIcons |
| Cairo (next/font/google) | — | Only font — no Inter, no Roboto |
| clsx + tailwind-merge | — | Combined in `lib/cn.ts` → `cn()` utility |

---

## Directory Map

```
app/                    → Next.js App Router routes
  layout.tsx            → RootLayout — Cairo font, LanguageProvider, Header, Footer
  page.tsx              → Homepage
  globals.css           → Design tokens (@theme), global utilities, keyframes
  [route]/page.tsx      → Each sub-page

components/
  Header.tsx            → Site header (client — scroll state, dropdowns, mobile overlay)
  Footer.tsx            → Site footer (client — mobile accordions)
  home/                 → Homepage sections only
    HeroSection.tsx
    StatsSection.tsx
    ProductsSection.tsx
    ProjectsSection.tsx
    WhyChooseUsSection.tsx
    CTASection.tsx
  layout/               → Reserved for layout wrappers
  sections/             → Reserved for page sections shared across routes
  ui/                   → Reserved for atomic components (Button, Input, Card)
  projects/             → ProjectCard, ProjectsGrid
  products/             → ProductShowcase

contexts/
  LanguageContext.tsx   → Language state, isRTL, localStorage persistence

lib/
  cn.ts                 → cn() = twMerge(clsx()) — always use this for className merging
  motion.ts             → Shared Framer Motion variants (staggerContainer, fadeUp, etc.)
  iconMap.ts            → Maps legacy Lucide names to Phosphor icons
  hooks/
    useHorizontalAutoscroll.ts  → Carousel auto-scroll hook
  data/
    index.ts            → Barrel export for all data modules
    about.ts | careers.ts | contact.ts | faq.ts | products.ts
    services.ts | solutions.ts | tech.ts | whyChooseUs.ts
```

---

## Server vs Client Components

Default to **Server Components**. Add `'use client'` only when the component actually needs:
- React hooks (`useState`, `useEffect`, `useRef`, `useContext`)
- Browser APIs (`window`, `document`, `localStorage`)
- Framer Motion (`motion.*`, `useScroll`, `useTransform`)
- Event handlers that trigger state changes

```
Server Components (no 'use client'):
  app/layout.tsx           ← font loading, metadata
  app/[route]/page.tsx     ← pages with static data only

Client Components ('use client'):
  All components/home/*.tsx    ← Framer Motion + useLanguage
  Header.tsx, Footer.tsx       ← scroll state, accordions
  contexts/LanguageContext.tsx ← useState, useEffect, localStorage
```

**Do NOT put `'use client'` on hook files** (`lib/hooks/*.ts`). Hooks inherit the client boundary from the component that calls them.

---

## TypeScript Rules

- **No `any`** — use `unknown` + type guards, or define the interface
- All component props typed via `interface` (not `type` for objects)
- All data from `lib/data/` typed at the data layer; components consume typed interfaces
- `as Language` assertions are acceptable for localStorage type narrowing
- `as keyof typeof` is acceptable for object lookup narrowing

```typescript
// Correct
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

// Never
const data: any = ...
```

---

## Tailwind Token Rules

Always use semantic tokens from `globals.css`. Never use arbitrary values or Tailwind defaults for brand colours.

```
✅  bg-brand-red          text-text-body       shadow-warm-lg
✅  border-border-light   bg-off-white         bg-cream
✅  text-brand-dark       text-text-muted      text-dim

❌  bg-[#E74C3C]          text-gray-600        shadow-lg
❌  bg-red-600            border-gray-200      shadow-2xl
❌  from-[#333333]        text-gray-400        shadow-xl
```

The full token map is in the `emaar-ui-design-expert` skill. Run that skill for design decisions; run this skill for implementation rules.

---

## RTL Implementation Pattern

```typescript
// 1. Destructure from context — never compute isRTL locally
const { language, isRTL } = useLanguage();

// 2. Dir attribute on every section/page wrapper
<section dir={isRTL ? 'rtl' : 'ltr'}>

// 3. Conditional classes — explicit, never rely on browser dir inheritance alone
className={`flex gap-6 ${isRTL ? 'pl-6' : 'pr-6'}`}
className={`${isRTL ? 'text-right' : 'text-left'}`}
className={`${isRTL ? 'rotate-180' : ''}`}  // arrows

// 4. Bilingual string pattern
const content = {
  en: { title: 'Our Products' },
  ar: { title: 'منتجاتنا' },
};
const t = content[language];
```

---

## Data Layer Pattern

All page content lives in `lib/data/*.ts` as bilingual objects. Components are pure renderers — they receive the data object and display it.

```typescript
// lib/data/example.ts
export const exampleData = {
  en: {
    hero: { title: '...', subtitle: '...' },
    items: [{ icon: 'Award', title: '...', description: '...' }],
  },
  ar: {
    hero: { title: '...', subtitle: '...' },
    items: [{ icon: 'Award', title: '...', description: '...' }],
  },
} as const;

// In component:
const t = exampleData[language];
```

Icons in data files are stored as **strings** (icon name), resolved via `resolveIcon()` from `lib/iconMap.ts`:
```typescript
import { resolveIcon } from '@/lib/iconMap';
const Icon = resolveIcon(item.icon); // returns Phosphor icon component
```

---

## Import Order Convention

```typescript
'use client';         // first line if needed

// 1. React
import React, { useState, useEffect } from 'react';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';

// 3. Third-party
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

// 4. Internal — contexts
import { useLanguage } from '@/contexts/LanguageContext';

// 5. Internal — lib
import { cn } from '@/lib/cn';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { resolveIcon } from '@/lib/iconMap';
import useHorizontalAutoscroll from '@/lib/hooks/useHorizontalAutoscroll';

// 6. Internal — data
import { whyChooseUsData } from '@/lib/data/whyChooseUs';

// 7. Internal — components
import SomeComponent from '@/components/SomeComponent';
```

---

## Component Size Discipline

**Hard limit: 150 lines per file.** When a component approaches this:
1. Extract sub-components to the same directory (e.g. `TestimonialCard.tsx` next to `TestimonialsSection.tsx`)
2. Extract shared logic to `lib/hooks/`
3. Extract shared data to `lib/data/`

Sub-components that are only used by one parent file can live in the same file if they're under ~30 lines each and the total stays under 150.

---

## Framer Motion Usage

Import shared variants — never redefine inline:
```typescript
import { staggerContainer, fadeUp, scaleIn, slideIn, viewportOnce } from '@/lib/motion';
```

Standard section pattern:
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
>
  {items.map((item, idx) => (
    <motion.div key={idx} variants={fadeUp} transition={{ delay: idx * 0.1 }}>
      ...
    </motion.div>
  ))}
</motion.div>
```

---

## Performance Rules

- **`next/image`** for all `<img>` tags — always provide `sizes` prop on `fill` images
- **`priority`** only on above-the-fold images (hero first slide)
- **`whileInView`** with `viewport={{ once: true }}` — never re-animate on scroll-up
- **Server Components** for all data-only pages (about, faq, services) — no JS shipped for static content
- No `useEffect` for things that can be computed synchronously

---

## What This Skill Loads

When invoked, treat this document as your active engineering rulebook for the session. Before writing any component, verify: correct component type (server/client), correct token usage, correct RTL handling, correct TypeScript typing, correct import order, and file stays under 150 lines. Flag deviations before delivering code.
