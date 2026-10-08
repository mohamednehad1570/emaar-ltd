/**
 * components/catalog/pictograms/PictogramSvg.tsx
 *
 * Shared 64×64 shell for the opening pictograms (architectural elevation, European drafting).
 * Everything strokes in currentColor at 1.5 so the caller's text colour drives it
 * (muted at rest, heading on card hover); only the opening indicator is brand red.
 * direction="ltr": a window opens the same way in any language — the drawing never mirrors in RTL.
 * `label` given → role="img" (type page); omitted → decorative, hidden from AT (cards,
 * where the mechanism name is already visible text).
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PictogramProps {
  // Rendered px — 40 on type cards, 56 in "How it opens"
  size: number;
  label?: string;
  className?: string;
}

// Opening indicator: the only non-currentColor stroke (red token, never a hex)
export const INDICATOR = 'stroke-brand-red';
// Very light glass tint — the only fill allowed
export const GLASS = 'fill-off-white';
// Drafting convention: dashed swing lines (casement / hinged)
export const SWING_DASH = '3 2';

export default function PictogramSvg({ size, label, className, children }: PictogramProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      // SVG's own direction attribute (React types have no `dir` on <svg>) — the drawing never mirrors
      direction="ltr"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      // Square joins/caps keep the drawing architectural rather than rounded-icon
      strokeLinejoin="miter"
      strokeLinecap="butt"
      className={cn('shrink-0', className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    >
      {children}
    </svg>
  );
}
