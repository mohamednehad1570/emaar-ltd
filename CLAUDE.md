# Emaar International Website

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons. Deployed on Vercel.

## Repo conventions (non-obvious — the rest of the layout is what `ls` shows)
- Static UI copy: components import from `lib/data/uiStrings.ts` only, never from the individual copy files (whyChooseUs/services/careers/tech/contact/about/faq). Exception: `lib/data/nav.ts` is imported directly. Catalog data comes from `lib/data/catalog` (barrel `index.ts`; use the selectors) — never from its individual files.
- `scripts/rename-products.mjs` / `rename-projects.mjs` are dry-run by default; `--apply` writes; logs go to `scripts/rename-log.txt` / `scripts/rename-projects-log.txt`.
- Breadcrumbs were removed site-wide — never add them back.

## Reference docs (read only the section you need, never the full file)
- DESIGN.md — design system, tokens, component specs, do/don't rules
- PRODUCT.md — brand personality, audience, voice, anti-references

## Header (components/Header.tsx + components/layout/Header*, LogoPlate, StickyQuoteBar)
- Physical layout is FIXED in EN and AR — never mirror it: `[LogoPlate] … uPVC · Aluminum · Projects · Technical · About▾ · Contact … EN|ع · WhatsApp · [Request Quote]`. The bar row is dir="ltr"; each label (NavLabel) and the About panel set their own dir. No Home tab, no mega-menu, no material dropdowns, no wordmark beside the logo.
- Nav data: `NAV` in lib/data/nav.ts (order + labels). app/layout.tsx calls `buildHeaderNav()` (lib/data/headerNav.ts) on the server and passes plain `HeaderNavData` (material labels, slug → materials for the active underline, slug → EN name for WhatsApp) to Header / StickyQuoteBar — never import lib/data/catalog into client chrome (it would ship the whole catalog).
- ≥1024: HeaderNav. uPVC → /upvc and Aluminum → /aluminum are plain links (no chevron, no panel). Only About has a panel (HeaderDropdown): hover-intent + click/Enter/Space; Esc / outside click / route change close. Active underline (red): material landing page or any /products/[slug] that material offers (both underline for shared types). 1024–1279: WhatsApp is icon-only.
- <1024: logo · [768–1023: EN|ع + WhatsApp icon] · burger → HeaderMobileOverlay + MobileDrillNav (drillPanels.ts). uPVC / Aluminum are plain rows (active by the same material rule); only About drills. The overlay shows EN|ع at every width <1024.
- Bar: 72px at every breakpoint and scroll state (`--header-h`). Rest = white + 0.5px border-light; homepage = transparent over the hero (white labels, `onDark`); after 48px scroll (back below 16px) = frosted white/80 + silver border.
- LogoPlate image is the header's only eager image: `loading="eager"` + `fetchPriority="high"`. Next 16 deprecates `priority`, and the docs say not to combine `preload` with those two.
- LogoPlate: white circle + border-light + shadow-warm-md, top 8px into the bar. STATIC 72 / 88 / 96 / 112px (<768 / md / lg / xl) at every scroll position — no shrink, no animation (only the bar turns frosted on scroll). `--logo-overhang` (8 / 24 / 32 / 48px) on :root — anything sitting at the top of a page under the header must pad `calc(var(--header-h) + var(--logo-overhang))` (PageHeader and the homepage hero already do).
- Use `top-(--header-h)` / `pt-(--header-h)` for things under the bar — never hard-code 72. html has scroll-padding-top: calc(var(--header-h) + 16px).
- StickyQuoteBar (<1024 only, mounted once in layout): appears past 60% of the first viewport, hidden while the overlay is open (`useMobileNavOpen`). Footer reserves `--quote-bar-h` + safe-area at its end.
- EmaarLogo (mark + name) is footer-only. Name: EN "Emaar International Industry" (≥768) / "Emaar Int. Ind." (<768), AR "إعمار الدولية للصناعة". "L.L.C." / "ذ.م.م" appear ONLY in the footer copyright line.
- Page titles: `generatePageMetadata` returns the bare title; the brand suffix comes only from app/layout.tsx's `title.template` (the home page sets an absolute title because the template doesn't apply to its own segment).

## Routing rules
- Material pages: `/upvc`, `/aluminum`. Product types: 22 shared static pages at `/products/[slug]` (generateStaticParams from `lib/data/catalog`, `dynamicParams = false`). Type links (material pages, footer, home) come from the catalog selectors — never hand-write type hrefs.
- No glass or accessories pages — they are Options tabs on the material pages: `/upvc#glass`, `/upvc#accessories` (same hashes on `/aluminum`). Projects stay hash anchors (`/projects#residential|#commercial`).
- Old routes 308 in next.config.ts: `/products` → `/`, `/products/upvc/*` → `/upvc`, `/products/aluminum/*` → `/aluminum`, `/products/glass/*` → `/upvc#glass`, `/accessories/*` → `/upvc#accessories`. Internal links must never hit these redirects.
- Type slugs `upvc`, `aluminum`, `glass` are reserved (they'd be shadowed by the redirects) — enforced by `npx tsx scripts/validate-catalog.ts`; run it after any catalog edit.

## Material page (/upvc, /aluminum → components/catalog/material/*)
- Order: A) MaterialHero (TypeHero language, no legend; ImageSlot `material-{id}` / tag exterior) → B) MaterialTypes ("{Material} products", groups Windows · Doors · Facades · Specialty, empty groups dropped; TypeCard → /products/[slug], same placeholder key as the type hero `{slug}-g0`) → C) MaterialOptions (section `#options`) → D) ProductDetailCTA ("Planning a {material} project?").
- Props: `materialPageProps(id)` in lib/catalogPageData.ts → `{ view: MaterialPageView }`; the Options cards come from `buildOptionTabs()` in lib/materialOptionsData.ts (sub-tab ids, card lines, Lightbox details, accessory dot hexes). Components never import the catalog. Labels: `MATERIAL_PAGE_COPY` in catalogCopy.
- Options: LineTabs (WAI-ARIA tabs, manual activation, roving tabindex, ←/→ mirrored in RTL, Home/End; red underline via layoutId spring 500/35; one-line horizontal scroll + end fade <overflow) — main row Colours · Designs · Glass · Accessories, sub row "All" + groups (accessories: only kinds that exist). OptionGrid: AnimatePresence mode="wait", min-height pinned until the last card lands (no layout shift). Hover zooms are Tailwind group-hover (MaterialOptions calls useReducedMotion, same exception as the home grids).
- Deep links (useOptionsHash): `#colours|#designs|#glass|#accessories` select the tab and scroll to `#options`; tab clicks `history.replaceState` the hash (no history, no scroll). MaterialOptions also renders four zero-height fallback anchors with those ids, absolutely pinned to the section top, so native/no-JS scrolling lands where `#options` does. They take NO scroll-margin: the 88px offset is html `scroll-padding-top`, and a margin would double it. Don't reuse those four ids anywhere else on the material pages.
- Lightbox API (components/ui/lightboxTypes.ts): `LightboxItem { src, alt, caption?, swatchHex?, details?: { label: Localized; value: string | Localized }[], placeholderKey?, placeholderTag? }`. `swatchHex` renders a flat colour block; `details` adds a panel beside the media (below <768, caption becomes its title); string values render dir=ltr. Options cards open when they have a swatch, a real src, or a placeholder photo (`hasPlaceholderPhoto`).
- Swatch hexes (colours, performance glass, accessory dots) are the ONLY place blue may appear.

## Pictograms + hotspot diagrams (components/catalog/pictograms, components/catalog/hotspotDiagrams)
- One pictogram and one diagram per catalog mechanism (sliding · casement · hinged-door · folding · fixed). 'unspecified' gets nothing: no fallback icon, no guessed mechanism. Both maps are `Record<DrawnMechanism, …>` (components/catalog/types.ts), so a new catalog mechanism fails tsc until it is drawn.
- `getPictogram(id, props)` / `getDiagram(id, props)` return ELEMENTS, not components. Picking a component during render trips `react-hooks/static-components`.
- Pictograms: viewBox 64, stroke currentColor 1.5, glass `fill-off-white`, opening indicator `stroke-brand-red` (European drafting: dashed lines meet at the hinge side for casement/hinged, arrow for sliding, zig-zag for folding; fixed has no indicator). 40px on TypeCard (inline-end corner, aria-hidden, muted → heading on card hover), 56px in TypeIntro (role=img, label `openingSymbol`).
- Diagrams: viewBox 400×300 = the 4:3 pin box (pin x%·4, y%·3), `preserveAspectRatio="none"`, non-scaling strokes (outline 2.25 ink-heading · hardware 1.75 ink-heading on white · hidden parts dashed ink-muted · detail lines silver). Draw only what hotspots.ts names, or what is structurally obvious. Pins are the source of truth: move a pin in hotspots.ts and the matching drawing must be redrawn. Drawn only when the type uses the mechanism's shared pins (`diagramMechanism`); a `MECHANISM_DIAGRAMS` file wins over the SVG. Labels: `TYPE_PAGE_COPY.diagramLabels`.
- NEVER MIRROR either drawing in RTL. A window opens the same way in any language (same rule as the hero and pins): the SVG carries `direction="ltr"`, and the pin box is dir="ltr". Only the pictogram's position on the card follows logical inline-end.

## Type page (/products/[slug] → components/catalog/type/*)
- Section order: TypeHero → TypeIntro (how it opens + best for) → TypeHotspots → TypeGallery → TypeConfigurations → CTA band (ProductDetailCTA with headline/productName/quoteHref). Placeholder types: Hero (no description) + "Details coming soon" + CTA only.
- Props are built server-side by `typePageProps()` in lib/catalogPageData.ts — components never import the catalog.
- Hero geometry is FIXED in EN and AR (section dir="ltr"): image physical right 85%, transparent text panel (no plate) straddles its left edge, "Available in" legend (no plate) always the image's physical bottom-right. Readability = off-white scrims on the image (left gradient ≥768, bottom gradient <768, radial corner behind the legend) — warm rgba(245,244,240,x) only.
- Hotspot section: HotspotFigure = diagram (file → SVG elevation → cream placeholder) + HotspotPin buttons; TypeHotspots owns state and the numbered list.
- Hotspots come from the mechanism (`MECHANISM_HOTSPOTS` in lib/data/catalog/hotspots.ts, via `getHotspots`); a non-empty `ProductType.hotspots` overrides. 'unspecified' = no section. Validator enforces 4 per mechanism, x/y 0–100. Pins are physical % (never mirrored).
- Gallery: `ProductType.gallery` (3–6 entries, validator-enforced; placeholder types = []). Row patterns in galleryLayout.ts (3 portrait · 21:9 wide · 4:3 pair); <768 one 4:3 column. Real photos open the shared `components/ui/Lightbox` (generic items `{ src, alt, caption? }` — reuse it, don't fork it); placeholders are inert.
- Configurations only (chips per material, "Custom sizes on request" when none) + a quiet link to /technical. Profile systems, glass range and `sizeLimits` stay in the catalog for the Technical page — don't put them back on the type page.
- Quote buttons link `/contact?product={slug}` — the contact form has no product field yet, so the param is not prefilled.
- AR numeric ranges inside data strings are wrapped in \u2066…\u2069 (LRI/PDI) so RTL never flips them.

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
- All images go through `components/ui/ImageSlot.tsx`, keyed in `lib/data/images.ts` (catalog images live on the catalog records instead: `heroImage`, `gallery`, `image`). Type galleries: `/images/products/{slug}/gallery-{n}.webp` (n = 1-based position). `null` = blank cream placeholder; real files go in `/public/images/*.webp` and the key's value becomes that path. Never use raw `next/image`/`<img>` or external URLs for content images.
- A custom CMS will replace these static files after launch.

## Placeholder photos (TEMPORARY — must be removed before launch)
- 32 Unsplash review photos in `public/images/_placeholder/p01–p32.webp` (credits: CREDITS.md there), wired only through `lib/data/placeholderPhotos.ts`. ImageSlot shows one when `src` is null AND `USE_PLACEHOLDER_PHOTOS` AND the call site passes `placeholderKey` (+ optional `placeholderTag`). Catalog data and IMAGES stay null — never write placeholder paths into them.
- Keys in use: `home-hero-{n}`, `home-product-{key}`, `home-project-{type}`, type hero `{slug}-g0`, gallery `{slug}-g{n}`; material heroes `material-upvc` / `material-aluminum`; Options `{material}-design-{id}`, `glass-{id}`, `acc-{id}`. Numbered keys spread within a tag, so siblings don't repeat.
- Gallery tiles showing a placeholder photo are still placeholders (not clickable, no lightbox). Options cards are the exception: they open the Lightbox on the placeholder photo (`hasPlaceholderPhoto`).
- Remove: quick = `USE_PLACEHOLDER_PHOTOS = false`. Full = delete `public/images/_placeholder/` + `lib/data/placeholderPhotos.ts`, the marked TEMPORARY block in `components/ui/ImageSlot.tsx`, and every `placeholderKey` / `placeholderTag` prop (grep `placeholder` in components/ and lib/materialOptionsData.ts), and make `isOpenable` in components/catalog/material/optionLightbox.ts drop `hasPlaceholderPhoto`.

## Known gotchas
- Tailwind v4 anchor cascade: <Link> inside text-white section inherits
  white text. Fix: style={{ color: 'var(--color-brand-dark)' }} on
  light-bg buttons inside dark sections
- Numerals in RTL: force dir="ltr" on number elements so digits stay left-to-right
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: MotionProvider handles this globally via reducedMotion="user" — no per-component useReducedMotion() needed. Exception: LanguageTransition.tsx calls useReducedMotion() explicitly because the crossfade is triggered by user action (not scroll/mount) and must be skippable independently of MotionConfig
- contact API (app/api/contact/route.ts) uses Resend; RESEND_API_KEY must be set in Vercel env vars
- Project categories: residential | commercial (anchors #residential / #commercial).
- Ghost buttons on dark/image overlays: use `hover:bg-brand-red hover:border-brand-red hover:text-white` — NOT `hover:bg-white hover:text-brand-dark`. White fill on a dark overlay is invisible and wastes the hover state; brand-red is the correct CTA fill everywhere
- ProductsSection / ProjectsSection `useReducedMotion()`: same exception — the featured grids' hover lift / image zoom are Tailwind `hover:` utilities (not Framer), so MotionConfig can't reach them; the sections call `useReducedMotion()` and pass `reduceMotion` to the cards. Featured data lives in `lib/data/homeFeatured.ts` (re-exported via uiStrings).
- `DropdownItem` type is deleted — use `NavLink` from `@/lib/data/nav` everywhere. `HeaderDropdown` props already updated. Do not re-introduce DropdownItem.

## Dev server / build guard
- Before `rm -rf .next` or `npm run build`, check `ss -ltnp | grep 3000` (or `lsof -i :3000`). If port 3000 is in use, STOP and ask: never delete .next under a running dev server.
- Temporary servers for checks run on another port (`npx next start -p 3123`, dev on 3124) and are stopped when done. The LCP `loading="eager"` warning only appears in dev.

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev

## Pending prompts
- Logo artwork (public/emaar-logo.png) still contains "INTERNATIONAL IND. L.L.C." and ring text "إعمار العالمية للصناعات ذ.م.م" (العالمية ≠ الدولية) — needs a client decision / new asset.
