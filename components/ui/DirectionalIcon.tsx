/**
 * components/ui/DirectionalIcon.tsx
 *
 * The site's ONE rule for icons in Arabic: an icon that points along the reading axis
 * (arrows, carets, "next", trends, the Latin "?") is mirrored on RTL pages; every other
 * icon (phone, WhatsApp, search, close, check, down-carets, brand logos) keeps its
 * orientation and is imported from Phosphor directly.
 *
 * withRtlFlip(Icon) returns a drop-in Phosphor icon that carries `rtl:-scale-x-100`.
 * Tailwind v4 writes that to the standalone CSS `scale` property, so it composes with
 * rotate / translate utilities and Framer Motion transforms instead of overwriting them.
 * `data-rtl-flip` lets verify:ui find every mirrored icon.
 * Callers never branch on isRTL — the flip comes from <html dir> alone, so the server
 * HTML and the hydrated DOM are identical.
 */

import { forwardRef } from 'react';
import {
  ArrowRight, CaretLeft, CaretRight, Question, TrendUp,
  type Icon, type IconProps,
} from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import { RTL_FLIP } from '@/lib/i18n/rtlFlip';

export { RTL_FLIP };

export function withRtlFlip(Base: Icon, name: string): Icon {
  const Flipped = forwardRef<SVGSVGElement, IconProps>(function Flipped({ className, ...props }, ref) {
    return <Base ref={ref} {...props} data-rtl-flip="" className={cn(RTL_FLIP, className)} />;
  });
  Flipped.displayName = `${name}RtlFlip`;
  return Flipped;
}

// ── Ready-made directional icons ─────────────────────────────────────────────
// Named by meaning, not by side: "forward" points right in EN and left in AR
export const ArrowForward = withRtlFlip(ArrowRight, 'ArrowRight');
export const CaretForward = withRtlFlip(CaretRight, 'CaretRight');
export const CaretBack    = withRtlFlip(CaretLeft,  'CaretLeft');
// Rising trend reads along the time axis, which runs right-to-left in Arabic
export const TrendForward = withRtlFlip(TrendUp,    'TrendUp');
// Arabic writes the question mark mirrored (؟), so the help glyph follows it
export const QuestionMirrored = withRtlFlip(Question, 'Question');
