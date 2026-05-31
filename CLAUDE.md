# Emaar International Website

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons + Sanity.io CMS. Deployed on Vercel.

## File structure
- app/ — App Router routes
- components/home/ — homepage sections
- components/products/ — ProductShowcase, ProductMaterialPage, ProductDetailPage, ProductDetailRelated
- components/solutions/ — ResidentialContent, CommercialContent, SolutionTypePage, SolutionProductsSection, SolutionProjectsSection
- components/projects/ — ProjectCard, ProjectsGrid, ProjectDetailPage
- components/why-choose-us/ — page sections
- components/ui/ — shared primitives (Breadcrumbs removed — never add back)
- components/layout/ — HeaderDesktopNav, HeaderMobileOverlay, HeaderDropdown (if split)
- components/Header.tsx, Footer.tsx
- lib/whatsapp.ts — getWhatsAppURL({ page, productName?, projectName? })
- lib/data/*.ts — bilingual data { en: {...}, ar: {...} }
- lib/cn.ts, lib/motion.ts, lib/iconMap.ts
- contexts/LanguageContext.tsx — useLanguage() → { language, isRTL }

## Reference docs (read only the section you need, never the full file)
- DESIGN.md — design system, tokens, component specs, do/don't rules
- PRODUCT.md — brand personality, audience, voice, anti-references

## Sitemap
/ · /about · /products · /products/upvc · /products/aluminum
/products/upvc/[product] · /products/aluminum/[product]
/solutions · /solutions/residential · /solutions/commercial
/projects · /projects/[id] · /technical · /contact
Footer only: /about · /why-choose-us · /faq · /careers

## Header nav order
LTR: Home · Products▾ · Solutions▾ · Projects · Technical · About▾ · Contact
RTL: reversed

## Routing rules
- Product URLs always /products/{material}/{slug}
- material = upvc or aluminum — never flat /products/{slug}
- No breadcrumbs — removed, never add back

## Code rules
- Server components by default — use client only for hooks/motion/events
- TypeScript strict — no any
- Tailwind semantic tokens only — bg-brand-red not bg-[#E74C3C]
- 150-line file limit — extract sub-components when approaching limit
- Phosphor Icons only (@phosphor-icons/react)
- Bilingual: every string needs { en: '...', ar: '...' }
- RTL: useLanguage() → isRTL, use rtl: Tailwind prefix for directional overrides

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

## Known gotchas
- Tailwind v4 anchor cascade: <Link> inside text-white section inherits
  white text. Fix: style={{ color: 'var(--color-brand-dark)' }} on
  light-bg buttons inside dark sections
- Numerals in RTL: force dir="ltr" on number elements so digits stay left-to-right
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: disable all Framer Motion animations when set

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev