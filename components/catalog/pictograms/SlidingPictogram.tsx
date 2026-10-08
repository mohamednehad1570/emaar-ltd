/**
 * Two-panel sliding (also covers lift-slide and tilt-slide types — same catalog mechanism):
 * frame, two overlapping sashes meeting at the interlock, glass.
 * Indicator = a horizontal arrow on the sliding sash, pointing the way it travels.
 */

import PictogramSvg, { GLASS, INDICATOR, type PictogramProps } from './PictogramSvg';

export default function SlidingPictogram(props: PictogramProps) {
  return (
    <PictogramSvg {...props}>
      {/* ── Frame ─────────────────────────────────────────── */}
      <rect x="6" y="12" width="52" height="40" />
      {/* ── Sashes — 2-unit overlap at the centre = interlock ─ */}
      <rect x="9" y="15" width="24" height="34" className={GLASS} />
      <rect x="31" y="15" width="24" height="34" className={GLASS} />
      {/* ── Opening indicator: right sash slides left ─────── */}
      <path d="M50 32H37m3.5-3.5L37 32l3.5 3.5" className={INDICATOR} />
    </PictogramSvg>
  );
}
