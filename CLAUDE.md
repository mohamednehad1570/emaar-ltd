# Emaar International Website

## Reporting rule (non-negotiable)
Every check you report to the user must include its raw terminal output (last ~30 lines)
pasted verbatim. A check with no output attached counts as not run. Never report a pass
from memory or from an earlier run. Always run the final pipeline from a fresh state
(`rm -rf .next` → build → start on 3123 → verify:ui → stop server → ss check).

## Stack
Next.js 16 (Turbopack) + TypeScript + Tailwind v4 + Framer Motion +
Phosphor Icons. Deployed on Vercel.

## Repo conventions (non-obvious — the rest of the layout is what `ls` shows)
- Static UI copy: components import from `lib/data/uiStrings.ts` only, never from the individual copy files (whyChooseUs/services/careers/tech/contact/about/faq). Exception: `lib/data/nav.ts` is imported directly. Catalog data comes from `lib/data/catalog` (barrel `index.ts`; use the selectors) — never from its individual files.
- `scripts/rename-products.mjs` / `rename-projects.mjs` are dry-run by default; `--apply` writes; logs go to `scripts/rename-log.txt` / `scripts/rename-projects-log.txt`.
- Breadcrumbs were removed site-wide — never add them back.
- All content is static (no Sanity, no CMS) — a custom CMS will replace `lib/data/` after launch.

## Locale architecture (Batch L — the URL is the language)
- English at unprefixed URLs (`/upvc`), Arabic at `/ar/…` (`/ar/upvc`). Every page lives under `app/[locale]/` (`generateStaticParams` → en + ar, `dynamicParams = false`); nested routes (e.g. `/products/[slug]`) prerender both locales × all slugs. All pages must stay ○/● in the build — never read headers()/cookies() in a page or layout.
- `proxy.ts` (Next 16's middleware): `/ar…` passes through; `/en…` 308s to the unprefixed path (one English URL); every other page path is REWRITTEN to `/en/…` (address bar unchanged). It skips `api/`, `_next/`, `images/` and any path with a file extension. No Accept-Language detection, no cookie, no auto-redirect. It also stamps the `x-site-locale` request header — read ONLY by the 404.
- Document: `components/layout/SiteShell.tsx` renders `<html lang dir>` + providers + header/footer for a locale. `app/[locale]/layout.tsx` uses it for pages; `app/global-not-found.tsx` (experimental `globalNotFound`) uses it for every 404 (unknown path, unknown slug, file-like miss) with the locale from `x-site-locale` — server-rendered, 404 status, localized. Don't add `not-found.tsx` files: a nested one is only client-rendered (`__next_error__` shell), and a root one reading headers() makes every page dynamic.
- Language state: `LanguageProvider locale={…}` from the route — no localStorage, no toggle state. `useLanguage()` / `useTranslation()` (t(en, ar)) are unchanged for components. Server components read the locale from params via `routeLocale(params)` (lib/i18n/routeLocale.ts).
- Pathname in client chrome: `useLocalePathname()` (lib/i18n) — never `usePathname()` directly: English pages are prerendered at `/en/x` but served at `/x`, so the raw value differs between server and browser (hydration mismatch). The hook strips the prefix on both sides.
- Links: **raw internal links are FORBIDDEN** — no `next/link` import outside `components/ui/LocaleLink.tsx`, no `<a href="/…">`. Use `<LocaleLink href="/upvc#glass">` (prefixes for the current language, keeps query + hash; `locale` prop targets the other language). `Button` localizes its own internal `href`. Data files (nav.ts, footerLinks.ts, homeFeatured.ts) keep unprefixed paths; `localizePath(path, locale)` (lib/i18n/localizePath.ts) is the one prefixing function. Programmatic navigation must go through `localizePath` too.
- Language toggle (`LangToggle`): the current language is a label; the other is a crawlable `<a hreflang>` to the same page in that language, carrying query + hash (`/upvc#glass` ↔ `/ar/upvc#glass`). Its click is a full document load (fresh server lang/dir; browser lands on the hash or the top).
- Metadata: every page's `generateMetadata` takes the locale and goes through `pageMetadata(key, locale, path)` / `generatePageMetadata({ locale, … })` (lib/seo/metadata.ts): localized title/description (`PAGE_META` in lib/data/pageMeta.ts), canonical = self, `alternates.languages` en / ar / x-default (= English URL), OG locale en_AE / ar_AE. Brand suffix per locale from the layout's title.template. `app/sitemap.ts` lists every page in both languages with alternates; `app/robots.ts` points to it. JSON-LD (lib/seo/jsonld.ts) takes the locale (localized name/description + `inLanguage`). Absolute URLs only via `SITE_URL` / `absoluteUrl()` in lib/seo/site.ts (`NEXT_PUBLIC_SITE_URL`, default https://emaarupvc.ae).
- New page checklist: add `app/[locale]/<route>/page.tsx` with `generateMetadata` (locale-aware), a `PAGE_META` entry, and a sitemap row.

## RTL mirroring (Batch R — IN EFFECT: Arabic is a true mirror of English)
- Everything mirrors: header (logo right, nav right-to-left, actions left), About dropdown (anchored at the trigger's inline-start), burger overlay (slides in from the left), heroes (image left, text block straddles its right edge, scrim + legend flip), tabs, cards, grids, gallery order, footer columns, lightbox (details panel left, arrows + ArrowRight/Left keys swap, close top-left), forms, StickyQuoteBar, LangToggle ("ع | EN"), pictograms and hotspot diagrams (drawing flipped, pins x → 100 − x).
- Only two things keep their orientation: bidi data (numbers, phones, codes, RAL, emails, Latin brand names — `LtrText`) and unflippable artwork (logo artwork, product/placeholder photos).
- How: the direction comes ONLY from server-rendered `<html dir>`. Use logical utilities (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`/`text-start`/`border-s`), and `rtl:` variants where no logical utility exists (gradient direction `bg-linear-to-r rtl:bg-linear-to-l`, `origin-left rtl:origin-right`, radial centres via a CSS var). Never add `dir="ltr"` wrappers to keep geometry fixed.
- **FORBIDDEN: `isRTL ? 'flex-row-reverse'`** (or `items-end` for start) inside the page — `<html dir="rtl">` already reverses flex rows, so the override flips them back to English order. Batch R removed ~30 of these.
- Directional icons: `components/ui/DirectionalIcon.tsx` — `ArrowForward`, `CaretForward`, `CaretBack`, `TrendForward`, `QuestionMirrored`, or `withRtlFlip(Icon, name)` for a new one. Never `isRTL ? 'rotate-180'`. Non-directional icons (phone, WhatsApp, search, close, check, CaretDown, brand logos, clock…) import from Phosphor directly. iconMap's directional keys (ArrowRight, ChevronRight, TrendingUp) resolve to the flipping versions.
- Graphics: `RTL_FLIP` (`lib/i18n/rtlFlip.ts`, = `rtl:-scale-x-100` → CSS `scale: -1 1`) mirrors pictograms, hotspot diagrams and a diagram file; drawings carry `data-rtl-mirror` for verify:ui. They contain no `<text>` — if one ever does, keep that text unflipped.
- Bidi data: `components/ui/LtrText.tsx` (`<bdi dir="ltr">`) around codes, RAL, phones, counters ("2 / 6"), stats, years. Elements that ARE the data (a `tel:` link, a tel input) keep `dir="ltr"` on themselves. Don't put `dir="ltr"` on a block for alignment: globals pins `[dir=ltr]` to `text-align: left` (it would stay left in Arabic) — use `text-start` + `LtrText` inside.

## Footer (components/layout/footer/)
- Split into focused sub-files: `FooterBrand` (logo+tagline+social), `FooterLinkColumn` (desktop column header+links, server), `FooterContact` (email/phone/WhatsApp/CTA, client), `FooterAccordion` (mobile accordion, client), `FooterBottomBar` (copyright bar, server), `footerLinks.ts` (COLUMNS+SOCIAL data), `Footer.tsx` (thin compositor, client).
- Products column links from `PRODUCT_LINKS` in `lib/data/nav.ts` (same source as the header) — never duplicate.
- Mirrors in AR via `<html dir>` alone: Brand column on the right, columns in reverse order, phone row icon at inline-start with the number in LtrText; badge strip ("UAE · Est. · ISO") is bilingual.
- "L.L.C." / "ذ.م.م" appear ONLY in `FooterBottomBar`'s copyright line.

## Reference docs (read only the section you need, never the full file)
- DESIGN.md — design system, tokens, component specs, do/don't rules
- PRODUCT.md — brand personality, audience, voice, anti-references

## Header (components/Header.tsx + components/layout/Header*, LogoPlate, StickyQuoteBar)
- Layout mirrors with the page: EN `[LogoPlate] … uPVC · Aluminum · Projects · Technical · About▾ · Contact … EN|ع · WhatsApp · [Request Quote]`, AR the exact mirror (logo plate on the right at the same sizes/overhang, uPVC first on the right, actions on the left). The bar inherits `<html dir>` (no dir="ltr"). NavLabel stacks both languages so the cell width is identical in EN and AR. No Home tab, no mega-menu, no material dropdowns, no wordmark beside the logo.
- Nav data: `NAV` in lib/data/nav.ts (order + labels). components/layout/SiteShell.tsx calls `buildHeaderNav()` (lib/data/headerNav.ts) on the server and passes plain `HeaderNavData` (material labels, slug → materials for the active underline, slug → EN name for WhatsApp) to Header / StickyQuoteBar — never import lib/data/catalog into client chrome (it would ship the whole catalog).
- ≥1024: HeaderNav. uPVC → /upvc and Aluminum → /aluminum are plain links (no chevron, no panel). Only About has a panel (HeaderDropdown, aligned by usePanelClamp to the trigger's inline-start edge and clamped into the viewport): hover-intent + click/Enter/Space; Esc / outside click / route change close. Active underline (red): material landing page or any /products/[slug] that material offers (both underline for shared types). 1024–1279: WhatsApp is icon-only.
- <1024: logo · [768–1023: EN|ع + WhatsApp icon] · burger → HeaderMobileOverlay + MobileDrillNav (drillPanels.ts). uPVC / Aluminum are plain rows (active by the same material rule); only About drills. The overlay shows EN|ع at every width <1024.
- Bar: 72px at every breakpoint and scroll state (`--header-h`). Rest = white + 0.5px border-light; homepage = transparent over the hero (white labels, `onDark`); after 48px scroll (back below 16px) = frosted white/80 + silver border.
- LogoPlate image is the header's only eager image: `loading="eager"` + `fetchPriority="high"`. Next 16 deprecates `priority`, and the docs say not to combine `preload` with those two.
- LogoPlate: white circle + border-light + shadow-warm-md, top 8px into the bar, anchored `start-0`. STATIC 72 / 88 / 96 / 112px (<768 / md / lg / xl) at every scroll position — no shrink, no animation (only the bar turns frosted on scroll). `--logo-overhang` (8 / 24 / 32 / 48px) on :root — anything sitting at the top of a page under the header must pad `calc(var(--header-h) + var(--logo-overhang))` (PageHeader and the homepage hero already do).
- Use `top-(--header-h)` / `pt-(--header-h)` for things under the bar — never hard-code 72. html has scroll-padding-top: calc(var(--header-h) + 16px).
- StickyQuoteBar (<1024 only, mounted once in layout): appears past 60% of the first viewport, hidden while the overlay is open (`useMobileNavOpen`). Footer reserves `--quote-bar-h` + safe-area at its end.
- EmaarLogo (mark + name) is footer-only. Name: EN "Emaar International Industry" (≥768) / "Emaar Int. Ind." (<768), AR "إعمار الدولية للصناعة". "L.L.C." / "ذ.م.م" appear ONLY in the footer copyright line.
- Page titles: `generatePageMetadata` returns the bare title; the brand suffix comes only from app/[locale]/layout.tsx's per-locale `title.template` (" — Emaar International" / " — إعمار الدولية") (the home page sets an absolute title because the template doesn't apply to its own segment).

## Routing rules
- Every route below also exists at `/ar/…` (see Locale architecture); paths here are written locale-neutral.
- Material pages: `/upvc`, `/aluminum`. Product types: 22 shared static pages at `/products/[slug]` (generateStaticParams from `lib/data/catalog`, `dynamicParams = false`; ×2 locales). Type links (material pages, footer, home) come from the catalog selectors — never hand-write type hrefs.
- No glass or accessories pages — they are Options tabs on the material pages: `/upvc#glass`, `/upvc#accessories` (same hashes on `/aluminum`). Projects stay hash anchors (`/projects#residential|#commercial`).
- Old routes 308 in next.config.ts: `/products` → `/`, `/products/upvc/*` → `/upvc`, `/products/aluminum/*` → `/aluminum`, `/products/glass/*` → `/upvc#glass`, `/accessories/*` → `/upvc#accessories` — each with an `/ar` twin (`/ar/products/glass` → `/ar/upvc#glass`, `/ar/products` → `/ar`). Redirects run before proxy.ts. Internal links must never hit these redirects.
- Type slugs `upvc`, `aluminum`, `glass` are reserved (they'd be shadowed by the redirects) — enforced by `npx tsx scripts/validate-catalog.ts`; run it after any catalog edit.

## Material page (/upvc, /aluminum → components/catalog/material/*)
- Order: A) MaterialHero (TypeHero language, no legend; ImageSlot `material-{id}` / tag exterior) → B) MaterialTypes ("{Material} products", groups Windows · Doors · Facades · Specialty, empty groups dropped; TypeCard → /products/[slug], same placeholder key as the type hero `{slug}-g0`) → C) MaterialOptions (section `#options`) → D) ProductDetailCTA ("Planning a {material} project?").
- Props: `materialPageProps(id)` in lib/catalogPageData.ts → `{ view: MaterialPageView }`; the Options cards come from `buildOptionTabs()` in lib/materialOptionsData.ts (sub-tab ids, card lines, Lightbox details, accessory dot hexes). Components never import the catalog. Labels: `MATERIAL_PAGE_COPY` in catalogCopy.
- Options: LineTabs (WAI-ARIA tabs, manual activation, roving tabindex, ←/→ mirrored in RTL, Home/End; red underline via layoutId spring 500/35; one-line horizontal scroll + end fade <overflow) — main row Colours · Designs · Glass · Accessories, sub row "All" + groups (accessories: only kinds that exist). OptionGrid: AnimatePresence mode="wait", min-height pinned until the last card lands (no layout shift). Hover zooms are Tailwind group-hover (MaterialOptions calls useReducedMotion, same exception as the home grids).
- Deep links (useOptionsHash): `#colours|#designs|#glass|#accessories` select the tab and scroll to `#options`; tab clicks `history.replaceState` the hash (no history, no scroll). MaterialOptions also renders four zero-height fallback anchors with those ids, absolutely pinned to the section top, so native/no-JS scrolling lands where `#options` does. They take NO scroll-margin: the 88px offset is html `scroll-padding-top`, and a margin would double it. Don't reuse those four ids anywhere else on the material pages.
- Lightbox API (components/ui/lightboxTypes.ts): `LightboxItem { src, alt, caption?, swatchHex?, details?: { label: Localized; value: string | Localized }[], placeholderKey?, placeholderTag? }`. `swatchHex` renders a flat colour block; `details` adds a panel beside the media (below <768, caption becomes its title); string values render dir=ltr. Options cards open when they have a swatch, a real src, or a placeholder photo (`hasPlaceholderPhoto`).
- Swatch hexes (colours, performance glass, accessory dots) are the ONLY place blue may appear.

## Pictograms + hotspot diagrams (components/catalog/pictograms, components/catalog/hotspotDiagrams)
- One diagram per catalog mechanism (sliding · casement · hinged-door · folding · fixed); one pictogram per mechanism PLUS pictogram variants. 'unspecified' gets nothing: no fallback icon, no guessed mechanism. Diagram map is `Record<DrawnMechanism, …>`, pictogram map `Record<PictogramId, …>` (= DrawnMechanism | PictogramVariant, components/catalog/types.ts), so a new mechanism/variant fails tsc until it is drawn.
- No-mechanism rule: non-glazed types (pergola, handrails, cladding, security-systems) are `mechanism: 'unspecified'`, the same as frameless-doors. They get no pictogram, no "How it opens", and no hotspot section. With bestFor empty, TypeIntro is skipped entirely, so the page runs Hero → Gallery → Configurations → CTA. Curtain-wall and skylights stay 'fixed'. Never give a non-glazed type a mechanism just to get a drawing.
- Pictogram variants: optional `ProductType.pictogramVariant` (top-hung · tilt-turn · lift-slide · tilt-slide) refines the mechanism's pictogram only — the diagram stays the mechanism's. `PICTOGRAM_VARIANTS` (lib/data/catalog/mechanisms.ts) holds each variant's host mechanism (casement or sliding; validator-enforced), `label` (opening name), optional `how` (variant-specific "how it opens" text — falls back to mechanism's `how`), and optional `shortLabel` (used in the type-hero eyebrow instead of the full label). Mapped: top-hung-windows → top-hung, tilt-and-turn-windows → tilt-turn, hebeschiebe → lift-slide, tilt-and-slide-windows/-doors → tilt-slide. View props carry `pictogram: { id, name }` (variant wins); `mechanism` in TypePageView carries the variant's label+how (overriding the mechanism's copy), built in lib/catalogPageData.ts.
- `MechanismCopy` also has optional `shortLabel?: Localized`. The type-hero eyebrow uses `shortLabel` when defined, else `label`. This trims verbose AR labels (e.g. "نافذة مفصلية" → "مفصلي" in the eyebrow).
- Mechanism + variant labels must be unique per language (validator). AR casement = "نافذة مفصلية", hinged-door = "باب مفصلي" (interim, machine-translated).
- `getPictogram(id, props)` / `getDiagram(id, props)` return ELEMENTS, not components. Picking a component during render trips `react-hooks/static-components`.
- Pictograms: viewBox 64, stroke currentColor 1.5, glass `fill-off-white`, opening indicator `stroke-brand-red` (European drafting: dashed lines meet at the hinge side for casement/hinged — top edge for top-hung, side + bottom triangles overlaid for tilt-turn; arrow for sliding, + up-arrow for lift-slide, + bottom-apex tilt triangle on the moving sash for tilt-slide; zig-zag for folding; fixed has no indicator). Variants reuse `CasementSash` / `SlidingSashes`. 40px on TypeCard (inline-end corner, aria-hidden, muted → heading on card hover), 56px in TypeIntro (role=img, label `openingSymbol`).
- Diagrams: viewBox 400×300 = the 4:3 pin box (pin x%·4, y%·3), `preserveAspectRatio="none"`, non-scaling strokes (outline 2.25 ink-heading · hardware 1.75 ink-heading on white · hidden parts dashed ink-muted · detail lines silver). Draw only what hotspots.ts names, or what is structurally obvious. Pins are the source of truth: move a pin in hotspots.ts and the matching drawing must be redrawn. Drawn only when the type uses the mechanism's shared pins (`diagramMechanism`); a `MECHANISM_DIAGRAMS` file wins over the SVG. Labels: `TYPE_PAGE_COPY.diagramLabels`.
- Hinged-door pins are our own layout (not the printed catalog): leaf 120×240 units (1:2) centred at x 140–260, y 30–270. Pins: lock 62,50 · hinges 35,30 (top of 3 hinges at 25/50/75% of the leaf) · threshold 50,92 · closer 52,11. No type overrides them.
- Both drawings MIRROR in Arabic (Batch R reversed the Batch 6 no-mirror rule): PictogramSvg / DiagramSvg carry `RTL_FLIP`, and HotspotPin places each pin at `100 − x` at render time — hotspots.ts stores the EN position once. Pin DOM/tab order stays 1→4; the numbered list aligns to inline-start. No `dir="ltr"` / `direction="ltr"` anywhere on them.

## Type page (/products/[slug] → components/catalog/type/*)
- Section order: TypeHero → TypeIntro (how it opens + best for) → TypeHotspots → TypeGallery → TypeConfigurations → CTA band (ProductDetailCTA with headline/productName/quoteHref). Placeholder types: Hero (no description) + "Details coming soon" + CTA only.
- Props are built server-side by `typePageProps()` in lib/catalogPageData.ts — components never import the catalog.
- Hero geometry is logical and mirrors in AR: image 85% on the inline-end side (`md:ms-auto`), transparent text panel (no plate) straddles its inline-start edge (`md:start-[5%]`), "Available in" legend (no plate) at the image's bottom inline-end corner (`end-0`, radial centre via `--legend-x`). Readability = off-white scrims on the image (gradient from the panel side ≥768, bottom gradient <768, radial corner behind the legend) — warm rgba(245,244,240,x) only. MaterialHero follows the same rules.
- Hotspot section: HotspotFigure = diagram (file → SVG elevation → cream placeholder) + HotspotPin buttons; TypeHotspots owns state and the numbered list.
- Hotspots come from the mechanism (`MECHANISM_HOTSPOTS` in lib/data/catalog/hotspots.ts, via `getHotspots`); a non-empty `ProductType.hotspots` overrides. 'unspecified' = no section. Validator enforces 4 per mechanism, x/y 0–100. Pins are stored as EN physical % and mirrored to 100 − x in AR at render time.
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
- RTL: logical utilities first, `rtl:` variant where none exists; see "RTL mirroring" above (no flex-row-reverse, DirectionalIcon, LtrText, RTL_FLIP). useLanguage() → isRTL only for JS logic (key mapping, swipe, pin x)
- Page-width wrapper: use `<Container>` from `@/components/layout/Container` — never repeat max-w-7xl + padding inline
- **Browser-only state (localStorage, location.hash)**: use `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`. `getServerSnapshot` must return the SSR default (e.g. `'en'`, `'all'`) — React uses it for BOTH SSR and hydration reconciliation, so the server HTML and first client render agree. `subscribe` is called only in the browser; `getSnapshot` reads the real source. To write: update the real source (localStorage / window.location.hash) and call each listener in the Set. See `components/layout/LangToggle.tsx` (URL suffix store) and `components/projects/useProjectHashFilter.ts` for the full pattern. Never use `useSearchParams()` in a statically rendered tree: it bails the component out of SSR (empty HTML before JS) — read the query in the browser through this pattern instead.
- **FORBIDDEN**: `useState(() => { if (typeof window === 'undefined') return default; return localStorage.getItem(...); })` — this lazy-initializer SSR guard looks safe but is hydration-unsafe: the server returns the default, the client returns the stored value, React sees a mismatch. Use `useSyncExternalStore` instead.

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
- Header "Request Quote" → href="/contact" only (Button prefixes it to /ar/contact on Arabic pages)
- WhatsApp links: target="_blank" rel="noopener noreferrer"
- Prefilled messages are per language: pass `locale: language` in the WhatsAppContext (`whatsAppContextFor(pathname, language, name)` for chrome); `productName` is `{ en, ar }`. AR messages machine-translated
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
- Numerals / codes / phones in RTL: wrap in `LtrText` so digit groups stay left-to-right (a bare "800 2226" renders as "2226 800" in RTL)
- Framer Motion owns all animations — no CSS transitions on animated elements
- prefers-reduced-motion: MotionProvider handles this globally via reducedMotion="user" — no per-component useReducedMotion() needed. (LanguageTransition.tsx and its crossfade were removed in Batch L — switching language is a page navigation now)
- contact API (app/api/contact/route.ts) uses Resend; RESEND_API_KEY must be set in Vercel env vars
- Project categories: residential | commercial (anchors #residential / #commercial).
- Inner-page headers: `<PageHeader copy={PAGE_HEADERS.<page>} />` — eyebrow/title/description/chips are bilingual in lib/data/pageHeaders.ts (via uiStrings); `ltr: true` marks a data chip (phone)
- Ghost buttons on dark/image overlays: use `hover:bg-brand-red hover:border-brand-red hover:text-white` — NOT `hover:bg-white hover:text-brand-dark`. White fill on a dark overlay is invisible and wastes the hover state; brand-red is the correct CTA fill everywhere
- ProductsSection / ProjectsSection `useReducedMotion()`: same exception — the featured grids' hover lift / image zoom are Tailwind `hover:` utilities (not Framer), so MotionConfig can't reach them; the sections call `useReducedMotion()` and pass `reduceMotion` to the cards. Featured data lives in `lib/data/homeFeatured.ts` (re-exported via uiStrings).
- `DropdownItem` type is deleted — use `NavLink` from `@/lib/data/nav` everywhere. `HeaderDropdown` props already updated. Do not re-introduce DropdownItem.

## Dev server / build guard
- Before `rm -rf .next` or `npm run build`, check `ss -ltnp | grep 3000` (or `lsof -i :3000`). If port 3000 is in use, STOP and ask: never delete .next under a running dev server.
- Temporary servers for checks run on another port (`npx next start -p 3123`, dev on 3124) and are stopped when done. The LCP `loading="eager"` warning only appears in dev.

## UI verification (npm run verify:ui)
- `npm run verify:ui` runs the Playwright check suite against `BASE_URL` (default `http://localhost:3123`).
- Prerequisites: `npm run build && npx next start -p 3123` (production build on port 3123).
- Optional: `npm run verify:ui -- --screenshots ./screenshots/verify` saves full-page screenshots.
- EN checks run on `/…`, AR checks on `/ar/…` loaded directly (no toggle clicks, no localStorage).
- Covers (127 checks as of Batch R):
  - catalog: type card links (EN /products/…, AR /ar/products/…), deep-link tabs EN+AR (#glass/#accessories, by `data-tab`), tab hash keeps the locale prefix + no history push, no-mechanism type rendering
  - layout: no blue outside swatches (/upvc, /ar/upvc), tab min-height ≥44px, hotspot pin tab order, AR type page not forced LTR (no section[dir=ltr], svg[direction=ltr], pins in a dir=ltr box)
  - mirror (Batch R): at 1440/900/390, AR x = viewport − EN x (±2px) for logo plate, first nav item + Request Quote (≥1024), burger (<1024), type hero image / text block / legend, material hero image, first type card, footer Brand column, every hotspot pin (centres) and the first material tab (inline-start edge — its label width differs per language); drawings flipped (computed scale "-1 1") in AR, none in EN; burger overlay enters from the right (EN) / left (AR); lightbox ArrowRight = next (EN) / previous (AR) + details panel side; no horizontal scroll at 390px on 11 pages × EN/AR
  - Arabic copy: every /ar sitemap URL at 1440 + 390 — visible Latin-script tokens FAIL unless allowlisted (`ALLOW_PHRASES` / `ALLOW_TOKENS` / `ALLOW_PATTERNS` in checks-arabic-text.ts: brands, standards, codes, numbers + units; emails/URLs stripped; `lang="en"` subtrees skipped). Extend the allowlist only for genuine brand/standard/code names
  - hydration: zero hydration errors + html dir/lang on /ar, /ar/upvc, /ar/projects, /ar/products/hinged-doors and their EN twins
  - hash filter: /projects#residential and /ar/projects#residential
  - footer 390px EN (/) + AR (/ar): all links 200/exempt, AR links /ar-prefixed; accordion keyboard Enter→open / Space→close
  - top-hung pictogram: indicator apex y<20 (hinge at top), free-edge y>40
  - locale (no JS — raw HTTP HTML): /ar, /ar/upvc, /ar/products/hinged-doors, /ar/projects + EN twins → lang/dir, H1 script, hreflang en/ar/x-default, canonical = self; redirects (/en/upvc → /upvc, legacy + /ar twins); toggle href keeps the hash (/upvc#glass ↔ /ar/upvc#glass) and its click lands on the Glass tab in RTL; sitemap lists both locales 1:1 with alternates; 404s are localized with status 404
- Script files: `scripts/verify-ui.ts` (entry), `scripts/verify-ui/runner.ts` (helpers), `checks-catalog.ts`, `checks-layout.ts`, `checks-hydration.ts`, `checks-footer.ts`, `checks-pictogram.ts`, `checks-locale.ts`, `checks-mirror.ts`, `checks-mirror-interact.ts`, `checks-arabic-text.ts` (all in `scripts/verify-ui/`). Test hooks: `data-hero-image|panel|legend`, `data-footer-brand`, `data-hotspot-pin`, `data-lightbox-details|counter`, `data-rtl-mirror`, `data-rtl-flip`.
- Pixel diff (before/after): `npx tsx scripts/verify-diff.ts` — HEAD on 3123, baseline worktree (f3ba54c for Batch R) on 3124, same URL both sides. `DIFF_LANGS` defaults to `en` (EN must stay 0%); `DIFF_PAGES=/a,/b` for a subset. Same settle routine both sides (reduced motion, fonts, scroll-through). Output: screenshots/batchR/diff/{baseline,head,delta} + table of capture → diff%, raw px, max channel delta, height, y-range.
- AR review: `npx tsx scripts/verify-sbs.ts` writes EN | AR side-by-side composites (7 pages × 3 widths + lightbox, burger overlay, hotspot section) to screenshots/batchR/sbs/.
- Exit code 0 = all pass, 1 = any failure. Output is a pass/fail table.

## Git (after every zero-error build)
git add -A && git commit -m "scope(area): what changed" && git push origin dev

## Pending prompts
- Logo artwork (public/emaar-logo.png) still contains "INTERNATIONAL IND. L.L.C." and ring text "إعمار العالمية للصناعات ذ.م.م" (العالمية ≠ الدولية) — needs a client decision / new asset.
