/**
 * lib/data/placeholderPhotos.ts
 *
 * TEMPORARY review photos (Unsplash License — credits in public/images/_placeholder/CREDITS.md).
 * ImageSlot shows one ONLY when its real src is null, this flag is on, and the call site
 * passes a placeholderKey. Catalog data and IMAGES stay null — nothing here leaks into them.
 *
 * MUST BE REMOVED BEFORE LAUNCH:
 *   quick  — USE_PLACEHOLDER_PHOTOS = false (every slot falls back to the cream frame)
 *   full   — delete public/images/_placeholder/ + this file, then the marked block in
 *            components/ui/ImageSlot.tsx and every `placeholderKey` / `placeholderTag` prop
 *            (grep placeholderKey).
 */

import type { TypeGroup } from './catalog';

export const USE_PLACEHOLDER_PHOTOS = true;

/** True when ImageSlot will show a review photo for this key (call sites that make null-src
 *  slots clickable need to know). Remove together with this file before launch. */
export const hasPlaceholderPhoto = (key?: string): boolean => USE_PLACEHOLDER_PHOTOS && !!key;

export type PlaceholderTag = 'exterior' | 'interior' | 'window' | 'facade' | 'outdoor' | 'hardware';

const p = (n: number) => `/images/_placeholder/p${String(n).padStart(2, '0')}.webp`;
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => p(from + i));

// File numbers follow the tag order used when the pool was built (see CREDITS.md)
export const PLACEHOLDER_POOL: Record<PlaceholderTag, string[]> = {
  exterior: range(1, 6),
  interior: range(7, 14),
  window:   range(15, 22),
  facade:   range(23, 26),
  outdoor:  range(27, 29), // pergola · glass handrail · skylight
  hardware: range(30, 32),
};

const ALL = Object.values(PLACEHOLDER_POOL).flat();

// FNV-1a 32-bit — tiny, stable across runtimes, good enough spread for a 32-photo pool
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
  return h >>> 0;
}

/**
 * Deterministic photo for a slot key. A trailing number is an offset from the hash of the
 * rest of the key, so numbered siblings ("home-hero-1/2/3", "slug-g1…g6") in one tag never
 * repeat until the tag's pool runs out.
 */
export function placeholderFor(key: string, tag?: PlaceholderTag): string {
  const pool = tag ? PLACEHOLDER_POOL[tag] : ALL;
  const [, base, n] = key.match(/^(.*?)(\d+)$/) ?? [null, key, '0'];
  return pool[(hash(base) + Number(n)) % pool.length];
}

/** Type hero tag by group — what a visitor expects to see first for that kind of product.
 *  Always equals TYPE_GALLERY_TAGS[group][0]: the hero is keyed as gallery slot 0
 *  (`${slug}-g0`), so it shares the gallery's numbered spread and never repeats a tile. */
export const TYPE_HERO_TAG: Record<TypeGroup, PlaceholderTag> = {
  windows: 'window', doors: 'interior', facades: 'facade', specialty: 'outdoor',
};

/** Gallery tags per group, by position — mixed so a gallery reads as varied projects.
 *  A tag's slots (plus slot 0 = hero for the first tag) must differ mod its pool size,
 *  or two images repeat: outdoor has 3 photos → hero 0 + slots 1·5; facade has 4 → 0 + 1·3·6. */
export const TYPE_GALLERY_TAGS: Record<TypeGroup, PlaceholderTag[]> = {
  windows:   ['window', 'interior', 'window', 'exterior', 'interior', 'hardware'],
  doors:     ['interior', 'exterior', 'interior', 'hardware', 'exterior', 'window'],
  facades:   ['facade', 'exterior', 'facade', 'interior', 'exterior', 'facade'],
  specialty: ['outdoor', 'exterior', 'interior', 'facade', 'outdoor', 'exterior'],
};

/** Homepage featured cards — keyed by the IMAGES.home.* slot names. */
export const HOME_PRODUCT_TAG: Record<string, PlaceholderTag> = {
  hebeschiebe: 'interior', 'stained-glass': 'window', 'curtain-wall': 'facade', 'slide-and-fold': 'interior',
};
export const HOME_PROJECT_TAG: Record<string, PlaceholderTag> = { residential: 'exterior', commercial: 'facade' };
