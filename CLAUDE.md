# Emaar International Website

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons + Sanity.io CMS. Deployed on Vercel.

## File structure
- app/ — App Router routes
- app/api/contact/route.ts — contact form POST handler (Resend + rate limiting, 3 req/10 min per IP)
- app/api/revalidate/route.ts — Sanity ISR webhook endpoint
- components/home/ — HeroSection, StatsSection, ProductsSection, ProjectsSection, SolutionsSection, WhyChooseUsSection, CTASection, CertificationsSection, TestimonialsSection
- components/MotionProvider.tsx — wraps app in MotionConfig reducedMotion="user" (prefers-reduced-motion handled globally here — no per-component useReducedMotion needed)
- components/products/ — ProductShowcase, ProductMaterialPage, ProductDetailPage, ProductDetailRelated
- components/solutions/ — ResidentialContent, CommercialContent, SolutionTypePage, SolutionProductsSection, SolutionProjectsSection
- components/projects/ — ProjectCard, ProjectsGrid, ProjectDetailPage
- components/faq/ — FAQPageClient (client component, receives sanityFaqs prop)
- components/why-choose-us/ — HeroSection, AdvantagesSection, CertificationsSection, ComparisonSection, MaintenanceSection, ProcessSection, TestimonialsSection, WarrantySection, CTASection
- components/ui/ — shared primitives (Breadcrumbs removed — never add back)
- components/layout/ — HeaderDesktopNav, HeaderMobileOverlay, HeaderDropdown, Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8)
- components/Header.tsx, Footer.tsx
- lib/whatsapp.ts — getWhatsAppURL({ page, productName?, projectName? })
- lib/data/nav.ts — header dropdown items (DropdownItem interface, bilingual en/ar + href)
- lib/data/productDetails.ts — extended per-product data: specs, gallery images, related slugs (bilingual title/description in products.ts)
- lib/data/*.ts — bilingual data { en: {...}, ar: {...} } — static fallback only for CMS-managed content
- lib/cn.ts, lib/motion.ts, lib/iconMap.ts
- lib/hooks/useHorizontalAutoscroll.ts — carousel auto-scroll hook
- lib/sanity/client.ts — publicClient, writeClient, sanityFetch<T>()
- lib/sanity/queries.ts — typed GROQ query strings
- lib/sanity/types.ts — SanityProject, SanityProduct, SanityFaq, LocalizedString
- contexts/LanguageContext.tsx — useLanguage() → { language, isRTL } · useTranslation() → (en, ar) => string
- lib/types.ts — shared display types: DisplayProject, ProjectPreview (re-exports Project, ProductSpec, ProductDetail from data layer)
- studio/ — Sanity Studio (Node 22 required — always `nvm use 22` before `npm run dev`)
- studio/schemaTypes/ — 7 document schemas + 2 shared object types

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
- /projects/[id] accepts both numeric IDs (static fallback) and string slugs (Sanity); page handler tries Sanity slug first, then falls back to static data

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

## Sanity CMS

### Studio
- Hosted at https://emaar-international.sanity.studio/ (for Khadija)
- Local dev: `cd studio && nvm use 22 && npm run dev` → localhost:3333
- Project ID: `wv4sqx1y` · Dataset: `production`

### Schema types (studio/schemaTypes/)
Object types (shared): `localizedString`, `localizedText`
Document types: `product`, `project`, `teamMember`, `faq`, `jobPosting`, `certificate`, `siteSettings`

### Fetching data in server components
```typescript
import { sanityFetch } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'
import type { SanityProject } from '@/lib/sanity/types'

const projects = await sanityFetch<SanityProject[]>(projectsQuery)
```
- Always use `sanityFetch` (not `publicClient.fetch` directly) — it injects `next: { tags: ['sanity'] }`
- Add `export const revalidate = 3600` at the top of every page that calls `sanityFetch`
- Never call `sanityFetch` inside a client component

### ISR revalidation
- Webhook: `POST /api/revalidate?secret=<SANITY_WEBHOOK_SECRET>`
- On trigger: calls `revalidateTag('sanity', 'default')` — purges all Sanity-tagged pages
- `SANITY_WEBHOOK_SECRET` must be set in Vercel env vars
- Configure the webhook in the Sanity dashboard → `https://<domain>/api/revalidate?secret=<value>`

### Static fallback pattern
When Sanity DB is empty, pages fall back to `lib/data/*.ts` static content automatically.
Only these files are affected by Sanity: `products.ts` (products array), `projects.ts`, `faq.ts` (faqs array).
UI strings in those files (hero titles, features, CTAs) always stay static — never replace them with Sanity calls.

### GROQ queries (lib/sanity/queries.ts)
- `projectsQuery` — all projects ordered by year desc
- `projectBySlugQuery` — single project by `$slug`
- `productsByCategoryQuery` — products filtered by `$category` ('upvc' | 'aluminum')
- `faqsQuery` — all FAQs ordered by creation date

## Known gotchas
- Tailwind v4 anchor cascade: <Link> inside text-white section inherits
  white text. Fix: style={{ color: 'var(--color-brand-dark)' }} on
  light-bg buttons inside dark sections
- Numerals in RTL: force dir="ltr" on number elements so digits stay left-to-right
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: MotionProvider handles this globally via reducedMotion="user" — no per-component useReducedMotion() needed
- revalidateTag in Next.js 16 requires two arguments: revalidateTag('sanity', 'default') — one-arg form is a type error
- contact API (app/api/contact/route.ts) uses Resend; RESEND_API_KEY must be set in Vercel env vars

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev