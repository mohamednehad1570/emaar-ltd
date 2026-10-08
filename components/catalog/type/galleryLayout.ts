/**
 * components/catalog/type/galleryLayout.ts
 * Pure row planner for the type-page gallery (≥768). Mobile ignores it: one 4:3 column.
 *   3 → portrait×3
 *   4 → portrait×3 · wide×1
 *   5 → portrait×3 · landscape×2
 *   6 → portrait×3 · wide×1 · landscape×2
 * The validator keeps galleries at 3–6; anything else degrades instead of throwing.
 */

export type GalleryShape = 'portrait' | 'wide' | 'landscape';

export interface GalleryRow {
  shape: GalleryShape;
  // Indices into the gallery array, in display order
  indices: number[];
}

const PATTERNS: Record<number, [GalleryShape, number][]> = {
  3: [['portrait', 3]],
  4: [['portrait', 3], ['wide', 1]],
  5: [['portrait', 3], ['landscape', 2]],
  6: [['portrait', 3], ['wide', 1], ['landscape', 2]],
};

export function galleryRows(total: number): GalleryRow[] {
  if (total <= 0) return [];
  // <3: one landscape row of whatever exists; >6: extra entries are dropped
  const pattern = PATTERNS[Math.min(total, 6)] ?? [['landscape', total]];
  let next = 0;
  return pattern.map(([shape, n]) => {
    const indices = Array.from({ length: n }, (_, i) => next + i);
    next += n;
    return { shape, indices };
  });
}
