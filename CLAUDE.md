# Emaar International Website

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons. Deployed on Vercel.

## Repo conventions (non-obvious — the rest of the layout is what `ls` shows)
- Static UI copy: components import from `lib/data/uiStrings.ts` only, never from the individual copy files (whyChooseUs/services/careers/tech/contact/about/faq). Exceptions: `lib/data/materialContent.ts` and `lib/data/nav.ts` are imported directly.
- `scripts/rename-products.mjs` / `rename-projects.mjs` are dry-run by default; `--apply` writes; logs go to `scripts/rename-log.txt` / `scripts/rename-projects-log.txt`.
- Breadcrumbs were removed site-wide — never add them back.

## Reference docs (read only the section you need, never the full file)
- DESIGN.md — design system, tokens, component specs, do/don't rules
- PRODUCT.md — brand personality, audience, voice, anti-references

## Header nav order
LTR: Home · Our Solutions▾ · Technical · About▾ · Contact
RTL: reversed (nav has dir; the header bar itself stays dir="ltr" so the logo is always left)
Our Solutions (≥1280px): cascading mega-menu — View (Products/Projects/Accessories) → Material (Products only) → Items. Default Products → uPVC. <1280px: MobileDrillNav drill-down panels.

## Header sizing
- `--header-h` (globals.css, @property-interpolated): rest/compact 72/64 mobile, 84/72 tablet (≥768), 96/76 desktop (≥1280). Header.tsx toggles html[data-header="compact"] after 48px scroll, back below 16px.
- Use `top-(--header-h)` / `pt-(--header-h)` for anything under the header — never hard-code a header height. html has scroll-padding-top: calc(var(--header-h) + 16px).
- EmaarLogo size="header" | "footer": 72/60/52 at rest; header compact scales to 56/52/46 (transform only). Name: EN "Emaar International Industry" (≥768) / "Emaar Int. Ind." (<768), AR "إعمار الدولية للصناعة". "L.L.C." / "ذ.م.م" appear ONLY in the footer copyright line.

## Routing rules
- Product categories and project types are hash anchors on their landing pages (`/products/{upvc|aluminum|glass}#slug`, `/projects#residential`, `/accessories#brands`) — all `[category]`/`[slug]` sub-routes were deleted (Sep 24 2026). Never add sub-routes back.
- Anchor slugs must match in three places: the ids rendered by the page (`lib/data/materialContent.ts` slugs, ProjectsGrid, accessories sections), `lib/data/navSolutions.ts`, and the next.config.ts redirect lookaheads.

## Code rules
- Server components by default — use client only for hooks/motion/events
- TypeScript strict — no any
- Tailwind semantic tokens only — bg-brand-red not bg-[#E74C3C]
- 150-line file limit — extract sub-components when approaching limit
- Phosphor Icons only (@phosphor-icons/react)
- Bilingual: every string needs { en: '...', ar: '...' }; in client components use `useTranslation()` from LanguageContext instead of inlining `(en, ar) => language === 'en' ? en : ar`
- RTL: useLanguage() → isRTL, use rtl: Tailwind prefix for directional overrides
- Page-width wrapper: use `<Container>` from `@/components/layout/Container` — never repeat max-w-7xl + padding inline

## Colors (hard rules — no lookup needed)
- Page bg: bg-off-white (#F5F4F0)
- Section alternate: bg-surface-white (#FFFFFF)
- Subtle contrast: bg-surface-cream (#ECEAE4)
- Text heading: text-ink-heading (#1A1A1A)
- Text body: text-ink-body (#3D3A37)
- Text muted: text-ink-muted (#7F8C8D)
- CTA: bg-brand-red (#E74C3C) → hover bg-brand-red-deep (#C0392B)
- Silver: bg-silver-material (#C0C6CA)
- Border default: border-border-light (#E4E2DC)
- Border emphasis: border-border-medium (#CCCAC4)
- Gold: ONLY certifications and awards — nowhere else
- WhatsApp: #25D366 — ONLY on WhatsApp button, nowhere else
- BLUE: ABSOLUTELY FORBIDDEN — zero tolerance, no exceptions
- Shadows: rgba(45,41,38,x) ONLY — rgba(0,0,0,x) is banned

## Shadows (copy-paste ready)
- sm: 0 2px 8px rgba(45,41,38,0.08)
- md: 0 4px 20px rgba(45,41,38,0.10)
- lg: 0 10px 40px rgba(45,41,38,0.12)
- xl: 0 15px 60px rgba(45,41,38,0.16)
- cta-glow: 0 4px 15px rgba(231,76,60,0.20) → hover 0 8px 32px rgba(231,76,60,0.40)

## Typography (Cairo only — no second font ever)
- Display: 800 weight, clamp(2.75rem,5vw,5rem), line-height 0.90, tracking -0.02em
- Headline: 700, clamp(1.75rem,3.5vw,3rem), line-height 1.1, tracking -0.01em
- Title: 600, clamp(1.125rem,1.5vw,1.375rem), line-height 1.3
- Body: 400, 1rem, line-height 1.6
- Label: 600, 0.6875rem, uppercase, tracking 0.22em

## Component rules (hard rules)
- Buttons: 0px radius always — never round corners
- Cards: 2px radius, no shadow at rest, shadow-lg on hover only
- Inputs: 48px height, 0px radius, label above (never floating)
- Border at rest: border-border-light → border-silver-material on hover
- No diagonal lines, no rotated shapes — horizontal/vertical only
- No gradient text — solid colors only
- No ornamental Arabic patterns

## WhatsApp CTAs
- All page "Request Quote" buttons → getWhatsAppURL({ page: '...' })
- Header "Request Quote" → href="/contact" only
- WhatsApp links: target="_blank" rel="noopener noreferrer"
- WHATSAPP_NUMBER constant in lib/whatsapp.ts — placeholder until client confirms

## Content
- All content is static in `lib/data/` — no CMS, no data fetching, no ISR. Pages import data and pass it to client components as props.
- All images go through `components/ui/ImageSlot.tsx`, keyed in `lib/data/images.ts`. `null` = blank cream placeholder; real files go in `/public/images/*.webp` and the key's value becomes that path. Never use raw `next/image`/`<img>` or external URLs for content images.
- A custom CMS will replace these static files after launch.

## Known gotchas
- Tailwind v4 anchor cascade: <Link> inside text-white section inherits
  white text. Fix: style={{ color: 'var(--color-brand-dark)' }} on
  light-bg buttons inside dark sections
- Numerals in RTL: force dir="ltr" on number elements so digits stay left-to-right
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: MotionProvider handles this globally via reducedMotion="user" — no per-component useReducedMotion() needed. Exception: LanguageTransition.tsx calls useReducedMotion() explicitly because the crossfade is triggered by user action (not scroll/mount) and must be skippable independently of MotionConfig
- contact API (app/api/contact/route.ts) uses Resend; RESEND_API_KEY must be set in Vercel env vars
- next.config.ts redirect pattern: use `$`-anchored non-capturing group + `[^/]+` — `:slug((?!(?:cat1|cat2|...)$)[^/]+)` — the `$` prevents prefix collision (e.g. "doors" without it matches the start of "doors-and-windows"); `[^/]+` restricts to single path segments. Always list ALL valid category slugs in both uPVC and aluminum lookaheads; a missing slug causes that category page to 308 to the material landing page
- Project categories: residential | commercial (anchors #residential / #commercial).
- Ghost buttons on dark/image overlays: use `hover:bg-brand-red hover:border-brand-red hover:text-white` — NOT `hover:bg-white hover:text-brand-dark`. White fill on a dark overlay is invisible and wastes the hover state; brand-red is the correct CTA fill everywhere
- ProductsSection / ProjectsSection `useReducedMotion()`: same exception — the marquee animation is continuous on mount (not scroll/viewport), so both call `useReducedMotion()` directly to gate the `InfiniteMarquee` and fall back to a static `overflow-x-auto` scrollable div when reduced motion is preferred.
- `DropdownItem` type is deleted — use `NavLink` from `@/lib/data/nav` everywhere. `HeaderDropdown` props already updated. Do not re-introduce DropdownItem.
- `SOLUTIONS_HREFS` is the flat href array exported from nav.ts for `isActive` checks on the "Our Solutions" nav item — derive it from there, never re-derive inline at render time.
- next.config.ts has THREE material redirect blocks now (upvc, aluminum, glass) — when adding a new glass category, update the glass lookahead regex.

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev

## Pending prompts
- Logo artwork (public/emaar-logo.png) still contains "INTERNATIONAL IND. L.L.C." and ring text "إعمار العالمية للصناعات ذ.م.م" (العالمية ≠ الدولية) — needs a client decision / new asset.
