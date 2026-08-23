# Emaar International Website

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons + Sanity.io CMS. Deployed on Vercel.

## File structure
- scripts/rename-products.mjs — image rename helper; dry-run by default (`node scripts/rename-products.mjs`), writes renames with `--apply`; logs to scripts/rename-log.txt
- scripts/rename-projects.mjs — project image rename helper; same dry-run/--apply pattern; logs to scripts/rename-projects-log.txt
- public/products/ — pre-created folder tree: upvc/{windows,doors,doors-and-windows,staircases,stained-glass,sandblast,hebeschibe} + aluminum/{windows,doors,doors-and-windows,staircases,skylights,stained-glass,sandblast}; each leaf has a .gitkeep so Git tracks empty folders before images are dropped in
- public/projects/buildings/ — project images for building type (project-buildings-NN.ext)
- public/projects/villas/ — project images for villa type (project-villas-NN.ext)
- public/projects/towers/ — project images for high-rise tower type (project-towers-NN.ext)
- app/ — App Router routes
- app/api/contact/route.ts — contact form POST handler (Resend + rate limiting, 3 req/10 min per IP)
- app/api/revalidate/route.ts — Sanity ISR webhook endpoint
- components/home/ — HeroSection, StatsSection, ProductsSection, ProjectsSection, WhyChooseUsSection, CTASection, CertificationsSection, TestimonialsSection
- components/MotionProvider.tsx — wraps app in MotionConfig reducedMotion="user" (prefers-reduced-motion handled globally here — no per-component useReducedMotion needed)
- components/products/ — ProductShowcase, ProductMaterialPage (L2 category tiles), ProductCategoryPage (L3 grid), ProductFilterSidebar (shared controlled sidebar, lockedMaterial/lockedCategory props), ProductGrid (shared grid, DisplayProduct interface), WarrantyStrip (horizontal strip, hidden when showWarrantyBadge=false), ProductDetailPage, ProductDetailRelated, ProductDetailHero, ProductDetailSpecs
- components/technical/ — TechnicalPageClient (client), TechFilters, TechDocumentGrid, TechDocumentCard (exports DisplayDocument interface)
- components/careers/ — CareersPageClient (client, assembles page + CTA), CareersHero, CareersCulture, CareersJobList (filter + accordion), CareersJobCard, types.ts (DisplayJob interface)
- components/projects/ — ProjectCard, ProjectsGrid, ProjectDetailPage
- components/faq/ — FAQPageClient (client component, receives sanityFaqs prop)
- components/contact/ — ContactPageClient (client, assembles page), ContactHero, ContactForm (form state + /api/contact submit), ContactInfo (phone/email/address/hours strip), ContactOffices (office cards, CMS + static fallback), ContactMap (iframe or placeholder)
- components/why-choose-us/ — HeroSection, AdvantagesSection, CertificationsSection, ComparisonSection, MaintenanceSection, ProcessSection, TestimonialsSection, WarrantySection, CTASection
- components/ui/ — shared primitives (Breadcrumbs removed — never add back)
- components/layout/ — HeaderDesktopNav, HeaderMobileOverlay (top bar: logo + LangToggle + close; bottom bar: WhatsApp + Request Quote side-by-side; nav list delegated to MobileNavList), MobileNavList (scrollable nav accordion extracted from HeaderMobileOverlay to keep that file under 150 lines), HeaderDropdown, HeaderMegaMenu (full-width fixed mega menu for Products; category links are `{ en, ar, href }` objects; MegaMenuColumn accepts `language` prop and renders `language === 'en' ? en : ar`), Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8), LanguageTransition (crossfade wrapper — wraps {children} in layout.tsx, fades page content on language switch; header sits above it and never fades)
- components/Header.tsx, Footer.tsx
- lib/whatsapp.ts — getWhatsAppURL({ page, productName?, projectName? })
- lib/data/index.ts — barrel export; now only re-exports nav.ts (NAV, isActive, DropdownItem)
- lib/data/nav.ts — header dropdown items (DropdownItem interface, bilingual en/ar + href)
- lib/data/uiStrings.ts — re-export barrel for all static UI copy; components import from here, never from individual copy files directly. Re-exports: whyChooseUsData, servicesData, careersData/CareersJob/CareersContent, techData/TechContent/DownloadFile, contactData, aboutData, faqData/faqCategoryIcons/FAQItem
- lib/data/whyChooseUs.ts · services.ts · careers.ts · tech.ts · contact.ts · about.ts · faq.ts — bilingual { en, ar } static UI copy and CMS fallback data; accessed only through uiStrings.ts — never import these directly
- lib/cn.ts, lib/motion.ts, lib/iconMap.ts
- lib/hooks/useHorizontalAutoscroll.ts — carousel auto-scroll hook
- lib/hooks/useTechDocuments.ts — normalises CMS/static tech docs to DisplayDocument[], builds category + productType filter options
- lib/sanity/client.ts — publicClient, writeClient, sanityFetch<T>()
- lib/sanity/fetch.ts — typed fetcher functions: getProjects(), getProjectBySlug(), getProducts(), getProductBySlug(slug, category), getTechDocuments(), getFaqs(), getJobPostings(); getSiteSettings() is also called in app/layout.tsx for global header/footer wiring
- lib/sanity/queries.ts — typed GROQ query strings
- lib/sanity/types.ts — LocalizedString, LocalizedText, SanityImage, SiteSettings, SanityProject, SanityProductTile (list view), SanityProductFull (detail view with gallery/features/relatedProducts), SanityFaq, TechDocument, JobPosting
- contexts/LanguageContext.tsx — useLanguage() → { language, isRTL, toggleLanguage, setLanguage, isTransitioning, pendingLanguage } · useTranslation() → (en, ar) => string · isTransitioning=true for 150ms during crossfade; pendingLanguage shows incoming language in LangToggle before commit
- lib/types.ts — shared display types: DisplayProject (language-resolved for ProjectCard/ProjectsGrid), ProjectPreview (bilingual minimal subset for homepage)
- studio/ — Sanity Studio (Node 22 required — always `nvm use 22` before `npm run dev`)
- studio/schemaTypes/ — 8 document schemas + 2 shared object types

## Reference docs (read only the section you need, never the full file)
- DESIGN.md — design system, tokens, component specs, do/don't rules
- PRODUCT.md — brand personality, audience, voice, anti-references

## Sitemap
/ · /about · /products · /products/upvc · /products/aluminum
/products/upvc/[category] · /products/aluminum/[category]
/products/upvc/[category]/[slug] · /products/aluminum/[category]/[slug]
/projects · /projects/[id] · /technical · /contact
Footer only: /about · /why-choose-us · /faq · /careers

Note: Solutions tab deleted — /solutions, /solutions/residential, /solutions/commercial pages removed entirely.

## Product taxonomy
uPVC categories: windows · doors · doors-and-windows · staircases · stained-glass · sandblast · hebeschibe
Aluminum categories: windows · doors · doors-and-windows · staircases · skylights · stained-glass · sandblast

## Header nav order
LTR: Home · Products▾ · Projects · Technical · About▾ · Contact
RTL: reversed

## Routing rules
- Product URLs are 4-level: /products/{material}/{category}/{slug}
- material = upvc | aluminum — never flat /products/{slug}
- Old 3-level URLs /products/{material}/{slug} redirect 308 to /products/{material} (the material landing page). next.config.ts uses a negative-lookahead regex to exclude valid L3 category slugs from the redirect — without it, category pages like /products/upvc/sandblast would themselves 308.
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
Document types: `product`, `project`, `teamMember`, `faq`, `jobPosting`, `certificate`, `siteSettings`, `techDocument`

#### product schema (5 tabs)
- **Identity** — title (localizedString, en+ar required), slug (auto from title.en), material (upvc|aluminum, radio), category (subcategory slug, validated against material), mainImage (image, hotspot, **required**), badge
- **Details** — description (localizedText, en+ar required), features[] ({en,ar} object pairs, min 1), applications[] (plain string array, not localised)
- **Specifications** — specs object (dimensions required; thermalValue, acousticRating, glassThickness, colorOptions[] optional); specTags[] chips from fixed list (double-glazed, triple-glazed, thermal-insulated, acoustic-insulated, uv-resistant)
- **Gallery & Docs** — gallery[] images (hotspot on each), technicalSheet (PDF file), cadFile (DWG/DXF file)
- **Relations** — relatedProducts[] references, seo object (titleEn, titleAr, descriptionEn, descriptionAr)
- `material` = upvc|aluminum (replaces old `category` field that held the material value); `category` now means the subcategory slug
- No `inStock` field — do not add it

### Fetching data in server components
Prefer typed fetcher functions from `lib/sanity/fetch.ts` — they handle query + type together:
```typescript
import { getProjects } from '@/lib/sanity/fetch'
const projects = await getProjects()
```
Use raw `sanityFetch` only for one-off queries not covered by fetch.ts:
```typescript
import { sanityFetch } from '@/lib/sanity/client'
import { someQuery } from '@/lib/sanity/queries'
import type { SomeType } from '@/lib/sanity/types'
const data = await sanityFetch<SomeType>(someQuery, { vars })
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
`lib/data/products.ts`, `productDetails.ts`, and `projects.ts` are **deleted** — Sanity is sole authority for products and projects. L4 product routes 404 via `UPVC_CATEGORIES`/`ALUMINUM_CATEGORIES` Set check + `if (!product) notFound()`.

These files still provide static fallbacks when Sanity returns empty:
- `faq.ts` — 24 static FAQ entries
- `tech.ts` — static tech document list
- `careers.ts` — 6 static job postings
- `contact.ts` — phone/email/address/hours/offices

All are accessed only through `uiStrings.ts`. UI strings (hero titles, features, CTAs) always stay static — never replace them with Sanity calls.

### GROQ queries (lib/sanity/queries.ts)
- `projectsQuery` — all projects ordered by year desc
- `projectBySlugQuery` — single project by `$slug`
- `productsByCategoryQuery` — products filtered by `$category` ('upvc' | 'aluminum')
- `productBySlugQuery` — single product detail by `$slug` + `$category`; includes gallery, features, relatedProducts[]
- `faqsQuery` — all FAQs ordered by creation date
- `techDocumentsQuery` — all tech documents ordered by `order` asc; includes resolved file URL and previewImage
- `jobPostingsQuery` — all job postings ordered by `_createdAt` desc; full fields including responsibilities[], benefits[]
- `solutionSettingsQuery` — siteSettings phone + whatsappNumber (for solutions contact info)
- `siteSettingsQuery` — now includes `mapEmbedUrl`, `officeLocations[]` (name, address, phone, workingHours), `showWarrantyBadge`, and `warranty` object (upvcYears, glassYears, accessoriesYears, maintenanceYears, governingLaw, exclusions, footnote)

## Known gotchas
- Sanity product schema break: the old schema used `category` to mean material (upvc/aluminum); the new schema uses `material` for that and `category` for the subcategory slug (e.g. "windows"). Any Sanity migration script must account for this field rename.
- Product category fields: the schema stores category in TWO separate fields — `categoryUpvc` (uPVC products) and `categoryAluminum` (aluminum products) — instead of a single `category` field. This avoids a Sanity v6 runtime error (`p.map is not a function`) caused by passing a function to `options.list` with `layout: 'radio'`. All GROQ queries project these as `"category": coalesce(categoryUpvc, categoryAluminum)` so the rest of the codebase reads a unified `category` string. The `productsByCategoryQuery` filter uses `(categoryUpvc == $category || categoryAluminum == $category)`. Never add a dynamic function to `options.list` in a radio field.
- Tailwind v4 anchor cascade: <Link> inside text-white section inherits
  white text. Fix: style={{ color: 'var(--color-brand-dark)' }} on
  light-bg buttons inside dark sections
- Numerals in RTL: force dir="ltr" on number elements so digits stay left-to-right
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: MotionProvider handles this globally via reducedMotion="user" — no per-component useReducedMotion() needed. Exception: LanguageTransition.tsx calls useReducedMotion() explicitly because the crossfade is triggered by user action (not scroll/mount) and must be skippable independently of MotionConfig
- revalidateTag in Next.js 16 requires two arguments: revalidateTag('sanity', 'default') — one-arg form is a type error
- contact API (app/api/contact/route.ts) uses Resend; RESEND_API_KEY must be set in Vercel env vars
- next.config.ts redirect pattern: use `$`-anchored non-capturing group + `[^/]+` — `:slug((?!(?:cat1|cat2|...)$)[^/]+)` — the `$` prevents prefix collision (e.g. "doors" without it matches the start of "doors-and-windows"); `[^/]+` restricts to single path segments. Always list ALL valid category slugs in both uPVC and aluminum lookaheads; a missing slug causes that category page to 308 to the material landing page
- L4 product 404 guard: `productDetails.ts` is deleted. L4 routes now use a hardcoded `UPVC_CATEGORIES`/`ALUMINUM_CATEGORIES` Set to reject unknown category segments, then `if (!product) notFound()` after the Sanity fetch — no separate slug registry needed
- Project `type` field values: `villas | buildings | towers` — old values (residential/commercial/hospitality) are gone. Filter IDs in ProjectsGrid and typeLabels in ProjectDetailPage must match these exact strings. Arabic: فلل / مباني / أبراج
- Ghost buttons on dark/image overlays: use `hover:bg-brand-red hover:border-brand-red hover:text-white` — NOT `hover:bg-white hover:text-brand-dark`. White fill on a dark overlay is invisible and wastes the hover state; brand-red is the correct CTA fill everywhere
- Mobile overlay LangToggle pattern: `HeaderMobileOverlay` calls `useLanguage()` directly to get `toggleLanguage` and `pendingLanguage` — these are NOT threaded through its Props interface (which only carries `language`, `isRTL`, `pathname`, `onClose` from `Header.tsx`). Active display state uses `const displayLang = pendingLanguage ?? language` — `pendingLanguage` shows the incoming language during the 150ms LanguageTransition crossfade so the toggle highlights correctly before context commits. This same `pendingLanguage ?? language` pattern is used in the header bar LangToggle.
- MobileNavList `useReducedMotion()`: this component calls `useReducedMotion()` directly even though `MotionProvider` handles it globally, because the accordion expand/collapse is user-triggered (not scroll/mount) and needs its own reduced-motion gate independent of `MotionConfig`. Same reasoning as `LanguageTransition.tsx`.

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev

## Current State — Aug 23 2026

### Completed this session
- Mega menu: components/layout/HeaderMegaMenu.tsx — two columns, bilingual, RTL, mouse-bridge
- Mobile overlay: rewritten with LangToggle in top bar, WhatsApp+Quote bottom bar
- MobileNavList: extracted to components/layout/MobileNavList.tsx
- Horizontal filter bar: ProductFilterBar.tsx + ProductFilterDropdown.tsx
- ProductCard.tsx: extracted with Material·Category metadata chip

### Known filter bugs (fix next session — Prompt 3b)
- Category and Specifications checkboxes not selectable — handler not wired
- Sort pill positioned incorrectly — use ms-auto on count+sort group
- Arabic filter bar layout wrong — use ms-auto not flex-row-reverse

### Pending prompts
- Prompt 3b: Fix filter bar bugs (checkbox selection, RTL layout, sort position)
- Prompt 4: Project detail editorial layout redesign
- Prompt 5: Product detail two-column layout + image gallery + sticky CTA
