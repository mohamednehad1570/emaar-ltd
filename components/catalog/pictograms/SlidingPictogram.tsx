/**
 * Two-panel sliding: frame, two overlapping sashes meeting at the interlock, glass.
 * Indicator = a horizontal arrow on the sliding sash, pointing the way it travels.
 * Lift & slide / tilt & slide types draw their own variants on the same sashes.
 */

import PictogramSvg, { GLASS, INDICATOR, type PictogramProps } from './PictogramSvg';

/** Frame + both sashes; the right sash (x 31–55) is the moving one in every sliding symbol. */
export function SlidingSashes() {
  return (
    <>
      <rect x="6" y="12" width="52" height="40" />
      {/* 2-unit overlap at the centre = interlock */}
      <rect x="9" y="15" width="24" height="34" className={GLASS} />
      <rect x="31" y="15" width="24" height="34" className={GLASS} />
    </>
  );
}

// Right sash slides left; arrowhead at x 37. `y` lets the lift variant raise it clear of its up-arrow
export const slideArrow = (y: number) => `M50 ${y}H37m3.5-3.5L37 ${y}l3.5 3.5`;

export default function SlidingPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame + sashes ────────────────────────────────── */}
      <SlidingSashes />
      {/* ── Opening indicator: right sash slides left ─────── */}
      <path d={slideArrow(32)} className={INDICATOR} />
    </PictogramSvg>
  );
}
