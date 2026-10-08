/**
 * components/catalog/hotspotDiagrams/DiagramSvg.tsx
 *
 * Shared shell for the hotspot elevations. viewBox 400×300 = the 4:3 box the pins live in,
 * so a pin at x%/y% sits on (x·4, y·3) — every part a hotspot names is drawn at that point.
 * preserveAspectRatio="none" guarantees the %→unit mapping even with sub-pixel box rounding
 * (the box is always 4:3, so nothing visibly stretches). Strokes are non-scaling, so line
 * weights stay the same in px at 1440 / 900 / 390.
 * direction="ltr" (and the dir=ltr box in HotspotFigure): hinge/handle sides are physical, exactly like the pins — never mirrored in AR.
 */

import type { ReactNode } from 'react';

// Stroke hierarchy (px, non-scaling): outline 2.25 · visible hardware 1.75 · detail/hidden 1.5
export const OUTLINE = 'stroke-ink-heading';
export const HARDWARE = 'stroke-ink-heading fill-surface-white';
// Hidden parts inside the profile (steel, rollers, thermal break, gear bar) — dashed, muted
export const HIDDEN = 'stroke-ink-muted';
export const HIDDEN_DASH = '6 4';
// Silver = frame detail lines (seals, tracks, spacer bars)
export const DETAIL = 'stroke-silver-material';
// Very light glass tint — the only fill besides the white hardware bodies
export const GLASS = 'fill-off-white stroke-silver-material';

export const W_OUTLINE = 2.25;
export const W_HARDWARE = 1.75;

export default function DiagramSvg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      // SVG's own direction attribute (React types have no `dir` on <svg>)
      direction="ltr"
      fill="none"
      strokeWidth={1.5}
      strokeLinejoin="miter"
      // vector-effect isn't inherited, so it goes on every descendant
      className="absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]"
    >
      {children}
    </svg>
  );
}
