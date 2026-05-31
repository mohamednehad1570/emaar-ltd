# Emaar International Website

## Project
Premium uPVC & aluminum windows/doors manufacturer (UAE).
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion + Phosphor Icons + Sanity.io CMS.

## Always read first
- emaar-fullstack-engineer (code/architecture)
- high-end-visual-design (design/visual)
- emil-design-eng (design engineering)

## Code rules
- TypeScript strict — no `any`
- Server components first — `use client` only for interactivity
- Tailwind semantic tokens only — bg-off-white not bg-[#F5F4F0]
- No breadcrumbs — removed as useless; do not add them back
- Tailwind v4 cascade: anchors inside `text-white` sections inherit white color — always add `style={{ color: 'var(--color-brand-dark)' }}` inline on light-background buttons inside dark sections
- Product URLs: `/products/{material}/{slug}` — never flat `/products/{slug}`; material is `upvc` or `aluminum`

## File structure
- app/ — routes (App Router)
- components/home/ — homepage sections (Hero, Products, Projects, CTA…)
- components/products/ — product listing + detail page components
- components/solutions/ — residential/commercial solution components
- components/projects/ — project card, grid, detail components
- components/why-choose-us/ — why-choose-us page sections
- components/ui/ — shared UI primitives
- components/Header.tsx, Footer.tsx — top-level layout
- lib/ — utilities, Sanity client, i18n
- contexts/ — React context providers

## Reference docs
- PRODUCT.md — brand personality, audience, anti-references
- DESIGN.md — full design system, component specs, do's and don'ts