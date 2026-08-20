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
- components/layout/ — HeaderDesktopNav, HeaderMobileOverlay, HeaderDropdown, Container (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8)
- components/Header.tsx, Footer.tsx
- lib/whatsapp.ts — getWhatsAppURL({ page, productName?, projectName? })
- lib/data/nav.ts — header dropdown items (DropdownItem interface, bilingual en/ar + href)
- lib/data/products.ts — PRIMARY: upvcCategories / aluminumCategories (ProductCategory[]) with nested ProductItem[]. COMPAT: upvcData / aluminumData flat exports retained during 4-level routing transition. upvcProducts / aluminumProducts are flattened arrays for search/sitemap.
- lib/data/productDetails.ts — extended per-product data: specs, gallery images, related slugs; category field added to ProductDetail interface
- lib/data/*.ts — bilingual data { en: {...}, ar: {...} } — static fallback only for CMS-managed content
- lib/cn.ts, lib/motion.ts, lib/iconMap.ts
- lib/hooks/useHorizontalAutoscroll.ts — carousel auto-scroll hook
- lib/hooks/useTechDocuments.ts — normalises CMS/static tech docs to DisplayDocument[], builds category + productType filter options
- lib/sanity/client.ts — publicClient, writeClient, sanityFetch<T>()
- lib/sanity/fetch.ts — typed fetcher functions: getProjects(), getProjectBySlug(), getProducts(), getProductBySlug(slug, category), getTechDocuments(), getFaqs(), getJobPostings(); getSiteSettings() is also called in app/layout.tsx for global header/footer wiring
- lib/whatsapp.ts — getWhatsAppURL({ page, productName?, projectName? }, whatsappNumber?) — optional second arg overrides WHATSAPP_NUMBER constant with CMS value
- lib/sanity/queries.ts — typed GROQ query strings
- lib/sanity/types.ts — SanityProject, SanityProduct, SanityFaq, SanityProductDetail, TechDocument, JobPosting, LocalizedString
- contexts/LanguageContext.tsx — useLanguage() → { language, isRTL } · useTranslation() → (en, ar) => string
- lib/types.ts — shared display types: DisplayProject, ProjectPreview (re-exports Project, ProductSpec, ProductDetail from data layer)
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
- Old 3-level URLs /products/{material}/{slug} redirect 308 to /products/{material}/doors-and-windows/{slug}
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
- **Identity** — title (localizedString), slug, material (upvc|aluminum), category (subcategory slug, validated against material), badge
- **Details** — description, features[] ({en,ar} pairs), mainImage, inStock
- **Specifications** — specs object (dimensions required; soundReduction, thermalInsulation, securityRating, specTags[] optional)
- **Gallery** — gallery[] images
- **Relations** — relatedProducts[] references, seo object (metaTitle, metaDescription)
- `material` = upvc|aluminum (replaces old `category` field that held the material value); `category` now means the subcategory slug

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
Only these files are affected by Sanity: `products.ts` (products array), `projects.ts`, `faq.ts` (faqs array), `tech.ts` (techDocument downloads), `careers.ts` (jobs array), `contact.ts` (phone/email/address/hours/offices).
UI strings in those files (hero titles, features, CTAs) always stay static — never replace them with Sanity calls.

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